class TextObserver {
  // MutationObserver cannot detect Shadow DOMs so we must manually keep track of every shadow root and observe them
  #targets = new Set();
  #callback;
  #observer;
  #performanceOptions;
  // WeakSet/WeakMap so detached SPA nodes can be garbage-collected.
  // lastSeenValues skips the replacement pipeline when a recycled node is unchanged.
  #processed = new WeakSet();
  #lastSeenValues = new WeakMap();
  // Also keep a copy of processed but that is cleared at the beginning of every callback
  // This prevents an added element whose characterData/attribute also mutated from being processed twice
  // While using processed would cause future mutations to a processed element's characterData/attribute to be ignored
  #callbackProcessed = new Set();
  #connected = true;
  // Buffer mutations and flush asynchronously without disconnecting the observer.
  // Disconnecting before setTimeout used to drop SPA injections (e.g. Salesforce LWR).
  #pendingMutations = [];
  #flushScheduled = false;
  #flushTimer = 0;
  #applying = false;
  #needsFullRescan = false;

  // Keep track of all created observers to prevent infinite callbacks
  static #observers = new Set();
  static #FLUSH_DRAIN_LIMIT = 50;
  static #PENDING_MUTATIONS_LIMIT = 10000;

  // Use static read-only properties as class constants
  static get #IGNORED_NODES() {
    // Node types that implement the CharacterData interface but are not relevant or visible to the user
    return [
      Node.CDATA_SECTION_NODE,
      Node.PROCESSING_INSTRUCTION_NODE,
      Node.COMMENT_NODE,
    ];
  }
  static get #WATCHED_ATTRIBUTES() {
    // HTML attributes that get rendered as visible text
    return {
      placeholder: ["input", "textarea"],
      alt: ["img", "area", 'input[type="image"]', '[role="img"]'],
      value: ['input[type="button"]'],
      title: ["*"],
      "aria-label": ["*"],
      label: ["optgroup"],
    };
  }
  static get #CONFIG() {
    return {
      subtree: true,
      childList: true,
      characterData: true,
      attributeFilter: Object.keys(TextObserver.#WATCHED_ATTRIBUTES),
    };
  }

  // Override attachShadow to always force open mode so we can look inside them
  static #staticConstructor = (() => {
    Element.prototype._attachShadow = Element.prototype.attachShadow;
    Element.prototype.attachShadow = function () {
      const shadowRoot = this._attachShadow({ mode: "open" });
      // Find observers whose target includes the shadow
      const observers = [];
      for (const textObserver of TextObserver.#observers) {
        let found = false;
        for (const target of textObserver.#targets) {
          if (target.contains(shadowRoot.host)) {
            observers.push(textObserver.#observer);
            found = true;
            break;
          }
        }
        if (textObserver.#performanceOptions.shadows && found) {
          textObserver.#targets.add(shadowRoot);
          textObserver.#processNodes(shadowRoot);
        }
      }
      observers.forEach((observer) =>
        observer.observe(shadowRoot, TextObserver.#CONFIG),
      );
      return shadowRoot;
    };
  })();

  constructor(
    callback,
    target = document,
    processExisting = true,
    performanceOptions = {
      contentEditable: true,
      attributes: true,
      shadows: true,
      iconFonts: false,
      cssContent: false,
    },
  ) {
    this.#callback = callback;
    this.#performanceOptions = performanceOptions;

    // If target is entire document, manually process <title> and skip the rest of the <head>
    // Processing the <head> can increase runtime by a factor of two
    if (target === document) {
      document.title = callback(document.title);
      // Sometimes <body> may be missing, like when viewing an .SVG file in the browser
      if (document.body !== null) {
        target = document.body;
      } else {
        console.warn("Document body does not exist, exiting...");
        return;
      }
    }
    this.#targets.add(target);

    if (processExisting) {
      TextObserver.#flushAndSleepDuring(() => this.#processNodes(target));
    }

    const observer = new MutationObserver((mutations) => {
      // Stay connected while buffering so SPA/late DOM injections are not lost.
      // Self-induced mutations during #applying are ignored here and discarded via takeRecords.
      if (this.#applying) {
        return;
      }

      // Coalesce pending records from sibling observers, preserving declaration order
      for (const textObserver of TextObserver.#observers) {
        if (textObserver === this) {
          textObserver.#appendPending(mutations);
        } else if (!textObserver.#applying) {
          textObserver.#appendPending(textObserver.#observer.takeRecords());
        }
        if (textObserver.#hasPendingWork()) {
          textObserver.#scheduleFlush();
        }
      }
    });
    // Attach an observer to each shadow root since MutationObserver objects can't see inside Shadow DOMs
    this.#targets.forEach((target) =>
      observer.observe(target, TextObserver.#CONFIG),
    );

    this.#observer = observer;
    TextObserver.#observers.add(this);
  }

  disconnect(flush = true) {
    if (!this.#connected) {
      console.warn("This TextObserver instance is already disconnected!");
      return;
    }
    this.#connected = false;
    this.#cancelScheduledFlush();
    if (flush) {
      TextObserver.#flushAndSleepDuring(() => {});
    }
    this.#pendingMutations = [];
    this.#needsFullRescan = false;
    this.#applying = false;
    this.#observer.disconnect();
    TextObserver.#observers.delete(this);
  }

  reconnect(reprocess = true) {
    if (this.#connected) {
      console.warn("This TextObserver instance is already connected!");
      return;
    }
    this.#connected = true;
    if (reprocess) {
      TextObserver.#flushAndSleepDuring(() =>
        this.#targets.forEach((target) => this.#processNodes(target)),
      );
    }
    this.#targets.forEach((target) =>
      this.#observer.observe(target, TextObserver.#CONFIG),
    );
    TextObserver.#observers.add(this);
  }

  #cancelScheduledFlush() {
    this.#flushScheduled = false;
    if (this.#flushTimer !== 0) {
      clearTimeout(this.#flushTimer);
      this.#flushTimer = 0;
    }
  }

  #scheduleFlush() {
    if (this.#flushScheduled || !this.#connected) {
      return;
    }
    this.#flushScheduled = true;
    // Yield to the event loop so clicks/input stay responsive, but keep observing
    this.#flushTimer = setTimeout(() => {
      this.#flushTimer = 0;
      this.#flushPendingMutations();
    }, 0);
  }

  #appendPending(records) {
    if (this.#needsFullRescan || records.length === 0) {
      return;
    }
    const pending = this.#pendingMutations;
    const limit = TextObserver.#PENDING_MUTATIONS_LIMIT;
    for (let i = 0; i < records.length; i++) {
      pending.push(records[i]);
      if (pending.length >= limit) {
        pending.length = 0;
        this.#needsFullRescan = true;
        return;
      }
    }
  }

  #hasPendingWork() {
    return this.#needsFullRescan || this.#pendingMutations.length > 0;
  }

  #collectQueuedRecords() {
    if (this.#observer === undefined) {
      return;
    }
    if (this.#needsFullRescan) {
      this.#observer.takeRecords();
      this.#pendingMutations = [];
      return;
    }
    this.#appendPending(this.#observer.takeRecords());
  }

  #runPendingWork() {
    if (this.#needsFullRescan) {
      this.#needsFullRescan = false;
      this.#pendingMutations = [];
      this.#targets.forEach((target) => this.#processNodes(target));
      return;
    }

    if (this.#pendingMutations.length === 0) {
      return;
    }
    const batch = this.#pendingMutations;
    this.#pendingMutations = [];
    this.#observerCallback(batch);
  }

  #discardSelfInducedRecords() {
    if (this.#observer !== undefined) {
      this.#observer.takeRecords();
    }
  }

  #flushPendingMutations() {
    this.#flushScheduled = false;
    if (!this.#connected) {
      return;
    }

    let drainCount = 0;
    while (
      this.#hasPendingWork() &&
      drainCount < TextObserver.#FLUSH_DRAIN_LIMIT
    ) {
      drainCount++;
      this.#applying = true;
      try {
        this.#collectQueuedRecords();
        this.#runPendingWork();
      } finally {
        try {
          this.#discardSelfInducedRecords();
        } finally {
          this.#applying = false;
        }
      }
    }

    if (this.#hasPendingWork()) {
      this.#scheduleFlush();
    }
  }

  #observerCallback(mutations) {
    this.#callbackProcessed.clear();
    // We must save attribute mutations and process them at the end
    // This is because adding them to processed would limit elements to one processed attribute per callback
    const attributeMutations = new Map();

    for (const mutation of mutations) {
      const target = mutation.target;
      const oldValue = mutation.oldValue;
      switch (mutation.type) {
        case "childList":
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              if (this.#valid(node)) {
                this.#applyToTextNode(node);
              }
            } else if (!TextObserver.#IGNORED_NODES.includes(node.nodeType)) {
              // If added node is not text, process subtree
              this.#processNodes(node);
            }
          }
          break;
        case "characterData":
          if (!this.#callbackProcessed.has(target) && this.#valid(target)) {
            this.#applyToTextNode(target);
          }
          break;
        case "attributes":
          const attribute = mutation.attributeName;
          if (
            this.#performanceOptions.attributes &&
            target.getAttribute(attribute) !== oldValue
          ) {
            if (attributeMutations.get(target) === undefined) {
              // Use a Set to prevent double-processing of the same attribute
              attributeMutations.set(target, new Set());
            }
            attributeMutations.get(target).add(attribute);
          }
          break;
      }
    }

    for (const [target, attributes] of attributeMutations.entries()) {
      if (this.#callbackProcessed.has(target)) {
        continue;
      }
      for (const attribute of attributes) {
        // Find if element with changed attribute matches a valid selector
        const selectors = TextObserver.#WATCHED_ATTRIBUTES[attribute];
        let matched = false;
        for (const selector of selectors) {
          if (target.matches(selector)) {
            matched = true;
            break;
          }
        }
        const value = target.getAttribute(attribute);
        if (matched && value) {
          target.setAttribute(attribute, this.#callback(value));
        }
      }
    }
  }

  #textNeedsApply(node) {
    return (
      !this.#processed.has(node) ||
      this.#lastSeenValues.get(node) !== node.nodeValue
    );
  }

  // Process text on first sight; skip the callback when a recycled node is unchanged.
  #applyToTextNode(node) {
    const current = node.nodeValue;
    if (!this.#textNeedsApply(node)) {
      this.#callbackProcessed.add(node);
      return;
    }
    const next = this.#callback(current);
    if (next !== current) {
      node.nodeValue = next;
    }
    this.#processed.add(node);
    this.#lastSeenValues.set(node, node.nodeValue);
    this.#callbackProcessed.add(node);
  }

  static #flushAndSleepDuring(callback) {
    // Process pending work with #applying so we do not disconnect and miss parallel SPA mutations.
    // Collect every observer's records before any DOM writes so siblings do not see each other.
    const observers = [...TextObserver.#observers];
    for (const textObserver of observers) {
      textObserver.#cancelScheduledFlush();
      textObserver.#applying = true;
    }
    try {
      for (const textObserver of observers) {
        textObserver.#collectQueuedRecords();
      }
      for (const textObserver of observers) {
        textObserver.#runPendingWork();
      }
      callback();
    } finally {
      for (const textObserver of observers) {
        try {
          textObserver.#discardSelfInducedRecords();
        } finally {
          textObserver.#applying = false;
        }
      }
    }
  }

  #valid(node) {
    if (node.parentNode === null) {
      return false;
    }

    // Sometimes the node is removed from the document before we can process it, so check for valid parent
    if (TextObserver.#IGNORED_NODES.includes(node.nodeType)) {
      return false;
    }

    // HTML tags that permit textual content but are not front-facing text
    if (
      node.parentNode.tagName === "SCRIPT" ||
      node.parentNode.tagName === "STYLE"
    ) {
      return false;
    }

    // Ignore contentEditable elements as touching them messes up the cursor position
    if (
      this.#performanceOptions.contentEditable &&
      node.parentNode.isContentEditable
    ) {
      return false;
    }

    // Skip text nodes inside form input elements (input, textarea, select, option)
    // These should not be modified as they contain user input or form values.
    // ? Additional testing may be needed to determine if this is a good choice.
    const parentTag = node.parentNode.tagName;
    if (
      parentTag === "INPUT" ||
      parentTag === "TEXTAREA" ||
      parentTag === "SELECT" ||
      parentTag === "OPTION"
    ) {
      return false;
    }

    // HACK: workaround to avoid breaking icon fonts
    if (
      this.#performanceOptions.iconFonts &&
      window
        .getComputedStyle(node.parentNode)
        .getPropertyValue("font-family")
        .toUpperCase()
        .includes("ICON")
    ) {
      return false;
    }

    return true;
  }

  #processNodes(root) {
    // Process valid Text nodes, including reattached SPA nodes whose value changed
    const nodes = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        this.#valid(node) && this.#textNeedsApply(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    });
    while (nodes.nextNode()) {
      this.#applyToTextNode(nodes.currentNode);
    }

    // Use temporary set since instantly adding would prevent elements from having multiple attributes/CSS processed
    const tempProcessed = new Set();

    // Process special attributes
    if (
      this.#performanceOptions.attributes &&
      typeof root.querySelectorAll === "function"
    ) {
      for (const [attribute, selectors] of Object.entries(
        TextObserver.#WATCHED_ATTRIBUTES,
      )) {
        root.querySelectorAll(selectors.join(", ")).forEach((element) => {
          if (!this.#processed.has(element)) {
            const value = element.getAttribute(attribute);
            if (value !== null) {
              element.setAttribute(attribute, this.#callback(value));
            }
            tempProcessed.add(element);
          }
        });
      }
    }

    // Process CSS generated text
    if (this.#performanceOptions.cssContent) {
      const styleElement = document.createElement("style");
      document.head.appendChild(styleElement);
      let styles = "";
      let i = 0;
      const elements = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) =>
            !this.#processed.has(node)
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_SKIP,
        },
      );
      while (elements.nextNode()) {
        const node = elements.currentNode;
        // Check every pseudo-element that accepts the content property
        for (const pseudoClass of ["::before", "::after", "::marker"]) {
          const content = window.getComputedStyle(node, pseudoClass).content;
          // Only process values that are plain single or double quote strings
          if (/^'[^']+'$/.test(content) || /^"[^"]+"$/.test(content)) {
            const newClass = "TextObserverHelperAssigned" + i;
            node.classList.add(newClass);
            // Substring is needed to cut off open and close quote
            styles += `.${newClass}${pseudoClass} {
                            content: "${this.#callback(content.substring(1, content.length - 1))}" !important;
                        }`;
            tempProcessed.add(node);
          }
        }
        i++;
      }
      styleElement.textContent = styles;
    }

    for (const element of tempProcessed) {
      this.#processed.add(element);
      this.#callbackProcessed.add(element);
    }

    // Manually find and process open Shadow DOMs because MutationObserver doesn't pick them up
    if (this.#performanceOptions.shadows) {
      const shadowHosts = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) =>
            node.shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
        },
      );
      let hostElement = shadowHosts.currentNode;
      if (!hostElement?.shadowRoot) {
        hostElement = shadowHosts.nextNode();
      }
      while (hostElement?.shadowRoot) {
        const shadowRoot = hostElement.shadowRoot;
        if (!this.#targets.has(shadowRoot)) {
          this.#processNodes(shadowRoot);
          this.#targets.add(shadowRoot);
          // This function is called in the constructor before the observer is defined, so check that
          if (this.#observer !== undefined) {
            this.#observer.observe(shadowRoot, TextObserver.#CONFIG);
          }
        }
        hostElement = shadowHosts.nextNode();
      }
    }
  }
}

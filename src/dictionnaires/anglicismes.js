const anglicismes = [
  //  Structure :
  // [/faute/]: "correction",

  // EXPRESSIONS
  // Anglicisme lié à l’expression : "to make sense"
  [/ne faisait aucun sens\b/g, "n’avait aucun sens"],
  [/ne fait aucun sens\b/g, "n’a aucun sens"],
  [/ne font aucun sens\b/g, "n’ont aucun sens"],
  [/ne fait sens\b/g, "n’a de sens"],
  [/ne font sens\b/g, "n’ont de sens"],
  [/fait sens\b/g, "a du sens"],
  [/faire du shopping\b/gi, preserveCase("faire des achats")],
  [/saisir l'opportunité\b/gi, preserveCase("saisir l’occasion")],

  // Être confortable (n’a aucun sens en parlant d’une personne ou d’une idée)
  [/je ne suis pas confortable\b/gi, preserveCase("je ne suis pas à l’aise")],

  // VOCABULAIRE
  // /gi + preserveCase couvre minuscule, Majuscule initiale et TOUT MAJUSCULE.

  // *** A ***
  [/\bASAP\b/g, "Dès que possible"],
  [/\basap\b/gi, preserveCase("dès que possible")],

  // *** B ***
  [/un best-of\b/g, "une anthologie"],
  [/\bbrainstorming\b/gi, preserveCase("remue-méninges")],
  [/\bbriefing\b/gi, preserveCase("réunion préparatoire")],
  [/ce bullshit\b/g, "ces conneries"],
  [/du bullshit\b/g, "des conneries"],
  [/\bburn-out\b/gi, preserveCase("épuisement professionnel")],
  [/\bburnout\b/gi, preserveCase("épuisement professionnel")],

  // *** C ***
  [/\bchallenges\b/gi, preserveCase("défis")],
  [/\bchallenge\b/gi, preserveCase("défi")],
  [/\bchecker\b/gi, preserveCase("vérifier")],
  [/\bcoachs\b/gi, preserveCase("entraîneurs")],
  [/\bcoach\b/gi, preserveCase("entraîneur")],
  [/\bcosy\b/gi, preserveCase("douillet")],
  [/\bcoworking\b/gi, preserveCase("cotravail")],
  [/\bcrowdfunding\b/gi, preserveCase("financement participatif")],

  // *** D ***
  [/\bdeadlines\b/gi, preserveCase("échéances")],
  [/\bdeadline\b/gi, preserveCase("échéance")],
  [/\bdispatcher\b/gi, preserveCase("répartir")],

  // *** E ***
  // ⚠ Les règles e-mail/email doivent rester AVANT la règle mail (section M),
  // sinon \bmail\b matcherait le "mail" dans "e-mail"
  [/\bde l['']e-mail\b/g, "de l’adresse électronique"],
  [/\bl['']e-mail\b/g, "le courriel"],
  [/\bl['']email\b/g, "le courriel"],
  [/\be-mail\b/gi, preserveCase("courriel")],
  [/\bemail\b/gi, preserveCase("courriel")],

  // *** F ***
  [/\bfake news\b/gi, preserveCase("infox")],
  [/\bfeedbacks\b/gi, preserveCase("retours")],
  [/\bfeedback\b/gi, preserveCase("retour")],
  [/\bflyers\b/gi, preserveCase("prospectus")],
  [/\bflyer\b/gi, preserveCase("prospectus")],
  [/\bfollowers\b/gi, preserveCase("abonnés")],
  [/\bfollower\b/gi, preserveCase("abonné")],

  // *** H ***
  [/\bhashtags\b/gi, preserveCase("mots-dièse")],
  [/\bhashtag\b/gi, preserveCase("mot-dièse")],
  [/\bhello\b/gi, preserveCase("salut")],

  // *** J ***
  [/\bjob\b/gi, preserveCase("travail")],

  // *** L ***
  [/\blive\b/gi, preserveCase("direct")],

  // *** M ***
  // ⚠ Les règles mail doivent rester APRÈS les règles e-mail (voir section E)
  [/\bmail\b/gi, preserveCase("courriel")],
  [/\bmainstream\b/gi, preserveCase("populaire")],
  [/le management\b/gi, preserveCase("l’encadrement")],
  [/\bmanagement\b/gi, preserveCase("encadrement")],
  [/\bmeetings\b/gi, preserveCase("réunions")],
  [/\bmeeting\b/gi, preserveCase("réunion")],

  // *** N ***
  [/\bnewsletters\b/gi, preserveCase("infolettres")],
  [/\bnewsletter\b/gi, preserveCase("infolettre")],
  [/\bnaming\b/gi, preserveCase("nommage")],

  // *** P ***
  [/\bpanel\b/gi, preserveCase("échantillon")],
  [/un pitch\b/gi, preserveCase("une courte présentation")],

  // *** R ***
  [/\brenaming\b/gi, preserveCase("renommage")],

  // *** S ***
  [/\bstreaming\b/gi, preserveCase("diffusion en continu")],
  [/un storytelling\b/gi, preserveCase("une narration")],

  // *** T ***
  [/\bteam\b/gi, preserveCase("équipe")],
  [/un toaster\b/g, "un grille-pain"],

  // *** U ***
  [/\buploader\b/gi, preserveCase("mettre en ligne")],
  // \b en fin de pattern ne fonctionne pas avec les caractères accentués (é ∉ \w)
  [/\buploadé/gi, preserveCase("mis en ligne")],
  [/\bs'updater\b/gi, preserveCase("se mettre à jour")],

  // *** W ***
  [/\bworkshops\b/gi, preserveCase("ateliers")],
  [/\bworkshop\b/gi, preserveCase("atelier")],
];

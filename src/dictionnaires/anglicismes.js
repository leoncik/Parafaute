const anglicismes = [
  //  Structure :
  // [/faute/]: "correction",

  // EXPRESSIONS
  // Anglicisme lié à l'expression : "to make sense"
  [/ne faisait aucun sens\b/g, "n'avait aucun sens"],
  [/ne fait aucun sens\b/g, "n'a aucun sens"],
  [/ne font aucun sens\b/g, "n'ont aucun sens"],
  [/ne fait sens\b/g, "n'a de sens"],
  [/ne font sens\b/g, "n'ont de sens"],
  [/fait sens\b/g, "a du sens"],
  [/faire du shopping\b/g, "faire des achats"],
  [/saisir l'opportunité\b/g, "saisir l'occasion"],

  // Être confortable (n'a aucun sens en parlant d'une personne ou d'une idée)
  [/Je ne suis pas confortable\b/g, "Je ne suis pas à l'aise"],

  // VOCABULAIRE

  // *** A ***
  [/\basap\b/gi, "dès que possible"],

  // *** B ***
  [/un best-of\b/g, "une anthologie"],
  [/\bBrainstorming\b/g, "Remue-méninges"],
  [/\bbrainstorming\b/g, "remue-méninges"],
  [/\bBriefing\b/g, "Réunion préparatoire"],
  [/\bbriefing\b/g, "réunion préparatoire"],
  [/ce bullshit\b/g, "ces conneries"],
  [/du bullshit\b/g, "des conneries"],
  [/\bBurn-out\b/g, "Épuisement professionnel"],
  [/\bburn-out\b/g, "épuisement professionnel"],
  [/\bBurnout\b/g, "Épuisement professionnel"],
  [/\bburnout\b/g, "épuisement professionnel"],

  // *** C ***
  [/\bChallenges\b/g, "Défis"],
  [/\bchallenges\b/g, "défis"],
  [/\bChallenge\b/g, "Défi"],
  [/\bchallenge\b/g, "défi"],
  [/\bChecker\b/g, "Vérifier"],
  [/\bchecker\b/g, "vérifier"],
  [/\bCoachs\b/g, "Entraîneurs"],
  [/\bcoachs\b/g, "entraîneurs"],
  [/\bCoach\b/g, "Entraîneur"],
  [/\bcoach\b/g, "entraîneur"],
  [/\bCosy\b/g, "Douillet"],
  [/\bcosy\b/g, "douillet"],
  [/\bCoworking\b/g, "Cotravail"],
  [/\bcoworking\b/g, "cotravail"],
  [/\bCrowdfunding\b/g, "Financement participatif"],
  [/\bcrowdfunding\b/g, "financement participatif"],

  // *** D ***
  [/\bDeadlines\b/g, "Échéances"],
  [/\bdeadlines\b/g, "échéances"],
  [/\bDeadline\b/g, "Échéance"],
  [/\bdeadline\b/g, "échéance"],
  [/\bDispatcher\b/g, "Répartir"],
  [/\bdispatcher\b/g, "répartir"],

  // *** E ***
  // ⚠ Les règles e-mail/email doivent rester AVANT la règle mail (section M),
  // sinon \bmail\b matcherait le "mail" dans "e-mail"
  [/\bde l['']e-mail\b/g, "de l'adresse électronique"],
  [/\bl['']e-mail\b/g, "le courriel"],
  [/\bl['']email\b/g, "le courriel"],
  [/\be-mail\b/g, "courriel"],
  [/\bE-mail\b/g, "Courriel"],
  [/\bemail\b/g, "courriel"],
  [/\bEmail\b/g, "Courriel"],

  // *** F ***
  [/\bFake news\b/g, "Infox"],
  [/\bfake news\b/g, "infox"],
  [/\bFeedbacks\b/g, "Retours"],
  [/\bfeedbacks\b/g, "retours"],
  [/\bFeedback\b/g, "Retour"],
  [/\bfeedback\b/g, "retour"],
  [/\bFlyers\b/g, "Prospectus"],
  [/\bflyers\b/g, "prospectus"],
  [/\bFlyer\b/g, "Prospectus"],
  [/\bflyer\b/g, "prospectus"],
  [/\bFollowers\b/g, "Abonnés"],
  [/\bfollowers\b/g, "abonnés"],
  [/\bFollower\b/g, "Abonné"],
  [/\bfollower\b/g, "abonné"],

  // *** H ***
  [/\bHashtags\b/g, "Mots-dièse"],
  [/\bhashtags\b/g, "mots-dièse"],
  [/\bHashtag\b/g, "Mot-dièse"],
  [/\bhashtag\b/g, "mot-dièse"],
  [/\bHello\b/g, "Salut"],
  [/\bhello\b/g, "salut"],

  // *** J ***
  [/\bJob\b/g, "Travail"],
  [/\bjob\b/g, "travail"],

  // *** L ***
  [/\bLive\b/g, "Direct"],
  [/\blive\b/g, "direct"],

  // *** M ***
  // ⚠ Les règles mail doivent rester APRÈS les règles e-mail (voir section E)
  [/\bmail\b/g, "courriel"],
  [/\bMail\b/g, "Courriel"],
  [/\bMainstream\b/g, "Populaire"],
  [/\bmainstream\b/g, "populaire"],
  [/Le management\b/g, "L'encadrement"],
  [/le management\b/g, "l'encadrement"],
  [/\bmanagement\b/g, "encadrement"],
  [/\bMeetings\b/g, "Réunions"],
  [/\bmeetings\b/g, "réunions"],
  [/\bMeeting\b/g, "Réunion"],
  [/\bmeeting\b/g, "réunion"],

  // *** N ***
  [/\bNewsletters\b/g, "Infolettres"],
  [/\bnewsletters\b/g, "infolettres"],
  [/\bNewsletter\b/g, "Infolettre"],
  [/\bnewsletter\b/g, "infolettre"],
  [/\bNaming\b/g, "Nommage"],
  [/\bnaming\b/g, "nommage"],

  // *** P ***
  [/\bPanel\b/g, "Échantillon"],
  [/\bpanel\b/g, "échantillon"],
  [/Un pitch\b/g, "Une courte présentation"],
  [/un pitch\b/g, "une courte présentation"],

  // *** R ***
  [/\bRenaming\b/g, "Renommage"],
  [/\brenaming\b/g, "renommage"],

  // *** S ***
  [/\bStreaming\b/g, "Diffusion en continu"],
  [/\bstreaming\b/g, "diffusion en continu"],
  [/Un storytelling\b/g, "Une narration"],
  [/un storytelling\b/g, "une narration"],

  // *** T ***
  [/\bteam\b/g, "équipe"],
  [/\bTeam\b/g, "Équipe"],
  [/un toaster\b/g, "un grille-pain"],

  // *** U ***
  [/\bUploader\b/g, "Mettre en ligne"],
  [/\buploader\b/g, "mettre en ligne"],
  // \b en fin de pattern ne fonctionne pas avec les caractères accentués (é ∉ \w)
  [/\bUploadé/g, "Mis en ligne"],
  [/\buploadé/g, "mis en ligne"],
  [/\bS'updater\b/g, "Se mettre à jour"],
  [/\bs'updater\b/g, "se mettre à jour"],

  // *** W ***
  [/\bWorkshops\b/g, "Ateliers"],
  [/\bworkshops\b/g, "ateliers"],
  [/\bWorkshop\b/g, "Atelier"],
  [/\bworkshop\b/g, "atelier"],
];

const anglicismes = [

    //  Structure :
    // [/faute/]: "correction",

    // EXPRESSIONS
    // Anglicisme lié à l'expression : "to make sense"
    [/ne fait aucun sens\b/g, "n'a aucun sens"],
    [/ne faisait aucun sens\b/g, "n'avait aucun sens"],
    [/ne fait aucun sens\b/g, "n'a aucun sens"],
    [/ne font aucun sens\b/g, "n'ont aucun sens"],
    [/ne fait sens\b/g, "n'a de sens"],
    [/ne font sens\b/g, "n'ont de sens"],
    [/fait sens\b/g, "a du sens"],
    [/faire du shopping\b/g, "faire des achats"],
    [/saisir l’opportunité\b/g, "saisir l’occasion"],

    // Être confortable (n'a aucun sens en parlant d'une personne ou d'une idée)
    [/Je ne suis pas confortable\b/g, "Je ne suis pas à l'aise"],

    // VOCABULAIRE

    // *** B ***
    [/un best-of/g, "une anthologie"],
    [/ce bullshit/g, "ces conneries"],
    [/du bullshit/g, "des conneries"],

    // *** C ***
    [/\bChallenge/g, "Défi"],
    [/\bchallenge/g, "défi"],
    [/\bChallenges/g, "Défis"],
    [/\bchallenges/g, "défis"],
    [/\bChecker/g, "Vérifier"],
    [/\bchecker/g, "vérifier"],
    [/\bCosy\b/g, "Douillet"],
    [/\bcosy\b/g, "douillet"],

    // *** D ***
    [/Dispatcher/g, "Répartir"],
    [/dispatcher/g, "répartir"],

    // *** E ***
    [/\bde l['|’]e-mail\b/g, "de l'adresse électronique"],
    [/\bl['|’]e-mail\b/g, "le courriel"],
    [/\bl['|’]email\b/g, "le courriel"],
    [/\be-mail\b/g, "courriel"],
    [/\bE-mail\b/g, "Courriel"],

    // *** F ***
    [/\bflyer\b/g, "prospectus"],
    [/\bFollower\b/g, "Abonné"],
    [/\bfollower\b/g, "abonné"],
    [/\bFollowers\b/g, "Abonnés"],
    [/\bfollowers\b/g, "abonnés"],

    // *** G ***
    [/\bGiraffe\b/g, "Girafe"],
    [/\bgiraffe\b/g, "girafe"],


    // *** H ***
    [/\bHello\b/g, "Salut"],
    [/\bhello\b/g, "salut"],

    // *** J ***
    [/\bJob\b/g, "Travail"],
    [/\bjob\b/g, "travail"],

    // *** L ***
    [/\bLive\b/g, "Direct"],
    [/\blive\b/g, "direct"],

    // *** M ***
    [/\bmail\b/g, "courriel"],
    [/\bMail\b/g, "Courriel"],
    [/Mainstream\b/g, "Populaire"],
    [/mainstream\b/g, "populaire"],

    [/Le management/g, "L'encadrement"],
    [/le management/g, "l'encadrement"],
    [/management/g, "encadrement"],

    // *** N ***
    [/\bNaming\b/g, "Nommage"],
    [/\bnaming\b/g, "nommage"],

    // *** P ***
    [/un pitch/g, "une courte présentation"],
    [/Un pitch/g, "Une courte présentation"],

    [/Panel/g, "Échantillon"],
    [/panel/g, "échantillon"],

    // *** R ***
    [/Renaming\b/g, "Renommage"],
    [/renaming\b/g, "renommage"],

    // *** S ***
    [/Un storytelling\b/g, "Une narration"],
    [/un storytelling\b/g, "une narration"],

    // *** T ***
    [/\bteam\b/g, "équipe"],
    [/\bTeam\b/g, "Équipe"],
    [/un toaster\b/g, "un grille-pain"],

    // *** U ***
    [/Uploader/g, "Mettre en ligne"],
    [/uploader/g, "mettre en ligne"],
    [/Uploadé/g, "Mis en ligne"],
    [/uploadé/g, "mis en ligne"],
    [/s'updater/g, "se mettre à jour"],
    [/s’updater/g, "se mettre à jour"],
];

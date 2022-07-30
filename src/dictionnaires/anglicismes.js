const anglicismes = [

    //  Structure :
    // [/faute/]: "correction",

    // EXPRESSIONS
    // Anglicisme lié à l'expression : "to make sense"
    [/fait sens\b/g, "a du sens"],
    [/ne fait aucun sens\b/g, "n'a aucun sens"],
    [/ne faisait aucun sens\b/g, "n'avait aucun sens"],

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

    // *** E ***
    // Todo : prendre en compte : « de l’e-mail »
    [/\be-mail\b/g, "courriel"],
    [/\bE-mail\b/g, "Courriel"],

    // *** F ***
    [/\bflyer\b/g, "prospectus"],
    [/\bFollower\b/g, "Abonné"],
    [/\bfollower\b/g, "abonné"],
    [/\bFollowers\b/g, "Abonnés"],
    [/\bfollowers\b/g, "abonnés"],

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

    // *** N ***
    [/\bNaming\b/g, "Nommage"],
    [/\bnaming\b/g, "nommage"],

    // *** R ***
    [/Renaming\b/g, "Renommage"],
    [/renaming\b/g, "renommage"],

    // *** T ***
    [/\bteam\b/g, "équipe"],
    [/\bTeam\b/g, "Équipe"],
    [/un toaster\b/g, "un grille-pain"],

    // *** U ***
    [/Uploader/g, "Mettre en ligne"],
    [/uploader/g, "mettre en ligne"],
    [/Uploadé/g, "Mis en ligne"],
    [/uploadé/g, "mis en ligne"],


    // Test
    // [/Bonjour/g, "Chaviro"],
];

const fautesCourantes = [
    //  Structure :
    // [/faute/]: "correction",

    // Expressions
    [/en suspend\b/g, "en suspens"],

    [/sa va\b/g, "ça va"],
    [/Sa va\b/g, "Ça va"],

    [/Si il\b/g, "S'il"],
    [/si il\b/g, "s'il"],

    [/Il s’en suit un vif débat\b/g, "S’ensuit un vif débat"],
    [/il s’en suit un vif débat\b/g, "s’ensuit un vif débat"],
    
    [/Il s’en suivit un vif débat\b/g, "S’ensuivit un vif débat"],
    [/il s’en suivit un vif débat\b/g, "s’ensuivit un vif débat"],
    
    [/Il s’en est suivi un vif débat\b/g, "S’est ensuivi un vif débat"],
    [/il s’en est suivi un vif débat\b/g, "s’est ensuivi un vif débat"],

    [/Le problème s’empire\b/g, "Le problème empire"],
    [/le problème s’empire\b/g, "le problème empire"],

    [/Il empire le problème\b/g, "Il fait empirer le problème"],
    [/il empire le problème\b/g, "il fait empirer le problème"],

    [/Kilomètre-heure\b/g, "Kilomètre par heure"],
    [/kilomètre-heure\b/g, "kilomètre par heure"],

    [/Kilowatt par heure\b/g, "Kilowattheure"],
    [/kilowatt par heure\b/g, "kilowattheure"],

    [/Y a t'il\b/g, "Y a-t-il"],
    [/y a t'il\b/g, "y a-t-il"],

    [/aux dépends\b/g, "aux dépens"],
    [/chiffre d'affaire\b/g, "chiffre d'affaires"],
    [/Chiffre d'affaire\b/g, "Chiffre d'affaires"],
    [/Il y à/g, "Il y a"],
    [/il y à/g, "il y a"],
    
    // VOCABULAIRE

    // *** A ***
    [/Appercevoir\b/g, "Apercevoir"],
    [/appercevoir\b/g, "apercevoir"],
    [/Aquérir\b/g, "Acquérir"],
    [/aquérir\b/g, "acquérir"],
    [/Applatir\b/g, "Aplatir"],
    [/applatir\b/g, "aplatir"],
    [/Acceuil\b/g, "Accueil"],
    [/acceuil\b/g, "accueil"],

    // *** B ***
    [/banquaire\b/g, "bancaire"],
    [/bizare\b/g, "bizarre"],
    [/bizard\b/g, "bizarre"],
    [/Bizare\b/g, "Bizarre"],
    [/Bizard\b/g, "Bizarre"],
    [/brebi\b/g, "brebis"],
    [/Brebi\b/g, "Brebis"],

    // *** C ***
    [/cauchemard\b/g, "cauchemar"],
    [/Cauchemard\b/g, "Cauchemar"],
    [/Concour\b/g, "Concours"],
    [/concour\b/g, "concours"],

    // *** D ***
    [/disfonctionnement/g, "dysfonctionnement"],

    // *** E ***
    [/Enmener\b/g, "Emmener"],
    [/enmener\b/g, "emmener"],
    [/Échalotte\b/g, "Échalote"],
    [/échalotte\b/g, "échalote"],

    // ***F***
    [/Faîtes\b/g, "Faites"],
    [/faîtes\b/g, "faites"],

    // ***H***
    [/Hormi\b/g, "Hormis"],
    [/hormi\b/g, "hormis"],


    // *** P ***
    [/parmis\b/g, "parmi"],
    [/Parmis\b/g, "Parmi"],
    [/pillule\b/g, "pilule"],

    // *** J ***
    [/des jeux vidéos/g, "des jeux vidéo"],
    [/les jeux vidéos/g, "les jeux vidéo"],
    [/ces jeux vidéos/g, "ces jeux vidéo"],

    // *** L ***
    [/language/g, "langage"],

    // *** M ***
    [/magazin\b/g, "magasin"],

    // *** P ***
    [/Plusieur\b/g, "Plusieurs"],
    [/plusieur\b/g, "plusieurs"],

    // *** S ***
    [/S'appitoyer\b/g, "S'apitoyer"],
    [/s'appitoyer\b/g, "s'apitoyer"],
    [/Syphon\b/g, "Siphon"],
    [/syphon\b/g, "siphon"],

    // *** U ***
    [/Univer\b/g, "Univers"],
    [/univer\b/g, "univers"],

]

export const inclusive = [

    //  Structure :
    // [/faute/]: "correction",

    // TYPOGRAPHIE
    [/\(e\)/, ""],
    // Enlève ce qui suit un point médian jusqu'à rencontrer un espace.
    [/(?=·).*?(?=\s)/, ""],

    // VOCABULAIRE
    // *** I ***
    [/\sIel\s/, " Il "],
    [/\siel\s/, " il "],
];


//  Ancien test
// const inclusive = {

    //  Structure :
    // "faute": "correction",

//     "\(e\)": "",
//     "\b\w*[·]\w*\b": "REMPLACEMENT",
// }

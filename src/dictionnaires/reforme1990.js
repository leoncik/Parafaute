// Fonction utilitaire : préserve la casse de la première lettre du mot d'origine
function preserveCase(replacement) {
  return (match) => {
    if (
      match[0] === match[0].toUpperCase() &&
      match[0] !== match[0].toLowerCase()
    ) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }
    return replacement;
  };
}

// ============================================================================
// Dictionnaire pour convertir l'orthographe de 1990 vers l'orthographe classique
// ============================================================================
// Deux techniques sont utilisées pour gérer les majuscules sans dupliquer :
//
// 1. Suffixe commun (sans \b initial) : on omet le début du mot pour que la
//    première lettre (porteuse de la casse) ne soit pas touchée.
//    Ex : /pparait/g → "pparaît" couvre "apparait" ET "Apparait"
//
// 2. /gi + preserveCase : quand \b est nécessaire pour éviter les faux positifs.
//    Ex : /\bparait/gi → preserveCase("paraît") évite de matcher "réparait"
// ============================================================================
const reforme1990ToClassique = [
  // === Accent circonflexe sur î ===

  // -- Verbes en -aître (suffixe commun → couvre toutes les conjugaisons) --
  [/pparait/g, "pparaît"], // apparait*, Apparait*
  [/onnait/g, "onnaît"], // connait*, Connait*, reconnait*, méconnait*
  [/isparait/g, "isparaît"], // disparait*, Disparait*
  [/ccroit/g, "ccroît"], // accroit*, Accroit*
  [/\bparait/gi, preserveCase("paraît")], // parait* (\b évite « réparait »)
  [/\bnait/gi, preserveCase("naît")], // nait, naitre, naitra...
  [/\brenait/gi, preserveCase("renaît")], // renait, renaitre...
  [/\bcroitr/gi, preserveCase("croîtr")], // croitre, croitra... (évite croire)
  [/\bplait\b/gi, preserveCase("plaît")], // plait → plaît

  // -- entraîner (suffixe /ntraine/ évite le nom « entrain ») --
  [/ntraine/g, "ntraîne"], // entraine(r|ment|ra...), Entraine*
  [/ntrainé/g, "ntraîné"], // entrainé(e|s|es), Entrainé*
  [/ntrainant/g, "ntraînant"], // entrainant(e|s), Entrainant*

  // -- enchaîner --
  [/nchainement/g, "nchaînement"], // enchainement(s)

  // -- Noms et adjectifs avec î --
  [/\babim/gi, preserveCase("abîm")], // abime(r|é|s...) → abîme*
  [/\bainé/gi, preserveCase("aîné")], // ainé(e|s|es) → aîné*
  [/\bainesse/gi, preserveCase("aînesse")], // ainesse → aînesse
  [/\bboite\b/gi, preserveCase("boîte")], // boite → boîte (\b évite « boiter »)
  [/\bboites\b/gi, preserveCase("boîtes")], // boites → boîtes
  [/\bile\b/gi, preserveCase("île")], // ile → île
  [/\biles\b/gi, preserveCase("îles")], // iles → îles
  [/aitresse/g, "aîtresse"], // maitresse(s), Maitresse(s)
  [/\bmaitre/gi, preserveCase("maître")], // maitre(s) → maître(s)

  // === Accent circonflexe sur û ===
  [/\bbrul/gi, preserveCase("brûl")], // brul(er|ant|é|ure...) → brûl*
  [/\bbuch/gi, preserveCase("bûch")], // buch(e|er|eron...) → bûch*
  [/\bcout\b/gi, preserveCase("coût")], // cout → coût (\b évite « couteau »)
  [/\bcouts\b/gi, preserveCase("coûts")], // couts → coûts
  [/\bflute\b/gi, preserveCase("flûte")], // flute → flûte
  [/\bflutes\b/gi, preserveCase("flûtes")], // flutes → flûtes
  [/\bgout\b/gi, preserveCase("goût")], // gout → goût
  [/\bgouts\b/gi, preserveCase("goûts")], // gouts → goûts
  [/\bgoute/gi, preserveCase("goûte")], // goute(r|nt|ra...) → goûte*
  [/\bgouté/gi, preserveCase("goûté")], // gouté(e|s|es) → goûté*
  [/nvout/g, "nvoût"], // envout(er|ant|ement) → envoût*
  [/\bpiqure/gi, preserveCase("piqûre")], // piqure(s) → piqûre(s)
  [/\bsurement\b/gi, preserveCase("sûrement")], // surement → sûrement
  [/afraich/g, "afraîch"], // rafraich(ir|issement) → rafraîch*
  [/\baout/gi, preserveCase("août")], // aout, aoutat, aoutien → août*

  // === Accent grave → accent aigu ===
  [/\bévènement/gi, preserveCase("événement")], // évènement(s) → événement(s)
  [/\brèglementaire/gi, preserveCase("réglementaire")],
  [/\brèglementation/gi, preserveCase("réglementation")],
  [/\brèglementer/gi, preserveCase("réglementer")],

  // === Tréma (déplacement et ajout) ===
  [/güe/g, "guë"], // aigüe→aiguë, ambigüe→ambiguë, contigüe→contiguë, exigüe→exiguë
  [/güi/g, "guï"], // ambigüité→ambiguïté
  [/rgü/g, "rgu"], // argüer→arguer, argüe→argue, argüons→arguons
  [/geüre/g, "geure"], // gageüre→gageure, mangeüre→mangeure, vergeüre→vergeure, rongeüre→rongeure

  // === Mots soudés → trait d'union ===
  [/\bagroalimentaire/gi, preserveCase("agro-alimentaire")],
  [/\bcontrepied/gi, preserveCase("contre-pied")], // contrepied(s) → contre-pied(s)
  [/\bentretemps\b/gi, preserveCase("entre-temps")],
  [/\btictac/gi, preserveCase("tic-tac")], // tictac(s) → tic-tac(s)
  [/\bweekend/gi, preserveCase("week-end")], // weekend(s) → week-end(s)
  [/\bsagefemme/gi, preserveCase("sage-femme")], // sagefemme(s) → sage-femme(s)

  // === Doubles consonnes (-olle/-otter) ===
  [/\bcorole/gi, preserveCase("corolle")], // corole(s) → corolle(s)
  [/\bfrisot/gi, preserveCase("frisott")], // frisoter→frisotter, frisote→frisotte

  // === -illier/-illière (\b final pour éviter « joaillerie ») ===
  [/\bjoailler\b/gi, preserveCase("joaillier")],
  [/\bjoaillers\b/gi, preserveCase("joailliers")],
  [/\bmarguiller\b/gi, preserveCase("marguillier")],
  [/\bmarguillers\b/gi, preserveCase("marguilliers")],
  [/\bquincailler\b/gi, preserveCase("quincaillier")],
  [/\bquincaillers\b/gi, preserveCase("quincailliers")],
  [/\bserpillère/gi, preserveCase("serpillière")], // serpillère(s) → serpillière(s)

  // === Anomalies ===
  [/\bognon/gi, preserveCase("oignon")], // ognon(s) → oignon(s)
  [/\bnénufar/gi, preserveCase("nénuphar")], // nénufar(s) → nénuphar(s)
  [/ouçâtre/g, "ouceâtre"], // douçâtre(s) → douceâtre(s)
];

// ============================================================================
// Dictionnaire pour convertir l'orthographe classique vers l'orthographe de 1990
// ============================================================================
const reforme1990ToNouvelle = [
  // === Accent circonflexe sur î ===

  // -- Verbes en -aître (suffixe commun) --
  [/pparaît/g, "pparait"], // apparaît*, Apparaît*
  [/onnaît/g, "onnait"], // connaît*, Connaît*, reconnaît*, méconnaît*
  [/isparaît/g, "isparait"], // disparaît*, Disparaît*
  [/ccroît/g, "ccroit"], // accroît*, Accroît*
  [/\bparaît/gi, preserveCase("parait")], // paraît* (\b évite « réparaît »... improbable mais cohérent)
  [/\bnaît/gi, preserveCase("nait")], // naît, naître, naîtra...
  [/\brenaît/gi, preserveCase("renait")], // renaît, renaître...
  [/\bcroîtr/gi, preserveCase("croitr")], // croître, croîtra... (évite croît=croire)
  [/\bplaît\b/gi, preserveCase("plait")], // plaît → plait

  // -- entraîner (suffixe) --
  [/ntraîne/g, "ntraine"], // entraîne(r|ment|ra...), Entraîne*
  [/ntraîné/g, "ntrainé"], // entraîné(e|s|es), Entraîné*
  [/ntraînant/g, "ntrainant"], // entraînant(e|s), Entraînant*

  // -- enchaîner --
  [/nchaînement/g, "nchainement"], // enchaînement(s)

  // -- Noms et adjectifs avec î --
  [/\babîm/gi, preserveCase("abim")], // abîme(r|é|s...) → abime*
  [/\baîné/gi, preserveCase("ainé")], // aîné(e|s|es) → ainé*
  [/\baînesse/gi, preserveCase("ainesse")], // aînesse → ainesse
  [/\bboîte\b/gi, preserveCase("boite")], // boîte → boite
  [/\bboîtes\b/gi, preserveCase("boites")], // boîtes → boites
  [/\bîle\b/gi, preserveCase("ile")], // île → ile
  [/\bîles\b/gi, preserveCase("iles")], // îles → iles
  [/aîtresse/g, "aitresse"], // maîtresse(s), Maîtresse(s)
  [/\bmaître/gi, preserveCase("maitre")], // maître(s) → maitre(s)

  // === Accent circonflexe sur û ===
  [/\bbrûl/gi, preserveCase("brul")], // brûl(er|ant|é|ure...) → brul*
  [/\bbûch/gi, preserveCase("buch")], // bûch(e|er|eron...) → buch*
  [/\bcoût\b/gi, preserveCase("cout")], // coût → cout
  [/\bcoûts\b/gi, preserveCase("couts")], // coûts → couts
  [/\bflûte\b/gi, preserveCase("flute")], // flûte → flute
  [/\bflûtes\b/gi, preserveCase("flutes")], // flûtes → flutes
  [/\bgoût\b/gi, preserveCase("gout")], // goût → gout
  [/\bgoûts\b/gi, preserveCase("gouts")], // goûts → gouts
  [/\bgoûte/gi, preserveCase("goute")], // goûte(r|nt|ra...) → goute*
  [/\bgoûté/gi, preserveCase("gouté")], // goûté(e|s|es) → gouté*
  [/nvoût/g, "nvout"], // envoût(er|ant|ement) → envout*
  [/\bpiqûre/gi, preserveCase("piqure")], // piqûre(s) → piqure(s)
  [/\bsûrement\b/gi, preserveCase("surement")], // sûrement → surement
  [/afraîch/g, "afraich"], // rafraîch(ir|issement) → rafraich*
  [/\baoût/gi, preserveCase("aout")], // août, aoûtat, aoûtien → aout*

  // === Accent aigu → accent grave ===
  [/\bévénement/gi, preserveCase("évènement")], // événement(s) → évènement(s)
  [/\bréglementaire/gi, preserveCase("règlementaire")],
  [/\bréglementation/gi, preserveCase("règlementation")],
  [/\bréglementer/gi, preserveCase("règlementer")],

  // === Tréma (déplacement et ajout) ===
  [/guë/g, "güe"], // aiguë→aigüe, ambiguë→ambigüe, contiguë→contigüe, exiguë→exigüe
  [/guï/g, "güi"], // ambiguïté→ambigüité
  [/\bargue/gi, preserveCase("argüe")], // argue→argüe (spécifique pour éviter « argument »)
  [/\barguer\b/gi, preserveCase("argüer")], // arguer → argüer
  [/geure\b/g, "geüre"], // gageure→gageüre, mangeure→mangeüre, vergeure→vergeüre, rongeure→rongeüre

  // === Trait d'union → mots soudés ===
  [/\bagro-alimentaire/gi, preserveCase("agroalimentaire")],
  [/\bcontre-pied/gi, preserveCase("contrepied")], // contre-pied(s) → contrepied(s)
  [/\bentre-temps\b/gi, preserveCase("entretemps")],
  [/\btic-tac/gi, preserveCase("tictac")], // tic-tac(s) → tictac(s)
  [/\bweek-end/gi, preserveCase("weekend")], // week-end(s) → weekend(s)
  [/\bsage-femme/gi, preserveCase("sagefemme")], // sage-femme(s) → sagefemme(s)

  // === Doubles consonnes (-olle/-otter) ===
  [/\bcorolle/gi, preserveCase("corole")], // corolle(s) → corole(s)
  [/\bfrisott/gi, preserveCase("frisot")], // frisotter→frisoter, frisotte→frisote

  // === -illier/-illière (\b final pour éviter « joaillerie ») ===
  [/\bjoaillier\b/gi, preserveCase("joailler")],
  [/\bjoailliers\b/gi, preserveCase("joaillers")],
  [/\bmarguillier\b/gi, preserveCase("marguiller")],
  [/\bmarguilliers\b/gi, preserveCase("marguillers")],
  [/\bquincaillier\b/gi, preserveCase("quincailler")],
  [/\bquincailliers\b/gi, preserveCase("quincaillers")],
  [/\bserpillière/gi, preserveCase("serpillère")], // serpillière(s) → serpillère(s)

  // === Anomalies ===
  [/\boignon/gi, preserveCase("ognon")], // oignon(s) → ognon(s)
  [/\bnénuphar/gi, preserveCase("nénufar")], // nénuphar(s) → nénufar(s)
  [/ouceâtre/g, "ouçâtre"], // douceâtre(s) → douçâtre(s)
];

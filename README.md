# Parafaute

## Table des matières

-   [Description](#description)
-   [Aperçu](#aperçu)
-   [Utilisation](#utilisation)
-   [Fonctionnalités](#fonctionnalités)
-   [FAQ](#faq)
-   [Licence](#licence)


## Description

**Parafaute** est une extension pour navigateur ayant pour but de rendre le navigation sur le web plus agréable en corrigeant les fautes les plus courantes et certains barbarismes (anglicismes et écriture l'inclusive).

Cette extension utilise la librairie [TextObserver](https://github.com/DanielZTing/TextObserver), ce qui lui permet de corriger les fautes sur des sites où le rendu de la page est généré dynamiquement (comme Facebook, Reddit etc.).

## Aperçu

## Utilisation

Une fois l'extension téléchargée, celle-ci sera active avec 4 paramètres par défauts :

1) La correction de l'écriture inclusive sera active.  
2) La correction des anglicismes sera active.  
3) La correction des fautes courantes sera active.  
4) L'extension ne sera active que sur les sites francophones (dont l'attribut HTML lang est égal à "FR", variantes régionales comprises).

Vous pouvez changer ces options à tout moment pour ne sélectionner que les filtres qui vous intéressent.

## Fonctionnalités

* Corrige divers types de fautes courantes :
    - Vocabulaire (ex: "Plusieur" → "Plusieurs").
    - Expressions (ex: "sa va" → "ça va").
    - Typographie (ex: ajout d'espace fine insécable devant les signes de ponctuation double (points d'exclamation, point d'interrogation, point-virgule)).
* Corrige divers types d'anglicismes :
    - Remplace les anglicismes ayant un équivalent évident (ex: "challenge" → "défi").
    - Remplace les constructions de phrases anglophones (ex: "cela ne fait sens" → "cela n'a aucun sens").
* Corrige divers types d'écriture inclusive :
    - Suppression des points médians (avec leurs divers variantes (point médian, tiret, point normal etc.)) (ex: "tou·te·s" → "tous").
    - Suppression des parenthèses finales (ex: "Abonné(e)s" → "Abonnés").
    - Remplacement des pronoms (ex: "iel" → "il").
    - Simplification des formules où féminin et masculin sont multipliés (ex: "Bonjour à toutes et tous" → "Bonjour à tous").
* Respect de la vie privée : cette extension ne collecte aucune donnée personnelle et n'inclut aucune forme de télémétrie. La permission demandée à l'installation sert uniquement à sauvegarder les options dans le navigateur.

## FAQ

Q : L'extension ne fonctionne pas sur un site.  
R : Essayez l'option "Activer l'extension sur les sites non-francophones".

## Licence

**Parafaute** est sous licence MIT.
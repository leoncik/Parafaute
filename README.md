
<h1 align="left">
<sub>
<img  src="src/icons/icon-48.png" height="38" width="38">
</sub>
Parafaute
</h1>

## Table des matières

-   [Description](#description)
-   [Installation](#installation)
-   [Aperçu](#aperçu)
-   [Utilisation](#utilisation)
-   [Fonctionnalités](#fonctionnalités)
-   [FAQ](#faq)
-   [Licence](#licence)


## Description

**Parafaute** est une extension pour navigateur ayant pour but de rendre la navigation sur le web plus agréable en corrigeant les fautes les plus courantes et certains barbarismes (anglicismes et écriture l'inclusive).

Cette extension utilise la bibliothèque [TextObserver](https://github.com/DanielZTing/TextObserver), ce qui lui permet de corriger les fautes sur des sites où le rendu de la page est généré dynamiquement (comme Facebook, Discord, etc.).

## Installation

Vous pouvez télécharger facilement l'extension depuis :

- Le [Chrome Web Store](https://chrome.google.com/webstore/detail/parafaute/jfnefaojdbdjdaobckpmbgfibannmpcg) pour l'utiliser sur Google Chrome et tout navigateur basé sur Chromium (Brave, Opera, Vivaldi etc.).

- Le site des [Modules pour Firefox](https://addons.mozilla.org/fr/firefox/addon/parafaute/) pour l'utiliser sur Firefox.

## Aperçu

![Avant](https://github.com/user-attachments/assets/f256bac6-5544-4a68-8ea8-9f85c5f31c7c)

![Après](https://github.com/user-attachments/assets/c8f6e459-d125-4747-9d1b-7dbd61c44b06)

## Utilisation

Une fois l'extension téléchargée, celle-ci sera active avec 5 paramètres par défauts :

1) La correction de l'écriture inclusive sera active.  
2) La correction des anglicismes sera active.  
3) La correction des fautes courantes sera active.  
4) La correction des erreurs de typographie sera inactive.  
5) La correction de certaines formes graphiques de la réforme de 1990 sera inactive.  
6) L'extension ne sera active que sur les sites francophones (dont l'attribut HTML *lang* est égal à "FR", variantes régionales comprises).

Vous pouvez changer ces options à tout moment pour ne sélectionner que les filtres qui vous intéressent.

![Options](https://github.com/user-attachments/assets/074246fd-ba6f-4d3b-8610-e6d24d8d7efd)


## Fonctionnalités

* Corrige divers types de fautes courantes :
    - Vocabulaire (ex : "Plusieur" → "Plusieurs").
    - Expressions (ex : "sa va" → "ça va").
* Corrige divers types d'anglicismes :
    - Remplace les anglicismes ayant un équivalent évident (ex : "challenge" → "défi").
    - Remplace les constructions de phrases anglophones (ex : "cela ne fait aucun sens" → "cela n'a aucun sens").
* Corrige divers types d'écriture inclusive :
    - Suppression des points médians (avec leurs divers variantes (point médian, tiret, point normal etc.)) (ex : "tou·te·s" → "tous").
    - Suppression des parenthèses finales (ex : "Abonné(e)s" → "Abonnés").
    - Remplacement des pronoms (ex : "iel" → "il").
    - Simplification des formules où féminin et masculin sont multipliés (ex : "Bonjour à toutes et tous" → "Bonjour à tous").
* Corrige les erreurs courantes de typographie (ex : ajout d'espace fine insécable devant les points d'exclamation et point d'interrogation).
* Permet de convertir certaines formes de la réforme orthographique de 1990 vers une graphie plus classique (ex : "ognon" → "oignon").
* Affiche le nombre total de corrections effectuées sur la page actuelle ainsi que le détail par filtre. 
* Respect de la vie privée : cette extension ne collecte aucune donnée personnelle et n'inclut aucune forme de télémétrie. La permission demandée à l'installation sert uniquement à sauvegarder les options dans le navigateur.

## FAQ

Q : L'extension ne fonctionne pas sur un site.  
R : Essayez l'option "Activer l'extension sur les sites non-francophones". Certains sites peuvent également présenter le texte sous une forme qui ne peut être traitée par l'extension.

Q : Je suis développeur et lorsque je copie des extraits de code trouvés sur internet je me retrouve avec des erreurs.  
R : Cela doit provenir des espaces insécables venant de la correction liée aux fautes de typographie. Pour éviter ces désagréments, je vous recommande de décocher l'option « Fautes de typographie ».

Q : Est-ce que cette extension corrige les fautes grammaticales comme l'accord du participe ?  
R : Non, pas pour le moment (peut-être dans l'avenir si cette fonctionnalité ne ralentit pas l'extension). Cette extension ne fait que des corrections d'ordre lexicales (remplacement d'une expression par une autre) et n'analyse donc pas la structure des phrases.

Q : Je rencontre un problème avec l'extension.  
R : Vous pouvez faire un rapport de bug avec l'outil "issues" en cliquant [ici](https://github.com/leoncik/Parafaute/issues).

Q : Une expression incorrecte n'est pas corrigée.  
R : N'hésitez pas à proposer des expressions pour enrichir les cas pris en compte par l'extension. Pour cela vous pouvez utiliser l'outil "issues" (avec le label "enhancement") en cliquant [ici](https://github.com/leoncik/Parafaute/issues).


## Licence

**Parafaute** est sous licence MIT.

# CV — source HTML

Source modifiable du CV de Benjamin Guillemin. C'est désormais **la source de
vérité** : on édite ici, puis on régénère le PDF servi par le portfolio
(`public/cv.pdf`).

## Fichier

- `cv.html` — CV complet, autonome (une page A4, 794 × 1123 px). Aucune
  dépendance locale : la police Inter est chargée depuis Google Fonts.

## Modifier le CV

1. Ouvrir `cv.html` dans un navigateur pour prévisualiser.
2. Éditer le contenu directement dans le HTML (texte des sections), ou les
   couleurs / tailles via les variables CSS en haut du `<style>` (`:root`).
3. La mise en page est en flux normal (flexbox) : le texte reflue tout seul
   quand on l'allonge ou le raccourcit, sans casser l'alignement.

## Boucle d'export

```
cv.html  ──(html.to.design)──►  Figma  ──(export)──►  public/cv.pdf
```

1. **Vers Figma** : plugin [html.to.design](https://html.to.design) →
   importer le fichier `cv.html` (ou son URL) dans le fichier Figma
   `CV - Benjamin Guillemin 2026`.
2. **Vers PDF** : depuis Figma, exporter la frame en PDF et remplacer
   `public/cv.pdf` à la racine du projet.

### Alternative : PDF directement depuis le HTML

Le fichier embarque une CSS d'impression (`@page A4`, marges à zéro). Dans
le navigateur : `Imprimer → Enregistrer en PDF → format A4, marges aucune`.
Pratique pour un export rapide sans passer par Figma.

## Notes

- Tailles en `px` volontairement (pas de `rem`) pour un mapping 1:1 avec la
  frame A4 de Figma et un import html.to.design fidèle.
- Reconstruit à partir du node Figma `14:3`
  (`figma.com/design/h86izH5YB3imdwhhZTrkQE`).

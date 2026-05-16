# Fix : flash au chargement des sections (animations framer-motion)

## Contexte

Sur la GitHub Pages du portfolio, toutes les sections présentent un clignotement visible au chargement :
le fond de la section s'affiche immédiatement, mais les éléments enfants démarrent à `opacity: 0`
(état initial framer-motion). Pendant 1-2 frames, avant que l'IntersectionObserver déclenche
l'animation `whileInView`, le fond est visible mais le contenu est invisible — c'est le flash.

## Cause racine

Chaque `motion.div` enfant a `initial={{ opacity: 0, y: 20 }}`. La section elle-même (et son fond)
est un `<section>` HTML ordinaire — rendu immédiatement. Il y a donc un court instant où le fond de
section est visible mais tout son contenu est transparent.

## Solution retenue : opacité au niveau section (Approche A)

Déplacer le contrôle de l'opacité du niveau *item* vers le niveau *section*, via un `motion.div`
wrapper sur le container `max-w-7xl`. Les items conservent uniquement la translation `y` (slide),
l'opacité étant portée par le parent.

### Pattern de base

```tsx
<section className="... bg-gray-50 dark:bg-gray-800">
  <motion.div
    className="max-w-7xl mx-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
  >
    {/* items : initial={{ y: 20 }}, whileInView={{ y: 0 }} */}
  </motion.div>
</section>
```

Le fond et son contenu deviennent invisibles ensemble, puis visibles ensemble — plus de fond vide.

## Changements fichier par fichier

### `src/components/SectionTitle.tsx`
- `initial={{ opacity: 0, y: 20 }}` → `initial={{ y: 20 }}`
- `whileInView={{ opacity: 1, y: 0 }}` → `whileInView={{ y: 0 }}`

### `src/components/sections/Skills.tsx`
- Envelopper `<div className="max-w-7xl mx-auto">` dans `<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>`
- Cartes : `initial={{ opacity: 0, y: 20 }}` → `initial={{ y: 20 }}` ; `whileInView={{ opacity: 1, y: 0 }}` → `whileInView={{ y: 0 }}`

### `src/components/sections/Experience.tsx`
- Même wrapper opacity sur `max-w-7xl`
- Items : `initial={{ opacity: 0, x: -20 }}` → `initial={{ y: 10 }}` ; `whileInView={{ opacity: 1, x: 0 }}` → `whileInView={{ y: 0 }}`

### `src/components/sections/Education.tsx`
- Même wrapper opacity sur `max-w-7xl`
- Carte unique : `initial={{ opacity: 0, y: 20 }}` → `initial={{ y: 20 }}` ; `whileInView={{ opacity: 1, y: 0 }}` → `whileInView={{ y: 0 }}`

### `src/components/sections/OpenSource.tsx`
- Même wrapper opacity sur `max-w-7xl`
- Items : `initial={{ opacity: 0, y: 20 }}` → `initial={{ y: 20 }}` ; `whileInView={{ opacity: 1, y: 0 }}` → `whileInView={{ y: 0 }}`

### `src/components/sections/Tutorials.tsx`
- Même wrapper opacity sur `max-w-7xl`
- Items : `initial={{ opacity: 0, y: 20 }}` → `initial={{ y: 20 }}` ; `whileInView={{ opacity: 1, y: 0 }}` → `whileInView={{ y: 0 }}`

### `src/components/sections/Contact.tsx`
- Transformer `<div className="max-w-7xl mx-auto">` en `<motion.div>` avec le même wrapper opacity (pattern identique aux autres sections)
- `motion.div` interne existant (max-w-2xl) : `initial={{ opacity: 0, y: 20 }}` → `initial={{ y: 20 }}` ; `whileInView={{ opacity: 1, y: 0 }}` → `whileInView={{ y: 0 }}`
- Items : `initial={{ opacity: 0, y: 10 }}` → `initial={{ y: 10 }}` ; `whileInView={{ opacity: 1, y: 0 }}` → `whileInView={{ y: 0 }}`

### `src/components/sections/About.tsx`
- Cas spécial : utilise `animate` (pas `whileInView`) — pas d'IntersectionObserver
- Ajouter `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}` directement sur le `<section>` (transformer en `<motion.section>`)
- Conserver les animations `x` sur les deux panneaux intérieurs, supprimer leur `opacity`

## Résultat attendu

- Aucun fond de section visible sans contenu
- Effet visuel conservé : fade-in de la section + slide-up des éléments individuels
- Aucune dépendance ajoutée (framer-motion déjà utilisé partout)

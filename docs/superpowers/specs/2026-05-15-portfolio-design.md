# Portfolio vbeaucha.github.io — Design Spec

**Date :** 2026-05-15
**Repository :** `vbeaucha/vbeaucha.github.io`
**URL finale :** `https://vbeaucha.github.io`

---

## 1. Stack technique

| Outil | Version | Rôle |
|---|---|---|
| Vite | latest | Bundler, dev server |
| React | 18 | UI framework |
| TypeScript | 5 | Typage statique |
| Tailwind CSS | v3 | Styles + dark/light mode |
| React Router | v6 | Navigation entre pages |
| react-markdown | latest | Rendu des fichiers `.md` |
| GitHub Actions | — | Build et déploiement automatique |

---

## 2. Architecture

### Structure des fichiers

```
vbeaucha.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── OpenSource.tsx
│   │   ├── Tutorials.tsx
│   │   └── Contact.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── TutorialPage.tsx
│   ├── data/
│   │   └── cv.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

### Données CV

Toutes les données du CV sont centralisées dans `src/data/cv.ts` (TypeScript typé). Aucune donnée hardcodée dans les composants.

---

## 3. Pages et routing

Routing via `HashRouter` (nécessaire pour GitHub Pages — évite les 404 sur rechargement).

| Route | Composant | Description |
|---|---|---|
| `/#/` | `Home` | Page principale avec toutes les sections CV |
| `/#/tutorials/git` | `TutorialPage` | Table des matières du tutoriel Git |
| `/#/tutorials/git/docs/:chapter` | `TutorialPage` | Chapitre Git individuel |
| `/#/tutorials/vim` | `TutorialPage` | Tutoriel Vim (readme unique) |

---

## 4. Composants

### Page Home — sections dans l'ordre

1. `<Header />` — Nom (BEAUCHAMP Valentin), titre (Lead DevOps / SRE), liens (LinkedIn, GitHub, email, téléphone), `<ThemeToggle />`
2. `<About />` — Texte de profil
3. `<Experience />` — 3 entrées :
   - **Adzuna** (Jan. 2024 – présent) — Lead DevOps / Infrastructure
   - **Weaverize** (2021 – 2024) — Embedded Engineer / DevOps, avec deux sous-contextes distincts : poste interne (SpreadTheLive, live streaming, OVHCloud) et mission consulting (store management SaaS, GCP/GKE)
   - **Université de Lille** (2017 – 2021) — Research Engineer
4. `<Skills />` — Go · Rust · PostgreSQL · Debezium · Kafka · NATS · Kubernetes · Helm · Docker · Terraform · OpenTofu · AWS · GCP · Observability stack
5. `<Education />` — Polytech'Lille, Computer Engineering, Microelectronics & Automation
6. `<OpenSource />` — Crunchy-data · Kubernetes · ZomboDB
7. `<Tutorials />` — Cards cliquables vers `/tutorials/git` et `/tutorials/vim`
8. `<Contact />` — Email · Téléphone · LinkedIn · Localisation (Croix, France)

### TutorialPage — composant générique

- Reçoit en props le repo GitHub source et le chemin du fichier
- Fetche le contenu brut depuis `raw.githubusercontent.com`
- Rend le Markdown avec `react-markdown`
- Renderer custom pour les liens : les liens `.md` relatifs sont interceptés et convertis en routes internes (navigation sans rechargement)

**URLs de fetch :**
- Git readme : `raw.githubusercontent.com/vbeaucha/git-tuto/main/readme.md`
- Git chapitres : `raw.githubusercontent.com/vbeaucha/git-tuto/main/docs/{chapter}.md`
- Vim readme : `raw.githubusercontent.com/vbeaucha/simple-vim-explain/main/readme.md`

---

## 5. Dark / Light mode

- Toggle géré par `<ThemeToggle />` dans le Header
- Classe `dark` ajoutée/retirée sur `<html>`
- Préférence persistée dans `localStorage`
- Tailwind gère les styles via les classes `dark:` 

**Palette de couleurs** (cohérente avec le CV LaTeX) :
- Accent : `#3D8EC9`
- Background sombre (dark mode) : `#1C2A3A`
- Background clair (light mode) : `#F8FAFC`
- Texte principal : `#1C2A3A` (light) / `#F8FAFC` (dark)

---

## 6. Déploiement

### GitHub Actions (`.github/workflows/deploy.yml`)

```
Push sur main
  → npm ci
  → npm run build   (Vite génère dist/)
  → deploy vers la branche gh-pages
  → GitHub Pages sert le contenu de gh-pages
```

### Configuration Vite

```ts
// vite.config.ts
base: '/'  // domaine racine, pas de sous-chemin
```

---

## 7. Critères de succès

- [ ] Le portfolio est accessible sur `https://vbeaucha.github.io`
- [ ] Dark/light mode fonctionne avec persistance du choix
- [ ] Les tutoriels Git (16 chapitres) et Vim sont navigables sans quitter le site
- [ ] Les liens internes du tutoriel Git fonctionnent en navigation interne (pas de rechargement GitHub)
- [ ] Le CV est lisible sur mobile et desktop
- [ ] Le déploiement est automatique sur push vers `main`

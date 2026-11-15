# Full-Stack Software Engineering Roadmap

A static, responsive learning tracker for following a long-term full-stack software engineering roadmap. It uses only HTML, CSS, vanilla JavaScript modules, and browser LocalStorage; there is no backend or build step.

## Features

- 12 roadmap categories with selectable frontend and backend learning paths.
- Choose multiple frontend/backend languages and optional frameworks; each selected language includes its fundamentals before framework topics.
- Overall, category, completed-topic, remaining-topic, and completed-category statistics.
- Search by topic title or description, plus completion and priority filters.
- Collapsible categories and direct navigation.
- Import and export of versioned JSON progress backups.
- Confirmed reset and import actions.
- Accessible controls and a responsive dark dashboard.

## Project structure

```text
.
├── index.html
├── README.md
├── assets/
│   └── favicon.svg
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── progress.js
    ├── roadmap.js
    ├── storage.js
    └── ui.js
```

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript (ES modules)
- LocalStorage

## Run locally

Because the application uses JavaScript modules, serve the repository through a local HTTP server rather than opening `index.html` directly. For example, with Python installed:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Progress storage and backups

Completion state and selected learning paths are saved immediately under the `software-engineering-roadmap-progress` LocalStorage key in the current browser and on the current origin. Version 2 backups include completed topic IDs and the selected frontend/backend languages and frameworks:

```json
{
  "version": 2,
  "completedTopics": {
    "backend-engineering-rust-ownership": true
  },
  "selections": {
    "frontend": {
      "languages": ["javascript"],
      "frameworks": { "javascript": ["react"] }
    },
    "backend": {
      "languages": ["rust"],
      "frameworks": { "rust": ["axum"] }
    }
  },
  "updatedAt": "2026-11-15T09:08:52.368Z"
}
```

Version 1 progress files are still accepted and load with the default paths. Import validates the file and asks before replacing current progress and path selections. Keep exported backups somewhere safe if you want to move progress to another browser.

If existing browser data is malformed or unsupported, it is left untouched and an on-page warning is shown. Unknown topic IDs or removed path options in valid backups are ignored so a backup from a different roadmap revision remains usable. Unchecking a language removes its topics from current progress totals; its saved topic completions are retained and become active again if that language is selected later.

## Publish with GitHub Pages

1. Push this project to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the app and the repository root (`/`) as the folder, then save.
5. Wait for the Pages deployment and open the URL GitHub provides.

The page uses relative stylesheet, script, and favicon URLs, so it works from a repository subpath as well as a root domain. No backend, database, or environment configuration is needed.

# MockOutcyclingWebsite

This repository hosts multiple static website mocks for OutCycling. Each mock lives in its own subfolder inside `docs/` so it can be served from a unique subpath on GitHub Pages. Shared media assets are stored once under `docs/media` so all mocks can reuse them.

## Repository layout

```
docs/
├── index.html        # lists available mocks
├── media/            # shared images and other assets
└── mock1/            # current OutCycling mock
    ├── index.html
    ├── join.html
    ├── script.js
    └── styles.css
```

## Adding a new mock

1. Create a new folder under `docs/` (e.g. `mock2/`) and add your HTML/CSS/JS files.
2. Reference shared assets with paths like `../media/your-image.jpg`.
3. Add a link to the new folder in `docs/index.html` so it appears in the mock listing.

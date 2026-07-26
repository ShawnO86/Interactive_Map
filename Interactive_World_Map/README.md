# Interactive World Map. 

An SVG-based world map built with Vue 3.
Clicking on any country zooms in smoothly and pulls up some live data: capital, region, and income level.
Data is sourced from the World Bank API.

**Live Demo:** https://interactive-map-hpyt.onrender.com

## Current Features

*  **Click-to-zoom navigation**: Clicking a country gets the SVG bounding box and animates the map's `viewBox` to frame it, using GSAP for smooth transitions.
*  **Manual pan & zoom control**: Arrow buttons pan the view (scaled to the current zoom level so not too much movement), plus dedicated zoom in/out controls.
*  **Hover tooltips**: Mousing over a country highlights it and shows its name in a tooltip that follows the cursor, with edge-aware positioning so it doesn't run off-screen.
*  **Live country data panel**: Selecting a country fetches some basic info including: capital, region, and income level from the [World Bank API](https://api.worldbank.org/) and displays it alongside the country's flag.
*  **Bookmarkable state via Vue Router**: Each selected country updates the URL (`/country/:id`), so views can be shared, bookmarked, or navigated to with browser back/forward.
*  **Lazy-loaded map**: The world map SVG is large, so it's loaded asynchronously for a responsive initial load.
*  **Optimized SVG bundling** — Vite + `vite-svg-loader` imports SVGs as Vue components and strips unnecessary bloat at build time.

## Tech Stack

* **Framework**: Vue 3 using the Composition API
* **Routing**: Vue Router
* **Animation**: GSAP
* **Build Tool**: Vite

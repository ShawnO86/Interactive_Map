# Interactive World Map

An interactive SVG world map.

## Features

SVG interaction - Users can click on countries to zoom in using the SVG path's bounding box which is then translated into it's viewBox attribute.
Pan and Zoom Control - Using SVG viewBox, the user can manually pan and zoom the map, changing the relative x, y, width, and height values of the viewBox.
Hover Tooltip - Highlights the country and displays the country name on mouse hover. The tooltip follows the mouse cursor.
Animations - Utilize GSAP for smooth (zoom, pan) SVG viewBox animations. All other animations (opacity, color, etc.) are done with CSS transition for efficiency.
Responsive Design - SVG is inheritly responsive, layout shifts are done with Vue reactivity and CSS media queries.
Front-end Routing - Use of Vue-router to allow for bookmarking and navigation to a specific output or application state. Also allows for use of browser controls and history.
Async and "Lazy load" Components - To reduce initial load times and provide some visible parts of the page as they get loaded. The world map SVG image is quite large and could block the loading of the rest of the app while it is downloading.
Vite - Bundle and optimize CSS, JS, and SVG files (Vite-svg-loader loads svg files as vue components and optimizes them, reducing file size). 

Testing - Messing around with and learning to use vitest, vue test-utils, and playwright.
# Interactive World Map

An interactive SVG world map.

## Features

SVG interaction - Users can click on countries to zoom in using the SVG path's bounding box which is then translated into it's viewBox attribute.
Pan and Zoom Control - Using SVG viewBox, the user can manually pan and zoom the map, changing the relative x, y, width, and height values of the viewBox.
Hover Tooltip - Highlights the country and displays the country name on mouse hover. The tooltip follows the mouse cursor.
Animations - Utilize GSAP for smooth (zoom, pan) SVG viewBox animations. All other animations (opacity, color, etc.) are done with CSS transition for efficiency.
Responsive Design - SVG is inheritly responsive, layout shifts are done with Vue reactivity and CSS media queries.
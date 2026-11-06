# Visionary Testimonials Showcase — Unique Chromatic Edition (Task 5)

A showstopping, accessible customer testimonials showcase built with pure **HTML5, CSS3, and Vanilla JavaScript (ES6+)**. Features a bespoke multi-palette chromatic design system, interactive 3D perspective physics, cursor spotlight glare, and zero framework dependencies.

![Version](https://img.shields.io/badge/version-2.0.0-blueviolet.svg)
![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)
![Design](https://img.shields.io/badge/design-Prismatic%20Glass-ff007f.svg)

---

## 🎨 Unique Color Palettes & Aesthetic System

This edition introduces an interactive **Aesthetic Palette Switcher** directly in the header toolbar, allowing users to switch themes on the fly:

1. **🌌 Aurora Borealis (Default)**:
   - *Colors*: Electric Cyan (`#00f2fe`), Neon Azure (`#4facfe`), Cosmic Violet (`#a855f7`).
   - *Atmosphere*: Deep cosmic obsidian void with floating multi-color aurora orbs.
2. **⚡ Cyber Acid**:
   - *Colors*: Acid Matrix Lime (`#00ff87`), Neon Turquoise (`#60efff`), Vibrant Emerald (`#10b981`).
   - *Atmosphere*: High-contrast cyberpunk editorial aesthetic with glowing neon telemetry.
3. **🌅 Sunset Luxe**:
   - *Colors*: Warm Golden Amber (`#f6d365`), Pink Champagne (`#ff7eb3`), Rose Quartz (`#ff758c`).
   - *Atmosphere*: Warm, luxurious editorial glow with champagne highlights.
4. **☀️ / 🌙 Contrast Mode**:
   - High-contrast obsidian night mode and opalescent porcelain glass light mode with `localStorage` memory.

---

## 💎 Unique Design Innovations

- **Dynamic Cursor Spotlight Glare**: Cards track mouse movement in real time and project an optical radial spotlight (`--mouse-x`, `--mouse-y`) across the frosted glass surface.
- **Gentle 3D Perspective Tilt**: Moving your cursor over cards tilts them with realistic optical depth (`perspective(1000px) rotateX(...) rotateY(...) scale3d(...)`).
- **Chromatic Ambient Aurora Mesh**: Three animated gradient orbs float and pulse in the background, creating a living canvas.
- **Cinematic Noise Grain**: Micro-grain SVG texture overlay provides cinema-grade visual depth without external image dependencies.
- **Social Proof Pill with Avatar Stack**: Overlapping authentic client avatars with gold star ratings and a live verified counter.
- **Digital Cyber Counter**: Monospaced terminal-style live slide counter (`[ 01 // 06 ]`).
- **Prismatic Pagination Track**: Pagination dots dynamically morph into illuminated gradient pills.
- **Spectrum Autoplay Bar**: An animated glowing gradient progress trail that fills smoothly during the 5-second interval.
- **Radar Pulse Badge**: Pulsing radar beacon in the header denoting live verified customer submissions.

---

## 🚀 How to Run the Project in VS Code

1. In VS Code, open the folder: `File > Open Folder...` and select either `task-5-testimonials` or the project root.
2. Right-click `index.html` and click **"Open with Live Server"** (or double-click `index.html` in your file explorer).
3. Try clicking **Aurora**, **Cyber**, and **Sunset** in the header toolbar to watch the entire color ecosystem and aurora orbs shift instantly.

---

## ⌨️ Interactive Controls & Shortcuts

| Action | Control | Description |
| :--- | :--- | :--- |
| **Navigate Slides** | <kbd>←</kbd> / <kbd>→</kbd> | Smooth circular hardware-accelerated carousel slide. |
| **Play / Pause** | <kbd>Space</kbd> | Toggles the autoplay spectrum timer. |
| **First / Last** | <kbd>Home</kbd> / <kbd>End</kbd> | Jump directly to the first or last available slide. |
| **Touch / Drag** | Swipe / Drag | Fluid touch swipe gestures for mobile screens & mouse drag for desktop. |
| **Palette Switch** | Click Toolbar Pills | Shifts active CSS custom properties between 3 bespoke themes. |
| **Contrast Mode** | Click Sun / Moon | Toggles between Deep Obsidian and Opalescent Porcelain themes. |

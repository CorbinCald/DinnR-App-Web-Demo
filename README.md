# DinnR Prototype

A web-based interactive demo of the DinnR mobile app widget, exported from Figma and enhanced with functional interactions.

## Overview

DinnR is a restaurant discovery widget that displays on an iPhone lock screen. Users can swipe through cuisine categories (Italian, Chinese, Mexican) and tap on restaurant icons to view details.

## Demo Features

- **Swipeable Carousel**: Navigate between 3 cuisine menus (Italian → Chinese → Mexican)
- **Hover States**: Restaurant names appear on icon hover/touch
- **Interactive Dialog**: Click Spaghetti Land icon to see detail card, click card to expand
- **iPhone Frame**: Realistic device mockup with status bar and dock

## File Structure

```
FigmaPrototype/
├── index.html          # Main HTML structure
├── style.css           # All styling (iPhone frame, carousel, dialogs)
├── script.js           # Interactions (swipe, hover, dialog)
├── README.md           # This file
├── finalAssets/        # All production images
│   ├── *Icon.png       # Restaurant icons (103x103px)
│   ├── *BackdropImage.png  # Widget backgrounds
│   └── spaghettilandFullDialogueFrame.png  # Dialog content
├── Components/         # Legacy Figma exports (Italian backdrop only)
└── Examples/           # Design reference images
```

## How to Run

1. Open `index.html` in a web browser
2. No build step or server required - it's pure HTML/CSS/JS

## Interactions

| Action | Result |
|--------|--------|
| Swipe left/right on widget | Navigate between cuisine menus |
| Click carousel dots | Jump to specific menu |
| Hover over restaurant icon | Show restaurant name label |
| Click Spaghetti Land icon | Show detail preview card |
| Click detail card | Open full-screen dialog |
| Click X or outside dialog | Close dialog |
| Press Escape key | Close dialog |

## Assets

### Restaurant Icons (103x103px)
- **Italian**: oliveGardenIcon, spaghettiLandIcon, byTheBucketIcon
- **Chinese**: pandaExpressIcon, mandarinIcon, luckyDragonIcon
- **Mexican**: angelicasIcon, greenIguanaIcon, losMoritasIcon

### Backgrounds
- `ItalianWidgetBackdrop.png` (in Components/phoneFrameItalian/)
- `chineseBackdropImage.png`
- `mexicanBackdropImage.png`

## Key CSS Classes

| Class | Purpose |
|-------|---------|
| `.phone-frame` | iPhone device container (393x852px) |
| `.carousel-slide` | Individual menu slide |
| `.icon-wrapper` | Restaurant icon container with hover effects |
| `.icon-wrapper.clickable` | Interactive icon (Spaghetti Land) |
| `.hover-label` | Text that appears on hover |
| `.detail-card` | Preview card shown on icon click |
| `.dialog-overlay` | Full-screen modal backdrop |

## Customization

### Adding a New Restaurant
1. Add icon image to `finalAssets/` (103x103px PNG)
2. Add `<div class="icon-wrapper">` in the appropriate carousel slide
3. Include `<img>` with icon path and `<span class="hover-label">` with name

### Making an Icon Clickable
1. Add `clickable` class and unique `id` to the icon wrapper
2. Create initialization function in `script.js` (see `initSpaghettiLandDialog`)

### Changing Colors
Edit CSS variables in `:root` section of `style.css`:
- `--burnt-red`: Logo/accent color
- `--warm-cream`: Logo stroke color  
- `--sage-green`: Detail card background

## Browser Support

Tested on modern browsers (Chrome, Firefox, Safari, Edge). Uses:
- CSS Flexbox
- CSS Custom Properties
- CSS Transitions/Animations
- Touch Events API
- Backdrop Filter (for dock blur)

## Credits

- Design: Figma prototype
- Fonts: Google Fonts (Baloo 2, Inter)

"# SAE MNIT Website - Futuristic Automotive Engineering Portal

## 🏎️ Overview
A fully responsive, animated, and high-tech website for SAE MNIT (Society of Automotive Engineers – MNIT Jaipur) featuring futuristic mechanical aesthetics with rotating gears, neon robotic fonts, blueprint overlays, and smooth page transitions.

## 🎨 Design Features

### Visual Theme
- **Color Scheme**: 
  - Electric Blue (#00d9ff) - Primary neon accent
  - Golden (#ffd700) - Secondary accent (from Tvaran logo)
  - Neon Orange (#ff6b35) - Tertiary accent
  - Raven Purple (#a855f7) - RavenCrew theme
  - Dark navy/charcoal background

### Key Visual Elements
- Neon robotic fonts (Orbitron for titles)
- Circuit board backgrounds
- Blueprint grid overlays
- Rotating SVG gears (single, meshed pairs, gear+piston mechanism)
- Floating micro-gear particles
- Glass-card UI panels
- Smooth page transitions

## 📁 File Structure

```
sae/
├── index.html          # Main landing page
├── tvaran.html        # Tvaran Racing team page
├── ravencrew.html     # RavenCrew team page
├── css/
│   └── styles.css     # All styling and animations
├── js/
│   └── main.js        # Interactive features and animations
└── README.md          # This file
```

## 🚀 Pages & Sections

### 1. Home Page (index.html)

#### Sections:
- **Hero**: Large neon title, animated tagline, circuit board background, parallax gears
- **About SAE**: Mission statement, animated mechanical vectors, statistics
- **Vision**: Four vision cards (Precision, Performance, Innovation, Teamwork)
- **Teams**: Tvaran Racing and RavenCrew cards with rotating background gears
- **Projects**: Image slider with lightbox effect
- **Contact**: Contact form and social links
- **Footer**: Rotating micro-gear

### 2. Tvaran Racing Page (tvaran.html)
- Team hero with large rotating gear
- About section with achievements
- Vision statement and focus areas
- Team members grid (8 members with photos)
- Contact information

### 3. RavenCrew Page (ravencrew.html)
- Team hero with purple theme
- About section with achievements
- Vision statement and focus areas
- Team members grid (8 members with photos)
- Contact information

## ⚙️ Mechanical Animations

### Implemented Animations:
1. **Single Rotating Gear**: Continuous rotation
2. **Meshed Gear Pair**: Two gears rotating in opposite directions with correct speed ratio
3. **Gear + Piston Mechanism**: Piston moving sinusoidally, gear-driven
4. **Scroll-Reactive Rotation**: Gears spin faster on scroll
5. **Floating Micro-Gears**: Particle system in background
6. **Member Card Gears**: Rotate on hover

## 🎭 Interactive Features

- Smooth page transitions (fade/slide effects)
- Parallax scrolling
- Scroll-triggered animations
- Hover effects with neon glow
- Auto-sliding project gallery
- Responsive navigation menu
- Typing effect for hero tagline
- Floating particle system
- Scroll-reactive gear speeds
- Blueprint circuit path animations

## 📱 Responsive Design

Fully responsive across:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

Mobile features:
- Hamburger menu
- Stacked layouts
- Optimized gear sizes
- Touch-friendly interactions

## 🛠️ Customization Guide

### Changing Colors:
Edit CSS variables in `css/styles.css`:
```css
:root {
    --electric-blue: #00d9ff;
    --golden: #ffd700;
    --neon-orange: #ff6b35;
    --raven-purple: #a855f7;
}
```

### Adding Team Members:
1. Open `tvaran.html` or `ravencrew.html`
2. Find the `<div class=\"members-grid\">` section
3. Copy a member card structure:
```html
<div class=\"member-card\">
    <div class=\"member-photo\">
        <img src=\"PHOTO_URL\" alt=\"Name\">
        <div class=\"member-gear\">
            <!-- SVG gear code -->
        </div>
    </div>
    <h3 class=\"member-name\">Name</h3>
    <p class=\"member-position\">Position</p>
</div>
```
4. Replace PHOTO_URL, Name, and Position

### Adjusting Gear Speeds:
In `css/styles.css`, find animation durations:
```css
.gear-large {
    animation: rotate 15s linear infinite; /* Change 15s */
}
```

In `js/main.js`, adjust rotation speeds:
```javascript
const speed1 = 0.5; // Increase for faster rotation
```

### Modifying Transition Speed:
In `css/styles.css`:
```css
:root {
    --transition-speed: 0.4s; /* Adjust timing */
}
```

### Changing Fonts:
Replace Google Fonts link in HTML:
```html
<link href=\"https://fonts.googleapis.com/css2?family=NEW_FONT&display=swap\">
```

Update CSS:
```css
.neon-title {
    font-family: 'NEW_FONT', monospace;
}
```

## 🔧 Technical Details

### Technologies Used:
- **HTML5**: Semantic markup
- **CSS3**: Animations, gradients, transforms
- **JavaScript (Vanilla)**: No frameworks
- **SVG**: Vector graphics for gears
- **Canvas API**: Particle system

### Browser Support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Optimizations:
- Throttled scroll events
- CSS transform animations (GPU-accelerated)
- Lazy-loaded animations
- Optimized SVG paths
- Efficient particle system

## 📧 Team Member Photo Sources

Currently using placeholder images from:
- `https://i.pravatar.cc/200?img=XX`

Replace with actual team photos by updating the `src` attribute in each member card.

## 🎯 SEO & Accessibility

- Semantic HTML5 elements
- Meta descriptions
- Alt text for images
- ARIA labels (can be enhanced)
- Keyboard navigation support
- Focus states for interactive elements

## 🚀 Deployment

### To Deploy:
1. Upload all files maintaining folder structure
2. Ensure assets are accessible
3. Update any absolute paths if needed
4. Test on staging environment

### Access the Website:
Navigate to: `http://YOUR_DOMAIN/sae/`

## 📝 Notes

- All gears are SVG-based for crisp scaling
- Neon effects use CSS text-shadow
- Page transitions use CSS opacity + JS timing
- No external dependencies (except Google Fonts)
- All images are embedded or linked

## 🎨 Asset Credits

- Circuit board background: Provided by user
- Tvaran logo: Provided by user
- Neon alphabet inspiration: Provided by user
- Team photos: Placeholder (i.pravatar.cc)
- Project images: Unsplash

## 🔄 Future Enhancements

Potential additions:
- Lightbox for project images
- Blog section
- Event calendar
- Member management backend
- Gallery with categories
- Video integration
- 3D gear models (Three.js)
- Sound effects on interactions

## 💡 Tips

1. **Performance**: Reduce particle count on mobile (modify `particleCount` in main.js)
2. **Accessibility**: Add more ARIA labels for screen readers
3. **SEO**: Add structured data (Schema.org)
4. **Analytics**: Integrate Google Analytics for tracking
5. **Forms**: Connect contact form to backend/email service

## 📞 Support

For questions or modifications, refer to:
- CSS file for styling changes
- JS file for behavior/animations
- HTML files for content updates

---

**Built with ⚙️ by SAE MNIT | Design. Build. Race. 🏁**
"

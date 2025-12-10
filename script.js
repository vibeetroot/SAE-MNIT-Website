// script.js - improved gear rotation, fixed targets, member clicks, progress effect
document.addEventListener('DOMContentLoaded', () => {
  const fader = document.getElementById('page-fader');
  if (fader) {
    requestAnimationFrame(()=> { fader.style.opacity = 0; fader.style.pointerEvents = 'none'; });
  }

  // linked page navigation for .html links
  document.querySelectorAll('a[href$=".html"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const href = a.getAttribute('href');
      const f = document.getElementById('page-fader');
      if (f) {
        f.style.transition = 'opacity .45s ease';
        f.style.opacity = 1;
        f.style.pointerEvents = 'auto';
        setTimeout(()=> { window.location = href; }, 420);
      } else {
        window.location = href;
      }
    });
  });

  // HERO GEAR ROTATION - magnetic, responsive to scroll velocity with smoothing
  const gears = [
    document.getElementById('hero-gear-1'),
    document.getElementById('hero-gear-2')
  ].filter(Boolean);

  let lastScroll = window.scrollY;
  let lastTime = performance.now();
  let angle = [0,0];

  function applyRotation() {
    const now = performance.now();
    const dy = window.scrollY - lastScroll;
    const dt = Math.max(16, now - lastTime);
    // velocity normalized
    const vel = (dy / dt) * 60;
    // stronger magnetic multiplier for a snappier feel
    angle[0] += vel * 1.6 + (vel>0?0.2:-0.2);
    angle[1] -= vel * 1.1 + (vel>0?0.15:-0.15);
    // smoothing (lerp) for visual pleasantness
    gears.forEach((g,i) => {
      const current = getRotation(g);
      const target = angle[i];
      const next = current + (target - current) * 0.18;
      g.style.transform = `rotate(${next}deg)`;
    });
    lastScroll = window.scrollY;
    lastTime = now;
  }

  function getRotation(el) {
    const t = el.style.transform || '';
    const m = t.match(/rotate\(([-0-9.]+)deg\)/);
    return m ? parseFloat(m[1]) : 0;
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(()=> { applyRotation(); ticking = false; });
      ticking = true;
    }
  });

  // idle slow rotation for life
  setInterval(()=> {
    angle[0] += 0.08;
    angle[1] -= 0.06;
    gears.forEach((g,i)=> {
      const cur = getRotation(g);
      g.style.transform = `rotate(${cur + (i===0?0.08:-0.06)}deg)`;
    });
  }, 80);

  // TEAM CARD interactions (hover and click) - fixed to read dataset.target
  document.querySelectorAll('.team-card').forEach(card => {
    const smallGear = card.querySelector('.team-gear');
    card.addEventListener('mouseenter', () => {
      if (smallGear) { smallGear.style.transform = 'rotate(22deg)'; smallGear.style.transition = 'transform .5s ease'; }
    });
    card.addEventListener('mouseleave', () => {
      if (smallGear) { smallGear.style.transform = 'rotate(0deg)'; }
    });
    card.addEventListener('click', () => {
      if (smallGear) {
        smallGear.style.transition = 'transform .45s cubic-bezier(.2,.9,.2,1)';
        smallGear.style.transform = 'rotate(160deg)';
      }
      const target = card.dataset.target;
      if (target) {
        const f = document.getElementById('page-fader');
        if (f) { f.style.opacity = 1; setTimeout(()=> window.location = target, 420); }
        else { window.location = target; }
      }
    });
  });

  // Parallax hero content slight move
  const hero = document.querySelector('.fullwidth-hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const rect = hero.getBoundingClientRect();
      const offset = Math.max(-120, Math.min(120, (rect.top) * 0.05));
      const content = hero.querySelector('.hero-content');
      if (content) content.style.transform = `translateY(${offset}px)`;
    });
  }

  // Progress bar animation tied to scroll on team pages
  const prog = document.querySelector('.progress-fill');
  if (prog) {
    // simple: scale with scroll percent of first 800px
    function updateProg() {
      const h = Math.min(1, window.scrollY / 800);
      prog.style.transform = `translateX(${h*66}%)`;
    }
    window.addEventListener('scroll', updateProg);
    updateProg();
  }

});

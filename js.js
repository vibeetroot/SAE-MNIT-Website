/* assets/js/main.js */
/* Main JS for SAE MNIT site
   - typed tagline
   - reveal on scroll (IntersectionObserver)
   - gear rotation / scroll-reactive speed
   - team modal (SPA-like)
   - gallery slider + lightbox
   - contact form stub
*/

document.addEventListener('DOMContentLoaded', function(){
  // typed tagline
  const typedEl = document.getElementById('typed');
  const words = ['Design.','Build.','Race.'];
  let wi=0, ci=0;
  function typeLoop(){
    const w = words[wi];
    typedEl.textContent = w.slice(0, ci+1);
    ci++;
    if(ci === w.length){
      setTimeout(()=>{ci=0; wi=(wi+1)%words.length; typeLoop();}, 900);
    } else setTimeout(typeLoop, 110);
  }
  typeLoop();

  // IntersectionObserver reveals
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: 0.12});
  revealEls.forEach(el=>io.observe(el));

  // gear objects for dynamic control
  const singleGear = document.getElementById('singleGear');
  const meshed = document.getElementById('meshedGears');
  const g1 = meshed?.querySelector('.g1');
  const g2 = meshed?.querySelector('.g2');
  const piston = document.getElementById('piston');

  // animation state
  let baseSpeed = 0.02; // base rotation per tick
  let t = 0;
  function gearFrame(){
    t += baseSpeed;
    // rotate single gear (CSS fallback already rotates; we do a small additional transform to sync with scroll)
    if(singleGear) singleGear.style.transform = `rotate(${t*360}deg)`;
    if(g1) g1.style.transform = `rotate(${t*360}deg)`;
    if(g2) g2.style.transform = `rotate(${-t*360 * (22/34)}deg)`; // inverse ratio ~ teeth ratio
    if(piston){
      const dy = Math.sin(t*6) * 18;
      piston.setAttribute('transform', `translate(180,${dy})`);
    }
    requestAnimationFrame(gearFrame);
  }
  gearFrame();

  // scroll-reactive speed: increases baseSpeed based on scrollY
  window.addEventListener('scroll', ()=> {
    const sc = window.scrollY;
    // map scroll to speed range 0.01 - 0.08
    baseSpeed = 0.02 + Math.min(sc / 4000, 0.06);
    // parallax for layers
    document.querySelectorAll('.parallax-layer').forEach((layer, idx) => {
      const depth = (idx+1) * 0.12;
      layer.style.transform = `translateY(${sc * depth * -0.2}px)`;
    });
  });

  // Teams modal population
  const teams = {
    tvaran: {
      id:'tvaran',
      name:'Tvaran Racing',
      accent: getComputedStyle(document.documentElement).getPropertyValue('--accent-tvaran') || '#00aef0',
      tag:'Formula-style vehicle design & fabrication',
      about:'Tvaran focuses on chassis, drivetrain, aerodynamics and fabrication. Student-led projects with hands-on manufacturing.',
      vision:'Design, build and race with safety and performance.',
      contact:'tvaran@sae-mnit.example.com',
      members:[
        {name:'Aman Singh',role:'Team Captain'},
        {name:'Neha Verma',role:'Chassis Lead'},
        {name:'Rohit Patel',role:'Powertrain Lead'},
        {name:'Sakshi Rao',role:'Aero Lead'}
      ]
    },
    raven: {
      id:'raven',
      name:'RavenCrew',
      accent: getComputedStyle(document.documentElement).getPropertyValue('--accent-raven') || '#9b5cff',
      tag:'Electronics, Controls & Innovation',
      about:'RavenCrew focuses on embedded systems, telemetry, BMS and control algorithms integration.',
      vision:'Integrate smart controls to enhance performance and reliability.',
      contact:'raven@sae-mnit.example.com',
      members:[
        {name:'Priya Sharma',role:'Electronics Lead'},
        {name:'Vikram Joshi',role:'Controls Lead'},
        {name:'Maya Gupta',role:'Telemetry Engineer'},
        {name:'Karan Mehta',role:'Battery & BMS'}
      ]
    }
  };

  // team open handlers
  document.querySelectorAll('.team-card').forEach(card=>{
    card.addEventListener('click', ()=> openTeam(card.dataset.team));
    card.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') openTeam(card.dataset.team); });
  });

  const teamModal = document.getElementById('teamModal');
  const teamContent = document.getElementById('teamContent');
  const closeTeam = document.getElementById('closeTeam');
  closeTeam.addEventListener('click', closeTeamModal);
  function openTeam(id){
    const tdata = teams[id];
    if(!tdata) return;
    // build HTML
    const html = `
      <div class="team-hero" style="display:flex;gap:16px;align-items:center">
        <div style="width:120px;height:120px;border-radius:14px;background:${tdata.accent};display:grid;place-items:center;color:#04111a;font-weight:900;font-size:36px">${tdata.name.charAt(0)}</div>
        <div>
          <h2 style="margin:0">${tdata.name}</h2>
          <div class="muted">${tdata.tag}</div>
          <div style="height:8px;width:180px;border-radius:8px;background:${tdata.accent};margin-top:10px"></div>
        </div>
      </div>
      <div style="margin-top:18px">
        <h3>About</h3>
        <p class="muted">${tdata.about}</p>
      </div>
      <div style="margin-top:12px">
        <h3>Vision</h3>
        <p class="muted">${tdata.vision}</p>
      </div>
      <div style="margin-top:12px">
        <h3>Team Members</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:12px">
          ${tdata.members.map(m=>`<div class="member-card" style="background:rgba(255,255,255,0.02);padding:10px;border-radius:8px;text-align:center;">
            <div style="width:88px;height:88px;border-radius:50%;display:inline-block;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);line-height:88px;font-weight:800">${m.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
            <div style="margin-top:8px;font-weight:700">${m.name}</div>
            <div class="muted">${m.role}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="margin-top:12px">
        <h3>Contact</h3>
        <div class="muted">Email: <strong style="color:#fff">${tdata.contact}</strong></div>
      </div>
    `;
    teamContent.innerHTML = html;
    teamModal.setAttribute('aria-hidden','false');
    // show with fade
    teamModal.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
  function closeTeamModal(){
    teamModal.setAttribute('aria-hidden','true');
    teamModal.classList.remove('visible');
    document.body.style.overflow = '';
  }
  // close modal when pressing esc
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeTeamModal(); });

  // Gallery controls
  const slider = document.getElementById('gallerySlider');
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');
  prev.addEventListener('click', ()=> {
    slider.scrollBy({left:-340, behavior:'smooth'});
  });
  next.addEventListener('click', ()=> {
    slider.scrollBy({left:340, behavior:'smooth'});
  });
  // lightbox
  document.querySelectorAll('.slide img').forEach(img=>{
    img.addEventListener('click', ()=> {
      openLightbox(img.src);
    });
  });
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
  function openLightbox(src){
    lightboxImg.src = src;
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  }

  // sponsors marquee tweak: duplicate track content to loop seamless
  document.querySelectorAll('.marquee-track').forEach(track=>{
    track.innerHTML += track.innerHTML;
  });

  // hash-based navigation + smooth SPA-like transition
  document.querySelectorAll('[data-link]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = a.getAttribute('href');
      navigateTo(target);
      if(window.innerWidth < 900){
        // mobile: close burger if you implement
      }
    });
  });

  function navigateTo(hash){
    const wrapper = document.getElementById('page-wrapper');
    wrapper.classList.add('page-fade-out');
    setTimeout(()=>{
      // scroll to section and fade back in
      const el = document.querySelector(hash);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      wrapper.classList.remove('page-fade-out');
      wrapper.classList.add('page-fade-in');
      setTimeout(()=> wrapper.classList.remove('page-fade-in'), 600);
    }, 260);
  }

  // scrollTo helper
  window.scrollToSection = window.scrollToSection || function(sel){
    const el = document.querySelector(sel);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  };

  // contact submit stub
  window.submitContact = function(e){
    e.preventDefault();
    alert('Thanks! Message submitted (demo). Replace this with actual backend).');
    e.target.reset();
  };

  // generate gear particles in layer-fg
  const particlesContainer = document.getElementById('gearParticles');
  if(particlesContainer){
    const particleCount = 14;
    for(let i=0;i<particleCount;i++){
      const el = document.createElement('div');
      el.className = 'particle';
      const x = Math.random()*100; const y = Math.random()*100;
      el.style.position = 'absolute';
      el.style.left = x + 'vw';
      el.style.top = y + 'vh';
      el.style.opacity = 0.06 + Math.random()*0.12;
      el.style.transform = 'translate(-50%,-50%)';
      el.innerHTML = `<svg viewBox="0 0 100 100" width="${20 + Math.random()*44}" height="${20 + Math.random()*44}" aria-hidden="true"><g fill="none" stroke="${Math.random()>0.5?getComputedStyle(document.documentElement).getPropertyValue('--accent-tvaran'):'#9b5cff'}" stroke-width="1"><circle cx="50" cy="50" r="12"/></g></svg>`;
      particlesContainer.appendChild(el);
      // small drift animation
      el.animate([{transform:'translate(-50%,-50%) translateY(0px)'},{transform:'translate(-50%,-50%) translateY(-30px)'},{transform:'translate(-50%,-50%) translateY(0px)'}],{duration:20000 + Math.random()*30000, iterations:Infinity, delay:Math.random()*5000});
    }
  }

});

// Ninjago Battle — Elemental Particle Effects

const ELEMENT_FX = {
  fire:       { particles: ['🔥','🔥','✴️','🔥'],   glow: '#ff3300' },
  ice:        { particles: ['❄️','❄️','🌨️','❄️'],  glow: '#5bc8f5' },
  lightning:  { particles: ['⚡','⚡','✦','⚡'],    glow: '#f5d020' },
  earth:      { particles: ['🪨','🪨','💥','🪨'],   glow: '#5c8a3c' },
  water:      { particles: ['🌊','💧','💧','🌊'],   glow: '#1e7fcb' },
  wind:       { particles: ['💨','🌀','💨','🌪️'],  glow: '#c8e6c9' },
  energy:     { particles: ['✨','✨','💫','⭐'],    glow: '#7b2fbe' },
  darkness:   { particles: ['💀','🔮','🌑','💀'],   glow: '#6b1a8c' },
  venom:      { particles: ['🐍','💚','☠️','🐍'],   glow: '#4b0082' },
  ghost:      { particles: ['👻','💚','✦','👻'],    glow: '#26c281' },
  shadow:     { particles: ['🌑','🌑','⚫','🌑'],   glow: '#8e44ad' },
  staff:      { particles: ['⭐','✨','🌟','⭐'],    glow: '#e67e22' },
  hypno:      { particles: ['🌀','💫','🌀','🌀'],   glow: '#9b59b6' },
  fang:       { particles: ['🦷','🩸','💢','🦷'],   glow: '#ff7675' },
  acid:       { particles: ['☣️','💚','☣️','🟢'],   glow: '#55efc4' },
  constrict:  { particles: ['🔗','🔗','💢','🔗'],   glow: '#bcaaa4' },
  oni:        { particles: ['👹','💜','🌑','👹'],    glow: '#8800cc' },
  deception:  { particles: ['🎭','💢','✦','🎭'],    glow: '#ff3080' },
  crystal:    { particles: ['💎','✨','❄️','💎'],    glow: '#ccffff' },
  amber:      { particles: ['🟠','✨','🟠','💫'],    glow: '#ff9f1e' },
  time:       { particles: ['⏳','🌀','⏳','✦'],    glow: '#e0e8ff' },
  djinn:      { particles: ['🧞','💜','✨','🧞'],    glow: '#7b00ff' },
  death:      { particles: ['☠️','💀','🖤','☠️'],   glow: '#aaaaaa' },
  digital:    { particles: ['💻','⚡','🔵','💻'],    glow: '#90e0ef' },
  speed:      { particles: ['💨','⚡','💨','✦'],     glow: '#ffaa00' },
  metal:      { particles: ['⚙️','🔩','⚙️','💥'],   glow: '#d4d4e4' },
  smoke:      { particles: ['🌫️','⬛','🌫️','💨'],  glow: '#aaaacc' },
  form:       { particles: ['🦎','✦','💫','🦎'],    glow: '#ffaacc' },
  mind:       { particles: ['🧠','💫','🌀','🧠'],   glow: '#aaaaff' },
  nature:     { particles: ['🌿','🍃','🌿','🌱'],   glow: '#55dd55' },
  sound:      { particles: ['🎵','🎶','🎵','✦'],    glow: '#ffcc00' },
  gravity:    { particles: ['🌀','⚫','🌀','💫'],    glow: '#6666cc' },
  light:      { particles: ['✨','☀️','✨','💫'],    glow: '#ffffff' },
  poison_oni: { particles: ['☠️','💀','🟢','☠️'],   glow: '#66cc66' },
  tech:       { particles: ['🔧','⚡','🔧','💡'],   glow: '#00ff88' },
  golden:     { particles: ['⭐','✨','🌟','⭐'],    glow: '#ffe566' },
  creation:   { particles: ['🌟','✨','💫','🌟'],   glow: '#ffffff' },
  _default:   { particles: ['✦','✨','✦','💫'],     glow: '#ffffff' },
};

const PARTICLE_COUNTS = { light: 6, heavy: 12, special: 22 };
const PARTICLE_SIZES  = {
  light:   { min: 1.0, max: 1.4 },
  heavy:   { min: 1.2, max: 1.8 },
  special: { min: 1.5, max: 2.3 },
};

function getAnimVariant(element) {
  const straight = ['lightning','energy','light','digital','speed','tech','sound'];
  const spiral   = ['hypno','gravity','venom','ghost','wind','djinn','mind','smoke'];
  if (straight.includes(element)) return 'straight';
  if (spiral.includes(element))   return 'spiral';
  return 'arc';
}

function spawnElementalEffect(attackerEl, defenderEl, element, moveType) {
  const count = PARTICLE_COUNTS[moveType] ?? 0;
  if (!count || !attackerEl || !defenderEl) return;

  const fx     = ELEMENT_FX[element] ?? ELEMENT_FX._default;
  const sizes  = PARTICLE_SIZES[moveType];
  const aRect  = attackerEl.getBoundingClientRect();
  const dRect  = defenderEl.getBoundingClientRect();

  const originX = aRect.left + aRect.width  / 2;
  const originY = aRect.top  + aRect.height / 2;
  const dx      = (dRect.left + dRect.width  / 2) - originX;
  const dy      = (dRect.top  + dRect.height / 2) - originY;

  // Screen flash for special moves
  if (moveType === 'special') {
    const flash = document.createElement('div');
    flash.className = 'elem-screen-flash';
    flash.style.background = fx.glow;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
  }

  const spread  = moveType === 'special' ? 90 : moveType === 'heavy' ? 55 : 32;
  const variant = getAnimVariant(element);

  for (let i = 0; i < count; i++) {
    const span  = document.createElement('span');
    const emoji = fx.particles[Math.floor(Math.random() * fx.particles.length)];
    const scale = sizes.min + Math.random() * (sizes.max - sizes.min);
    const delay = Math.random() * (moveType === 'special' ? 200 : 90);
    const dur   = 480 + Math.random() * 240;
    const offX  = (Math.random() - 0.5) * spread;
    const offY  = (Math.random() - 0.5) * spread;

    span.className = `elem-particle elem-anim-${variant}`;
    span.textContent = emoji;
    span.style.cssText = `
      left:${originX}px; top:${originY}px;
      --dx:${dx + offX}px; --dy:${dy + offY}px;
      --scale:${scale};
      font-size:${scale}rem;
      animation-delay:${delay}ms;
      animation-duration:${dur}ms;
      filter:drop-shadow(0 0 6px ${fx.glow});
    `;
    document.body.appendChild(span);
    setTimeout(() => span.remove(), delay + dur + 50);
  }
}

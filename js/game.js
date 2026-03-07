// Ninjago Battle — Game Controller

const GROUPS = ['legendary', 'ninja', 'villain', 'skeleton', 'nindroid', 'stone', 'elemental', 'serpentine', 'dragon', 'mech', 'season_4', 'dragons_rising'];
const GROUP_LABELS = {
  legendary:      '💎 Legendary',
  ninja:          'Ninjas',
  villain:        'Villains',
  skeleton:       'Skeleton Army',
  nindroid:       'Nindroids',
  stone:          'Stone Army',
  elemental:      'Elemental Masters',
  serpentine:     'Serpentine',
  dragon:         'Dragons',
  mech:           'Mechs',
  season_4:       '🏆 Season 4',
  dragons_rising: '🐉 Dragons Rising',
};

let selectedPlayer = null;
let selectedOpponent = null;
let battle = null;
let aiTimer = null;

// Premium unlock state (session only)
let unlockedPremium = false;
let unlockedMega = false;

// ─── SCREEN MANAGEMENT ────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ─── CHARACTER SELECT ─────────────────────────────────────────────────────────

function buildCharacterGrid(containerId, onSelect, excludeId = null) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  GROUPS.forEach(group => {
    const chars = getCharactersByGroup(group).filter(c => c.id !== excludeId);
    if (!chars.length) return;

    const section = document.createElement('div');
    section.className = 'char-group';

    const label = document.createElement('h3');
    label.className = 'group-label';
    label.textContent = GROUP_LABELS[group];
    section.appendChild(label);

    const grid = document.createElement('div');
    grid.className = 'char-grid';

    chars.forEach(char => {
      const el = document.createElement('div');
      const isMegaLocked = char.premiumMega && !unlockedMega;
      const isLocked = (char.premium && !unlockedPremium) || isMegaLocked;
      el.className = 'char-card' + (isMegaLocked ? ' char-mega-locked' : isLocked ? ' char-locked' : '');
      el.dataset.id = char.id;
      const elem = getElement(char.element);

      el.style.setProperty('--elem-color', elem.color);
      el.style.setProperty('--elem-glow', elem.glow);

      el.innerHTML = `
        ${isMegaLocked
          ? `<div class="char-mega-banner"><span class="char-mega-banner-lock">💎</span><span class="char-mega-banner-text">£5 LEGENDARY</span></div>`
          : isLocked
          ? `<div class="char-price-banner"><span class="char-price-banner-lock">🔒</span><span class="char-price-banner-text">£2 PREMIUM</span></div>`
          : ''}
        <div class="char-img-wrap" style="${isLocked ? 'border-radius:0 0 0 0;' : ''}">
          <img class="char-img" src="${char.image}" alt="${char.name}" draggable="false"${isLocked ? ` style="filter:grayscale(0.8) brightness(${isMegaLocked ? '0.35' : '0.45'})"` : ''}>
          ${isMegaLocked
            ? `<div class="char-lock-overlay char-mega-overlay"><div class="char-lock-icon">💎</div></div>`
            : isLocked
            ? `<div class="char-lock-overlay"><div class="char-lock-icon">🔒</div></div>`
            : ''}
        </div>
        <div class="char-name">${char.name}</div>
        <div class="char-tagline">${isLocked ? (isMegaLocked ? 'Legendary pack' : 'Tap to unlock') : char.tagline}</div>
        ${isLocked ? '' : `<div class="char-stats">
          <span title="HP">❤️ ${char.hp}</span>
          <span title="ATK">⚔️ ${char.attack}</span>
          <span title="DEF">🛡️ ${char.defense}</span>
          <span title="SPD">💨 ${char.speed}</span>
        </div>`}
      `;

      el.addEventListener('click', () => {
        if (isMegaLocked) { showMegaModal(); return; }
        if (isLocked) { showUnlockModal(); return; }
        container.querySelectorAll('.char-card').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
        onSelect(char);
      });

      if (!isLocked) apply3DTilt(el);
      grid.appendChild(el);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// ─── TITLE SCREEN ─────────────────────────────────────────────────────────────

function initTitle() {
  document.getElementById('btn-start').addEventListener('click', () => {
    selectedPlayer = null;
    selectedOpponent = null;
    goToPlayerSelect();
  });
}

// ─── PLAYER SELECT ───────────────────────────────────────────────────────────

function goToPlayerSelect() {
  showScreen('screen-player-select');
  buildCharacterGrid('player-char-grid', (char) => {
    selectedPlayer = char;
    document.getElementById('btn-confirm-player').disabled = false;
  });
  document.getElementById('btn-confirm-player').disabled = !selectedPlayer;
  // Re-highlight previously selected character
  if (selectedPlayer) {
    const card = document.querySelector(`#player-char-grid [data-id="${selectedPlayer.id}"]`);
    if (card) card.classList.add('selected');
  }
}

function goToOpponentSelect() {
  showScreen('screen-opponent-select');
  selectedOpponent = null;
  buildCharacterGrid('opponent-char-grid', (char) => {
    selectedOpponent = char;
    document.getElementById('btn-confirm-opponent').disabled = false;
  }, selectedPlayer.id);
  document.getElementById('btn-confirm-opponent').disabled = true;

  // Replace random button to wipe old listeners
  const oldRandom = document.getElementById('btn-random-opponent');
  const newRandom = oldRandom.cloneNode(true);
  oldRandom.parentNode.replaceChild(newRandom, oldRandom);
  newRandom.addEventListener('click', () => {
    const pool = CHARACTERS.filter(c => c.id !== selectedPlayer.id);
    selectedOpponent = pool[Math.floor(Math.random() * pool.length)];
    document.querySelectorAll('#opponent-char-grid .char-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.id === selectedOpponent.id);
    });
    document.getElementById('btn-confirm-opponent').disabled = false;
  });
}

function initPlayerSelect() {
  document.getElementById('btn-confirm-player').addEventListener('click', () => {
    if (!selectedPlayer) return;
    goToOpponentSelect();
  });

  document.getElementById('btn-back-title').addEventListener('click', () => {
    selectedPlayer = null;
    showScreen('screen-title');
  });
}

// ─── OPPONENT SELECT ─────────────────────────────────────────────────────────

function initOpponentSelect() {
  document.getElementById('btn-confirm-opponent').addEventListener('click', () => {
    if (!selectedOpponent) return;
    startBattle(selectedPlayer, selectedOpponent);
  });

  document.getElementById('btn-back-player').addEventListener('click', () => {
    goToPlayerSelect();
  });
}

// ─── BATTLE SCREEN ───────────────────────────────────────────────────────────

function startBattle(playerChar, opponentChar) {
  battle = new BattleState(playerChar, opponentChar);
  showScreen('screen-battle');
  renderBattle();
  bindBattleButtons();
}

function renderBattle() {
  if (!battle) return;

  renderFighter('player', battle.player);
  renderFighter('opponent', battle.opponent);
  renderActionButtons();
  renderBattleLog();
}

function renderFighter(side, fighter) {
  const elem = getElement(fighter.element);
  const prefix = side === 'player' ? 'player' : 'opp';

  // HP bar
  const hpPct = Math.max(0, (fighter.currentHp / fighter.maxHp) * 100);
  const hpBar = document.getElementById(`${prefix}-hp-bar`);
  const hpText = document.getElementById(`${prefix}-hp-text`);
  const hpContainer = document.getElementById(`${prefix}-hp-container`);
  if (hpBar) {
    hpBar.style.width = hpPct + '%';
    hpBar.style.backgroundColor = hpPct > 50 ? '#4caf50' : hpPct > 25 ? '#ff9800' : '#f44336';
  }
  if (hpText) hpText.textContent = `${Math.ceil(fighter.currentHp)} / ${fighter.maxHp}`;
  if (hpContainer) hpContainer.title = fighter.name;

  // Fighter panel
  const panel = document.getElementById(`${prefix}-fighter`);
  if (panel) {
    panel.style.setProperty('--elem-color', elem.color);
    panel.style.setProperty('--elem-glow', elem.glow);
    const iconEl = panel.querySelector('.fighter-icon');
    iconEl.innerHTML = `<img class="fighter-img" src="${fighter.image}" alt="${fighter.name}" draggable="false">`;
    panel.querySelector('.fighter-name').textContent = fighter.name;
    panel.querySelector('.fighter-element').textContent = elem.name;

    // Status effects
    const statusEl = panel.querySelector('.fighter-status');
    if (statusEl) {
      statusEl.innerHTML = fighter.statusEffects
        .map(fx => `<span class="status-badge" title="${fx.label}">${fx.icon} ${fx.turnsLeft}t</span>`)
        .join('');
    }

    // Charges
    const chargeEl = panel.querySelector('.fighter-charges');
    if (chargeEl) {
      const full = Math.floor(fighter.charges);
      const half = fighter.charges % 1 >= 0.5 ? 1 : 0;
      const empty = fighter.maxCharges - full - half;
      chargeEl.innerHTML =
        '⚡'.repeat(full) +
        (half ? '<span style="opacity:0.5">⚡</span>' : '') +
        '<span style="opacity:0.2">⚡</span>'.repeat(empty);
    }
  }

  // Name labels in HP bars
  const nameEl = document.getElementById(`${prefix}-name`);
  if (nameEl) nameEl.textContent = fighter.name;
}

function renderActionButtons() {
  if (!battle) return;
  const player = battle.player;
  const isBusy = battle.locked || battle.turn !== 'player' || battle.over;
  const isSkipped = battle.getSkipTurn(player);

  player.moves.forEach(move => {
    const btn = document.getElementById(`btn-move-${move.id}`);
    if (!btn) return;

    // Update name and label
    btn.querySelector('.move-name').textContent = move.name;
    btn.querySelector('.move-desc').textContent = move.desc;

    // Special: show charge count
    if (move.type === 'special') {
      const cost = document.getElementById('special-charge-cost');
      if (cost) cost.textContent = `(${Math.floor(player.charges)}/${player.maxCharges} ⚡)`;
      btn.disabled = isBusy || isSkipped || player.charges < 1;
      btn.classList.toggle('charged', player.charges >= 1);
    } else {
      btn.disabled = isBusy || isSkipped;
    }
  });
}

function renderBattleLog() {
  if (!battle) return;
  const logEl = document.getElementById('battle-log');
  if (!logEl) return;

  const entries = battle.getRecentLog(5);
  logEl.innerHTML = entries.map(e =>
    `<div class="log-entry log-${e.type}">${e.message}</div>`
  ).join('');
}

function bindBattleButtons() {
  ['light', 'heavy', 'special', 'defend'].forEach(moveId => {
    const btn = document.getElementById(`btn-move-${moveId}`);
    if (!btn) return;
    // Remove old listeners by cloning
    const fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener('click', () => handlePlayerAction(moveId));
  });
}

function handlePlayerAction(moveId) {
  if (!battle || battle.locked || battle.turn !== 'player' || battle.over) return;

  battle.locked = true;
  renderActionButtons();

  const result = battle.playerTakeTurn(moveId);
  if (!result) {
    battle.locked = false;
    renderBattle();
    return;
  }

  // Animate attack
  const defenderEl = document.getElementById('opp-fighter');
  if (!result.missed && !result.dodged && !result.defended && defenderEl) {
    defenderEl.classList.add('anim-hit');
    setTimeout(() => defenderEl.classList.remove('anim-hit'), 500);
  }

  const attackerEl = document.getElementById('player-fighter');
  if (attackerEl && !result.defended) {
    attackerEl.classList.add('anim-attack');
    setTimeout(() => attackerEl.classList.remove('anim-attack'), 400);
  }

  // Elemental particle effect
  if (!result.missed && !result.dodged && !result.defended && attackerEl && defenderEl) {
    const move = battle.player.moves.find(m => m.id === moveId);
    spawnElementalEffect(attackerEl, defenderEl, battle.player.element, move ? move.type : 'light');
  }

  renderBattle();

  if (battle.over) {
    setTimeout(() => showResult(), 1200);
    return;
  }

  // AI turn after delay
  setTimeout(() => {
    doAITurn();
  }, 900);
}

function doAITurn() {
  if (!battle || battle.over) return;

  const opponentEl = document.getElementById('opp-fighter');
  const playerEl = document.getElementById('player-fighter');

  if (opponentEl) {
    opponentEl.classList.add('anim-attack');
    setTimeout(() => opponentEl.classList.remove('anim-attack'), 400);
  }

  const result = battle.opponentTakeTurn();

  if (result && !result.skipped && !result.missed && !result.dodged && !result.defended && playerEl) {
    playerEl.classList.add('anim-hit');
    setTimeout(() => playerEl.classList.remove('anim-hit'), 500);
  }

  // Elemental particle effect
  if (result && !result.skipped && !result.missed && !result.dodged && !result.defended && opponentEl && playerEl) {
    const move = battle.opponent.moves.find(m => m.id === result.moveId);
    spawnElementalEffect(opponentEl, playerEl, battle.opponent.element, move ? move.type : 'light');
  }

  renderBattle();
  battle.locked = false;

  if (battle.over) {
    setTimeout(() => showResult(), 1200);
  } else {
    renderActionButtons();
  }
}

// ─── RESULT SCREEN ────────────────────────────────────────────────────────────

function showResult() {
  showScreen('screen-result');

  const isWin = battle.winner === 'player';
  const titleEl = document.getElementById('result-title');
  const subtitleEl = document.getElementById('result-subtitle');
  const iconEl = document.getElementById('result-icon');
  const resultScreen = document.getElementById('screen-result');

  if (titleEl) titleEl.textContent = isWin ? 'VICTORY!' : 'DEFEATED!';
  if (subtitleEl) {
    subtitleEl.textContent = isWin
      ? `${battle.player.name} has won the battle!`
      : `${battle.opponent.name} was too powerful!`;
  }
  if (iconEl) iconEl.textContent = isWin ? '🏆' : '💀';

  resultScreen.classList.toggle('result-win', isWin);
  resultScreen.classList.toggle('result-lose', !isWin);

  // Clone buttons to wipe old listeners before adding new ones
  const oldRematch = document.getElementById('btn-rematch');
  const newRematch = oldRematch.cloneNode(true);
  oldRematch.parentNode.replaceChild(newRematch, oldRematch);
  newRematch.addEventListener('click', () => startBattle(selectedPlayer, selectedOpponent));

  const oldNew = document.getElementById('btn-new-battle');
  const newNew = oldNew.cloneNode(true);
  oldNew.parentNode.replaceChild(newNew, oldNew);
  newNew.addEventListener('click', () => {
    selectedPlayer = null;
    selectedOpponent = null;
    battle = null;
    goToPlayerSelect();
  });
}

// ─── PREMIUM UNLOCK MODAL ────────────────────────────────────────────────────

function showUnlockModal() {
  document.getElementById('premium-modal').classList.add('active');
}

function hideUnlockModal() {
  document.getElementById('premium-modal').classList.remove('active');
}

function initUnlockModal() {
  document.getElementById('btn-modal-close').addEventListener('click', hideUnlockModal);
  document.getElementById('btn-modal-unlock').addEventListener('click', () => {
    unlockedPremium = true;
    hideUnlockModal();
    // Rebuild whichever select screen is currently visible
    if (document.getElementById('screen-player-select').classList.contains('active')) {
      goToPlayerSelect();
    } else {
      goToOpponentSelect();
    }
  });
  document.getElementById('premium-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideUnlockModal();
  });
}

// ─── MEGA UNLOCK MODAL ───────────────────────────────────────────────────────

function showMegaModal() {
  document.getElementById('mega-modal').classList.add('active');
}

function hideMegaModal() {
  document.getElementById('mega-modal').classList.remove('active');
}

function initMegaModal() {
  document.getElementById('btn-mega-close').addEventListener('click', hideMegaModal);
  document.getElementById('btn-mega-unlock').addEventListener('click', () => {
    unlockedMega = true;
    hideMegaModal();
    if (document.getElementById('screen-player-select').classList.contains('active')) {
      goToPlayerSelect();
    } else {
      goToOpponentSelect();
    }
  });
  document.getElementById('mega-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) hideMegaModal();
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initTitle();
  initPlayerSelect();
  initOpponentSelect();
  initUnlockModal();
  initMegaModal();
  initTitleParticles();
  showScreen('screen-title');
});

// ─── 3D CARD TILT ─────────────────────────────────────────────────────────────

function apply3DTilt(el) {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg) translateZ(8px) scale(1.03)`;
    el.style.transition = 'transform 0.05s, border-color 0.2s, box-shadow 0.2s';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform 0.35s ease, border-color 0.2s, box-shadow 0.2s';
  });
}

// ─── TITLE PARTICLES ──────────────────────────────────────────────────────────

function initTitleParticles() {
  const canvas = document.getElementById('title-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#f0c040','#e84c1b','#5bc8f5','#f5d020','#c77dff','#26c281'];
  const particles = Array.from({length: 60}, () => ({
    x: Math.random(), y: Math.random() + 0.5,
    vx: (Math.random() - 0.5) * 0.0004,
    vy: -(Math.random() * 0.0006 + 0.0002),
    r: Math.random() * 2.5 + 0.5,
    alpha: Math.random() * 0.6 + 0.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));

  function tick() {
    if (!document.getElementById('screen-title').classList.contains('active')) {
      requestAnimationFrame(tick); return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -0.02) { p.y = 1.05; p.x = Math.random(); }
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  tick();
}

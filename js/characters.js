// Ninjago Battle — Character Data
// Each character: name, group, element, color, icon, hp, attack, defense, speed, moves[]

const ELEMENTS = {
  fire:      { name: 'Fire',      color: '#e84c1b', glow: '#ff6b35', icon: '🔥', effect: 'burn' },
  ice:       { name: 'Ice',       color: '#5bc8f5', glow: '#a0e8ff', icon: '❄️', effect: 'freeze' },
  lightning: { name: 'Lightning', color: '#f5d020', glow: '#ffe766', icon: '⚡', effect: 'stun' },
  earth:     { name: 'Earth',     color: '#5c8a3c', glow: '#8dc96b', icon: '🪨', effect: 'armorbreak' },
  water:     { name: 'Water',     color: '#1e7fcb', glow: '#4fb3f9', icon: '🌊', effect: 'soak' },
  wind:      { name: 'Wind',      color: '#c8e6c9', glow: '#ffffff', icon: '💨', effect: 'push' },
  energy:    { name: 'Energy',    color: '#7b2fbe', glow: '#c77dff', icon: '✨', effect: 'overpower' },
  darkness:  { name: 'Darkness',  color: '#1a1a2e', glow: '#6b1a8c', icon: '💀', effect: 'curse' },
  venom:     { name: 'Venom',     color: '#4b0082', glow: '#9b59b6', icon: '🐍', effect: 'poison' },
  ghost:     { name: 'Ghost',     color: '#26c281', glow: '#6dffc8', icon: '👻', effect: 'phase' },
  shadow:    { name: 'Shadow',    color: '#2c3e50', glow: '#8e44ad', icon: '🌑', effect: 'blind' },
  staff:     { name: 'Staff',     color: '#e67e22', glow: '#f0a500', icon: '🪄', effect: 'confuse' },
  hypno:     { name: 'Hypno',     color: '#9b59b6', glow: '#d7bde2', icon: '🌀', effect: 'hypnotize' },
  fang:      { name: 'Fang',      color: '#e74c3c', glow: '#ff7675', icon: '🦷', effect: 'infect' },
  acid:      { name: 'Acid',      color: '#27ae60', glow: '#55efc4', icon: '☣️', effect: 'melt' },
  constrict: { name: 'Constrict', color: '#795548', glow: '#bcaaa4', icon: '🔗', effect: 'bind' },
  oni:       { name: 'Oni',       color: '#2d0040', glow: '#8800cc', icon: '👹', effect: 'curse' },
  deception: { name: 'Deception', color: '#8b0a3a', glow: '#ff3080', icon: '🎭', effect: 'confuse' },
  crystal:   { name: 'Crystal',   color: '#88ccff', glow: '#ccffff', icon: '💎', effect: 'armorbreak' },
  amber:     { name: 'Amber',     color: '#e67e00', glow: '#ff9f1e', icon: '🟠', effect: 'armorbreak' },
  time:      { name: 'Time',      color: '#b0b8d0', glow: '#e0e8ff', icon: '⏳', effect: 'stun' },
  djinn:     { name: 'Djinn',     color: '#1a0050', glow: '#7b00ff', icon: '🧞', effect: 'confuse' },
  death:     { name: 'Death',     color: '#5a5a5a', glow: '#aaaaaa', icon: '☠️', effect: 'drain' },
  digital:   { name: 'Digital',   color: '#00b4d8', glow: '#90e0ef', icon: '💻', effect: 'blind' },
  speed:     { name: 'Speed',     color: '#ff6600', glow: '#ffaa00', icon: '💨', effect: 'stun' },
  metal:     { name: 'Metal',     color: '#8a8a9a', glow: '#d4d4e4', icon: '⚙️', effect: 'armorbreak' },
  smoke:     { name: 'Smoke',     color: '#666677', glow: '#aaaacc', icon: '🌫️', effect: 'blind' },
  form:      { name: 'Form',      color: '#cc8899', glow: '#ffaacc', icon: '🦎', effect: 'confuse' },
  mind:      { name: 'Mind',      color: '#6666ee', glow: '#aaaaff', icon: '🧠', effect: 'confuse' },
  nature:    { name: 'Nature',    color: '#228b22', glow: '#55dd55', icon: '🌿', effect: 'poison' },
  sound:     { name: 'Sound',     color: '#cc9900', glow: '#ffcc00', icon: '🎵', effect: 'stun' },
  gravity:   { name: 'Gravity',   color: '#333388', glow: '#6666cc', icon: '🌀', effect: 'bind' },
  light:     { name: 'Light',     color: '#fffaaa', glow: '#ffffff', icon: '✨', effect: 'blind' },
  poison_oni:{ name: 'Poison',    color: '#336633', glow: '#66cc66', icon: '☠️', effect: 'poison' },
  tech:      { name: 'Tech',      color: '#116633', glow: '#00ff88', icon: '🔧', effect: 'blind' },
  golden:    { name: 'Golden',    color: '#c9900c', glow: '#ffe566', icon: '⭐', effect: 'overpower' },
  creation:  { name: 'Creation',  color: '#e8e8ff', glow: '#ffffff', icon: '🌟', effect: 'overpower' },
};

const STATUS_EFFECTS = {
  burn:       { label: 'Burn',      icon: '🔥', duration: 3, damagePerTurn: 8,  desc: 'Takes 8 damage per turn' },
  freeze:     { label: 'Frozen',    icon: '❄️', duration: 1, skipTurn: true,     desc: 'Skips next turn' },
  stun:       { label: 'Stunned',   icon: '⚡', duration: 1, attackMult: 0.5,   desc: 'Halves next attack' },
  armorbreak: { label: 'Exposed',   icon: '🪨', duration: 2, defenseMult: 0.4,  desc: 'Defense reduced 60%' },
  poison:     { label: 'Poisoned',  icon: '🐍', duration: 4, damagePerTurn: 5,  desc: 'Takes 5 damage per turn, stacks' },
  phase:      { label: 'Phasing',   icon: '👻', duration: 2, dodgeChance: 0.4,  desc: '40% chance to dodge attacks' },
  blind:      { label: 'Blinded',   icon: '🌑', duration: 2, attackMult: 0.6,   desc: 'Attacks miss 40% of the time' },
  confuse:    { label: 'Confused',  icon: '🌀', duration: 2, randomAction: true, desc: 'Random actions next 2 turns' },
  hypnotize:  { label: 'Hypnotized',icon: '💫', duration: 1, skipTurn: true,     desc: 'Skips next turn' },
  infect:     { label: 'Infected',  icon: '🦷', duration: 3, damagePerTurn: 6,  desc: 'Takes 6 damage per turn' },
  melt:       { label: 'Melting',   icon: '☣️', duration: 3, defenseMult: 0.5,  desc: 'Defense halved' },
  bind:       { label: 'Bound',     icon: '🔗', duration: 2, attackMult: 0.3,   desc: 'Attack reduced 70%' },
  soak:       { label: 'Soaked',    icon: '🌊', duration: 2, defenseMult: 0.7,  desc: 'Defense reduced 30%' },
  push:       { label: 'Pushed',    icon: '💨', duration: 1, skipTurn: true,     desc: 'Knocked back, skips turn' },
  overpower:  { label: 'Overpowered',icon: '⚡',duration: 1, defenseMult: 0,    desc: 'Ignores defense this hit' },
  curse:      { label: 'Cursed',    icon: '💀', duration: 3, damagePerTurn: 10, desc: 'Takes 10 damage per turn' },
  drain:      { label: 'Drained',   icon: '☠️', duration: 3, damagePerTurn: 7,  desc: 'Takes 7 damage per turn' },
};

// Move template: { name, power, type, effect?, effectChance? }
// type: 'light' | 'heavy' | 'special' | 'defend'
// power is multiplier applied to attacker.attack

function buildMoves(light, heavy, special) {
  return [
    { id: 'light',   ...light,   type: 'light' },
    { id: 'heavy',   ...heavy,   type: 'heavy' },
    { id: 'special', ...special, type: 'special' },
    { id: 'defend',  name: 'Defend', desc: 'Guard against the next attack', power: 0, type: 'defend' },
  ];
}

const CHARACTERS = [
  // ─── NINJAS ────────────────────────────────────────────────────────────────
  {
    id: 'kai', image: 'images/kai.png', name: 'Kai', group: 'ninja',
    element: 'fire', hp: 110, attack: 22, defense: 14, speed: 16,
    tagline: 'Ninja of Fire',
    moves: buildMoves(
      { name: 'Flame Punch',   desc: 'A fast fiery jab',          power: 0.9 },
      { name: 'Inferno Kick',  desc: 'A powerful burning kick',   power: 1.6 },
      { name: 'Spinjitzu Blaze', desc: 'Blazing Spinjitzu!',      power: 2.0, effect: 'burn', effectChance: 0.7 }
    ),
  },
  {
    id: 'lloyd', image: 'images/lloyd.png', name: 'Lloyd', group: 'ninja',
    element: 'energy', hp: 120, attack: 24, defense: 16, speed: 15,
    tagline: 'The Golden Ninja',
    moves: buildMoves(
      { name: 'Energy Blast',   desc: 'Fires a bolt of energy',       power: 1.0 },
      { name: 'Power Slam',     desc: 'Slams with golden energy',     power: 1.7 },
      { name: 'Golden Dragon',  desc: 'Channels the Golden Power!',   power: 2.2, effect: 'overpower', effectChance: 0.8 }
    ),
  },
  {
    id: 'cole', image: 'images/cole.png', name: 'Cole', group: 'ninja',
    element: 'earth', hp: 130, attack: 20, defense: 20, speed: 12,
    tagline: 'Ninja of Earth',
    moves: buildMoves(
      { name: 'Rock Fist',    desc: 'A heavy stone-hard punch',    power: 0.9 },
      { name: 'Quake Stomp',  desc: 'Shakes the ground beneath',   power: 1.5 },
      { name: 'Earthshaker',  desc: 'Shatters enemy armor!',       power: 1.9, effect: 'armorbreak', effectChance: 0.75 }
    ),
  },
  {
    id: 'zane', image: 'images/zane.png', name: 'Zane', group: 'ninja',
    element: 'ice', hp: 110, attack: 21, defense: 17, speed: 17,
    tagline: 'Ninja of Ice',
    moves: buildMoves(
      { name: 'Ice Shard',    desc: 'A sharp sliver of ice',     power: 0.9 },
      { name: 'Frost Strike', desc: 'A chilling heavy blow',     power: 1.6 },
      { name: 'Blizzard',     desc: 'Encases the foe in ice!',   power: 1.8, effect: 'freeze', effectChance: 0.7 }
    ),
  },
  {
    id: 'jay', image: 'images/jay.svg', name: 'Jay', group: 'ninja',
    element: 'lightning', hp: 105, attack: 23, defense: 13, speed: 19,
    tagline: 'Ninja of Lightning',
    moves: buildMoves(
      { name: 'Zap',           desc: 'Quick electric jab',         power: 1.0 },
      { name: 'Thunder Kick',  desc: 'Electric powered kick',      power: 1.6 },
      { name: 'Thunderstorm',  desc: 'Lightning barrage attack!',  power: 2.0, effect: 'stun', effectChance: 0.8 }
    ),
  },
  {
    id: 'nya', image: 'images/nya.png', name: 'Nya', group: 'ninja',
    element: 'water', hp: 108, attack: 21, defense: 15, speed: 18,
    tagline: 'Ninja of Water',
    moves: buildMoves(
      { name: 'Water Whip',   desc: 'A lashing water strike',     power: 1.0 },
      { name: 'Tidal Slam',   desc: 'Crashes like a wave',        power: 1.7 },
      { name: 'Tsunami',      desc: 'Overwhelming water surge!',  power: 2.0, effect: 'soak', effectChance: 0.75 }
    ),
  },
  {
    id: 'wu', image: 'images/wu.png', name: 'Sensei Wu', group: 'ninja',
    element: 'wind', hp: 115, attack: 20, defense: 18, speed: 14,
    tagline: 'Master of Spinjitzu',
    moves: buildMoves(
      { name: 'Staff Strike', desc: 'A precise staff hit',       power: 0.9 },
      { name: 'Gale Force',   desc: 'Powerful wind blast',       power: 1.6 },
      { name: 'Tornado',      desc: 'Spinjitzu whirlwind!',      power: 2.1, effect: 'push', effectChance: 0.8 }
    ),
  },

  // ─── NINJA ALLIES ─────────────────────────────────────────────────────────
  {
    id: 'skylor', image: 'images/skylor.png', name: 'Skylor', group: 'ninja',
    element: 'amber', hp: 108, attack: 22, defense: 15, speed: 18,
    tagline: 'Ninja of Amber',
    moves: buildMoves(
      { name: 'Amber Strike',  desc: 'Quick amber-powered hit',        power: 1.0 },
      { name: 'Element Copy',  desc: 'Copies and uses the foe\'s power', power: 1.6 },
      { name: 'Amber Storm',   desc: 'Channels all stolen elements!',  power: 2.1, effect: 'armorbreak', effectChance: 0.7 }
    ),
  },
  {
    id: 'pixal', image: 'images/pixal.png', name: 'P.I.X.A.L.', group: 'ninja',
    element: 'digital', hp: 105, attack: 21, defense: 18, speed: 19,
    tagline: 'Samurai X',
    moves: buildMoves(
      { name: 'Cyber Slash',   desc: 'Precision digital blade strike', power: 1.0 },
      { name: 'System Shock',  desc: 'Overloads enemy systems',        power: 1.6 },
      { name: 'Holo Blast',    desc: 'Digital disruption wave!',       power: 2.0, effect: 'blind', effectChance: 0.75 }
    ),
  },
  {
    id: 'dareth', image: 'images/dareth.png', name: 'Dareth', group: 'ninja',
    element: 'earth', hp: 95, attack: 16, defense: 13, speed: 14,
    tagline: 'The Brown Ninja',
    moves: buildMoves(
      { name: 'Brown Punch',    desc: 'A surprisingly solid punch',     power: 0.9 },
      { name: 'Battle Roar',    desc: 'A terrifying battle cry',        power: 1.5 },
      { name: 'Spinjitzu Try',  desc: 'Attempts Spinjitzu... sort of!', power: 1.8, effect: 'confuse', effectChance: 0.6 }
    ),
  },
  {
    id: 'ronin', image: 'images/ronin.png', name: 'Ronin', group: 'ninja',
    element: 'shadow', hp: 112, attack: 22, defense: 16, speed: 17,
    tagline: 'The Mercenary',
    moves: buildMoves(
      { name: 'Blade Strike',   desc: 'Quick mercenary slash',          power: 1.0 },
      { name: 'Shadow Blade',   desc: 'Strike from the darkness',       power: 1.6 },
      { name: 'R.E.X. Blast',   desc: 'Fires from his sky mech R.E.X.!',power: 2.1, effect: 'blind', effectChance: 0.7 }
    ),
  },

  // ─── VILLAINS ──────────────────────────────────────────────────────────────
  {
    id: 'garmadon', image: 'images/garmadon.png', name: 'Lord Garmadon', group: 'villain', premium: true,
    element: 'darkness', hp: 140, attack: 26, defense: 18, speed: 13,
    tagline: 'Lord of Destruction',
    moves: buildMoves(
      { name: 'Dark Punch',     desc: 'Strike wreathed in darkness', power: 1.0 },
      { name: 'Shadow Crush',   desc: 'A devastating dark slam',     power: 1.7 },
      { name: 'Mega Weapon',    desc: 'Destroys with 4 weapons!',    power: 2.5, effect: 'curse', effectChance: 0.7 }
    ),
  },
  {
    id: 'pythor', image: 'images/pythor.png', name: 'Pythor', group: 'villain', premium: true,
    element: 'venom', hp: 115, attack: 23, defense: 15, speed: 17,
    tagline: 'Last Anacondrai',
    moves: buildMoves(
      { name: 'Venom Bite',   desc: 'A venomous bite',         power: 0.9 },
      { name: 'Constrict',    desc: 'Squeezes the life out',   power: 1.6 },
      { name: 'Viper Strike', desc: 'Anacondrai venom surge!', power: 2.0, effect: 'poison', effectChance: 0.75 }
    ),
  },
  {
    id: 'morro', image: 'images/morro.png', name: 'Morro', group: 'villain', premium: true,
    element: 'ghost', hp: 110, attack: 22, defense: 14, speed: 20,
    tagline: 'Ghost Warrior',
    moves: buildMoves(
      { name: 'Specter Slash', desc: 'A ghostly quick attack',   power: 1.0 },
      { name: 'Haunt',         desc: 'Terrifying ghost blow',    power: 1.6 },
      { name: 'Possession',    desc: 'Phases through defenses!', power: 2.0, effect: 'phase', effectChance: 0.7 }
    ),
  },
  {
    id: 'overlord', image: 'images/overlord.png', name: 'The Overlord', group: 'villain', premium: true,
    element: 'shadow', hp: 145, attack: 27, defense: 20, speed: 12,
    tagline: 'Source of All Evil',
    moves: buildMoves(
      { name: 'Shadow Bolt',  desc: 'A blast of shadow',        power: 1.0 },
      { name: 'Dark Matter',  desc: 'Crushing shadow energy',   power: 1.8 },
      { name: 'Shadow Storm', desc: 'Blinding shadow explosion!',power: 2.4, effect: 'blind', effectChance: 0.8 }
    ),
  },
  {
    id: 'chen', image: 'images/chen.png', name: 'Master Chen', group: 'villain', premium: true,
    element: 'staff', hp: 120, attack: 24, defense: 16, speed: 15,
    tagline: 'Anacondrai Cultist',
    moves: buildMoves(
      { name: 'Staff Jab',      desc: 'Quick staff hit',            power: 0.9 },
      { name: 'Elemental Drain', desc: 'Drains element power',      power: 1.6 },
      { name: 'Staff of Elements', desc: 'Channels all elements!',  power: 2.2, effect: 'confuse', effectChance: 0.7 }
    ),
  },

  {
    id: 'nadakhan', image: 'images/nadakhan.png', name: 'Nadakhan', group: 'villain', premium: true,
    element: 'djinn', hp: 130, attack: 26, defense: 18, speed: 17,
    tagline: 'Djinn Overlord',
    moves: buildMoves(
      { name: 'Djinn Blade',    desc: 'Strikes with the legendary Djinn Blade', power: 1.0 },
      { name: 'Wish Trap',      desc: 'Grants a terrible twisted wish',  power: 1.7 },
      { name: 'Infinite Realm', desc: 'Traps the foe in Djinjago forever!', power: 2.4, effect: 'confuse', effectChance: 0.85 }
    ),
  },
  {
    id: 'acronix', image: 'images/acronix.png', name: 'Acronix', group: 'villain', premium: true,
    element: 'time', hp: 115, attack: 25, defense: 14, speed: 20,
    tagline: 'The Forward Time Twin',
    moves: buildMoves(
      { name: 'Time Punch',     desc: 'Fist accelerated through time',  power: 1.0 },
      { name: 'Time Blade',     desc: 'Slashes with a forward time blade', power: 1.7 },
      { name: 'Time Surge',     desc: 'Accelerates time on the foe!',   power: 2.2, effect: 'stun', effectChance: 0.8 }
    ),
  },
  {
    id: 'krux', image: 'images/krux.png', name: 'Krux', group: 'villain', premium: true,
    element: 'time', hp: 118, attack: 22, defense: 19, speed: 14,
    tagline: 'The Slow Time Twin',
    moves: buildMoves(
      { name: 'Time Slow',      desc: 'Slows the opponent\'s time',     power: 1.0 },
      { name: 'Reversal Blade', desc: 'Hits with reversed time',        power: 1.6 },
      { name: 'Time Stop',      desc: 'Completely freezes time!',       power: 2.3, effect: 'freeze', effectChance: 0.8 }
    ),
  },
  {
    id: 'ice_emperor', image: 'images/ice_emperor.png', name: 'Ice Emperor', group: 'villain', premium: true,
    element: 'ice', hp: 145, attack: 28, defense: 22, speed: 13,
    tagline: 'Corrupted Zane',
    moves: buildMoves(
      { name: 'Scepter Blast',  desc: 'Ice blast from the scepter',     power: 1.0 },
      { name: 'Glacial Slam',   desc: 'Shattering ice assault',         power: 1.8 },
      { name: 'Absolute Rule',  desc: 'Absolute Zero annihilation!',    power: 2.6, effect: 'freeze', effectChance: 0.9 }
    ),
  },
  {
    id: 'vex', image: 'images/vex.png', name: 'Vex', group: 'villain', premium: true,
    element: 'ice', hp: 105, attack: 20, defense: 14, speed: 16,
    tagline: 'The Ice Emperor\'s Advisor',
    moves: buildMoves(
      { name: 'Ice Shard',      desc: 'Throws a razor-sharp ice shard',power: 0.9 },
      { name: 'Frost Trap',     desc: 'Freezing manipulation tactic',  power: 1.5 },
      { name: 'Winter\'s Call', desc: 'Summons the Ice Emperor\'s fury!',power: 2.0, effect: 'freeze', effectChance: 0.75 }
    ),
  },
  {
    id: 'clouse', image: 'images/clouse.png', name: 'Clouse', group: 'villain', premium: true,
    element: 'darkness', hp: 112, attack: 22, defense: 14, speed: 16,
    tagline: 'Chen\'s Dark Sorcerer',
    moves: buildMoves(
      { name: 'Dark Spell',     desc: 'A shadowy magical strike',       power: 0.9 },
      { name: 'Shadow Bolt',    desc: 'Fires a bolt of darkness',       power: 1.6 },
      { name: 'Book of Spells', desc: 'Unleashes forbidden dark magic!',power: 2.2, effect: 'curse', effectChance: 0.75 }
    ),
  },

  // ─── PREMIUM EXCLUSIVES ───────────────────────────────────────────────────
  {
    id: 'omega', image: 'images/omega.png', name: 'The Omega', group: 'villain', premium: true,
    element: 'oni', hp: 160, attack: 30, defense: 22, speed: 14,
    tagline: 'Leader of the Oni',
    moves: buildMoves(
      { name: 'Oni Slash',      desc: 'A dark dimensional strike',   power: 1.0 },
      { name: 'Void Crush',     desc: 'Crushes with void energy',    power: 1.8 },
      { name: 'Oni Extinction', desc: 'Dimensional annihilation!',   power: 2.6, effect: 'curse', effectChance: 0.85 }
    ),
  },
  {
    id: 'harumi', image: 'images/harumi.png', name: 'Harumi', group: 'villain', premium: true,
    element: 'deception', hp: 118, attack: 25, defense: 16, speed: 20,
    tagline: 'The Quiet One',
    moves: buildMoves(
      { name: 'Blade Trick',    desc: 'A cunning hidden strike',     power: 1.0 },
      { name: 'Mask of Hatred', desc: 'Uses the Oni Mask power',     power: 1.7 },
      { name: 'Resurrection',   desc: 'Curses and confuses foe!',    power: 1.8, effect: 'confuse', effectChance: 0.9 }
    ),
  },
  {
    id: 'crystal_dragon', image: 'images/crystal_dragon.svg', name: 'Crystal Dragon', group: 'dragon', premium: true,
    element: 'crystal', hp: 175, attack: 32, defense: 24, speed: 16,
    tagline: "Lloyd's Crystalized Form",
    moves: buildMoves(
      { name: 'Crystal Claw',   desc: 'Razor-sharp crystal swipe',   power: 1.0 },
      { name: 'Diamond Fang',   desc: 'Shattering crystal bite',     power: 1.8 },
      { name: 'Crystal Storm',  desc: 'Unleashes crystal barrage!',  power: 2.7, effect: 'armorbreak', effectChance: 0.9 }
    ),
  },

  // ─── SERPENTINE ───────────────────────────────────────────────────────────
  {
    id: 'skales', image: 'images/skales.png', name: 'Skales', group: 'serpentine',
    element: 'hypno', hp: 112, attack: 21, defense: 15, speed: 16,
    tagline: 'Hypnobrai General',
    moves: buildMoves(
      { name: 'Rattle Strike', desc: 'Quick rattlesnake strike',  power: 0.9 },
      { name: 'Tail Whip',     desc: 'Powerful tail smash',       power: 1.5 },
      { name: 'Hypno Gaze',    desc: 'Hypnotizes the opponent!',  power: 1.5, effect: 'hypnotize', effectChance: 0.85 }
    ),
  },
  {
    id: 'fangtom', image: 'images/fangtom.png', name: 'Fangtom', group: 'serpentine',
    element: 'fang', hp: 118, attack: 22, defense: 16, speed: 15,
    tagline: 'Fangpyre General',
    moves: buildMoves(
      { name: 'Double Fang',  desc: 'Strikes with two heads!',    power: 1.0 },
      { name: 'Fang Slam',    desc: 'Crashes heads together',     power: 1.6 },
      { name: 'Venom Spray',  desc: 'Infects with Fangpyre venom!',power: 1.9, effect: 'infect', effectChance: 0.75 }
    ),
  },
  {
    id: 'acidicus', image: 'images/acidicus.png', name: 'Acidicus', group: 'serpentine',
    element: 'acid', hp: 110, attack: 23, defense: 13, speed: 16,
    tagline: 'Venomari General',
    moves: buildMoves(
      { name: 'Acid Spit',    desc: 'Spits a glob of acid',      power: 1.0 },
      { name: 'Toxic Bite',   desc: 'Melts through armor',       power: 1.6 },
      { name: 'Acid Rain',    desc: 'Showers the foe in acid!',  power: 2.0, effect: 'melt', effectChance: 0.75 }
    ),
  },
  {
    id: 'skalidor', image: 'images/skalidor.png', name: 'Skalidor', group: 'serpentine',
    element: 'constrict', hp: 135, attack: 20, defense: 22, speed: 11,
    tagline: 'Constrictai General',
    moves: buildMoves(
      { name: 'Ground Smash',  desc: 'Burrows and slams up',       power: 0.9 },
      { name: 'Coil Crush',    desc: 'Crushes with full body',     power: 1.7 },
      { name: 'Serpent Bind',  desc: 'Immobilizes the opponent!',  power: 1.8, effect: 'bind', effectChance: 0.8 }
    ),
  },
  {
    id: 'aspheera', image: 'images/aspheera.jpg', name: 'Aspheera', group: 'serpentine',
    element: 'fire', hp: 130, attack: 27, defense: 16, speed: 17,
    tagline: 'Ancient Serpentine Sorceress',
    moves: buildMoves(
      { name: 'Fire Scepter',   desc: 'Blasts with stolen fire',    power: 1.0 },
      { name: 'Flame Whip',     desc: 'Lashes with a fire whip',    power: 1.7 },
      { name: 'Forbidden Fire', desc: 'Ancient forbidden magic!',   power: 2.3, effect: 'burn', effectChance: 0.85 }
    ),
  },

  {
    id: 'acidicus_snake', image: 'images/acidicus_snake.png', name: 'Acidicus (Giant Form)', group: 'season_4',
    element: 'acid', hp: 190, attack: 30, defense: 20, speed: 10,
    tagline: 'Venomari General — Massive Snake Form',
    moves: buildMoves(
      { name: 'Acid Spit',      desc: 'Sprays blinding venom',          power: 1.0 },
      { name: 'Crushing Coil',  desc: 'Wraps and squeezes the foe',     power: 1.8 },
      { name: 'Venom Flood',    desc: 'Bathes the arena in acid!',      power: 2.6, effect: 'melt', effectChance: 0.9 }
    ),
  },
  {
    id: 'great_devourer', image: 'images/great_devourer.png', name: 'The Great Devourer', group: 'season_4',
    element: 'venom', hp: 220, attack: 32, defense: 18, speed: 12,
    tagline: 'The Serpent That Consumes All',
    moves: buildMoves(
      { name: 'Fang Bite',      desc: 'Massive fang puncture',          power: 1.1 },
      { name: 'Venom Wave',     desc: 'Spews corrosive venom wave',     power: 1.9 },
      { name: 'World Devour',   desc: 'Attempts to swallow everything!',power: 2.8, effect: 'poison', effectChance: 1.0 }
    ),
  },

  // ─── SKELETON ARMY ────────────────────────────────────────────────────────
  {
    id: 'samukai', image: 'images/samukai.png', name: 'Samukai', group: 'skeleton',
    element: 'death', hp: 125, attack: 24, defense: 16, speed: 15,
    tagline: 'King of the Skulkin',
    moves: buildMoves(
      { name: 'Four-Arm Strike',desc: 'Attacks with all four arms!',   power: 1.0 },
      { name: 'Skull Crush',    desc: 'Devastating four-arm slam',     power: 1.7 },
      { name: 'Death\'s Hand',  desc: 'Channels death realm power!',   power: 2.4, effect: 'drain', effectChance: 0.8 }
    ),
  },
  {
    id: 'nuckal', image: 'images/nuckal.png', name: 'Nuckal', group: 'skeleton',
    element: 'lightning', hp: 98, attack: 19, defense: 11, speed: 16,
    tagline: 'Skulkin Lightning Warrior',
    moves: buildMoves(
      { name: 'Bone Club',      desc: 'Swings a heavy bone club',      power: 0.9 },
      { name: 'Skull Bash',     desc: 'Headbutts with skull force',    power: 1.5 },
      { name: 'Zap Bones',      desc: 'Lightning strike through bones!',power: 1.9, effect: 'stun', effectChance: 0.7 }
    ),
  },
  {
    id: 'kruncha', image: 'images/kruncha.png', name: 'Kruncha', group: 'skeleton',
    element: 'earth', hp: 105, attack: 20, defense: 16, speed: 12,
    tagline: 'Skulkin Sergeant',
    moves: buildMoves(
      { name: 'Ground Pound',   desc: 'Heavy slam to the ground',      power: 0.9 },
      { name: 'Bone Smash',     desc: 'Crushing bone hammer strike',   power: 1.5 },
      { name: 'Skull Quake',    desc: 'Skulkin earth tremor!',         power: 2.0, effect: 'armorbreak', effectChance: 0.7 }
    ),
  },

  // ─── NINDROIDS ────────────────────────────────────────────────────────────
  {
    id: 'cryptor', image: 'images/cryptor.png', name: 'General Cryptor', group: 'nindroid',
    element: 'darkness', hp: 118, attack: 24, defense: 17, speed: 17,
    tagline: 'Nindroid General',
    moves: buildMoves(
      { name: 'Cyber Strike',   desc: 'Digital-enhanced blade hit',    power: 1.0 },
      { name: 'Corrupt Code',   desc: 'Scrambles all enemy systems',   power: 1.6 },
      { name: 'System Override',desc: 'Total nindroid takeover!',      power: 2.2, effect: 'blind', effectChance: 0.75 }
    ),
  },
  {
    id: 'min_droid', image: 'images/min_droid.png', name: 'Min-Droid', group: 'nindroid',
    element: 'lightning', hp: 85, attack: 18, defense: 10, speed: 22,
    tagline: 'Smallest Nindroid',
    moves: buildMoves(
      { name: 'Tiny Slash',     desc: 'Surprisingly quick tiny slash', power: 0.9 },
      { name: 'Speed Strike',   desc: 'Blurs in and strikes fast',     power: 1.5 },
      { name: 'Shock Surge',    desc: 'Electric overload burst!',      power: 1.8, effect: 'stun', effectChance: 0.75 }
    ),
  },

  // ─── STONE ARMY ───────────────────────────────────────────────────────────
  {
    id: 'kozu', image: 'images/kozu.png', name: 'General Kozu', group: 'stone',
    element: 'earth', hp: 130, attack: 23, defense: 22, speed: 11,
    tagline: 'Stone Army General',
    moves: buildMoves(
      { name: 'Stone Fist',     desc: 'Crushing stone-hard punch',     power: 0.9 },
      { name: 'Stone Crush',    desc: 'Slams with full stone armor',   power: 1.6 },
      { name: 'Army Command',   desc: 'Unleashes Stone Army fury!',    power: 2.2, effect: 'armorbreak', effectChance: 0.75 }
    ),
  },
  {
    id: 'stone_warrior', image: 'images/stone_warrior.png', name: 'Stone Warrior', group: 'stone',
    element: 'earth', hp: 120, attack: 21, defense: 24, speed: 9,
    tagline: 'Indestructible Soldier',
    moves: buildMoves(
      { name: 'Shield Bash',    desc: 'Bashes with stone shield',      power: 0.9 },
      { name: 'Boulder Charge', desc: 'Full body stone charge',        power: 1.5 },
      { name: 'Stone Barrage',  desc: 'Hurl boulders relentlessly!',   power: 2.1, effect: 'armorbreak', effectChance: 0.7 }
    ),
  },

  // ─── ELEMENTAL MASTERS ────────────────────────────────────────────────────
  {
    id: 'karlof', image: 'images/karlof.png', name: 'Karlof', group: 'elemental',
    element: 'metal', hp: 125, attack: 24, defense: 20, speed: 12,
    tagline: 'Master of Metal',
    moves: buildMoves(
      { name: 'Iron Fist',      desc: 'Metal-coated powerful punch',   power: 1.0 },
      { name: 'Metal Crush',    desc: 'Crushes foe with metal fists',  power: 1.7 },
      { name: 'Steel Storm',    desc: 'Rains metal shards everywhere!',power: 2.2, effect: 'armorbreak', effectChance: 0.75 }
    ),
  },
  {
    id: 'griffin', image: 'images/griffin.png', name: 'Griffin Turner', group: 'elemental',
    element: 'speed', hp: 100, attack: 22, defense: 12, speed: 24,
    tagline: 'Master of Speed',
    moves: buildMoves(
      { name: 'Speed Blur',     desc: 'Attacks faster than the eye',   power: 1.0 },
      { name: 'Sonic Strike',   desc: 'Hits at supersonic speed',      power: 1.6 },
      { name: 'Velocity Rush',  desc: 'Maximum speed assault!',        power: 2.1, effect: 'stun', effectChance: 0.8 }
    ),
  },
  {
    id: 'shade', image: 'images/shade.png', name: 'Shade', group: 'elemental',
    element: 'smoke', hp: 102, attack: 21, defense: 14, speed: 19,
    tagline: 'Master of Shadow',
    moves: buildMoves(
      { name: 'Shadow Dash',    desc: 'Vanishes then strikes hard',    power: 1.0 },
      { name: 'Smoke Blind',    desc: 'Blinds foe with thick smoke',   power: 1.5 },
      { name: 'Phantom Strike', desc: 'Emerges from shadow for a kill!',power: 2.1, effect: 'blind', effectChance: 0.85 }
    ),
  },
  {
    id: 'chamille', image: 'images/chamille.png', name: 'Chamille', group: 'elemental',
    element: 'form', hp: 105, attack: 20, defense: 15, speed: 18,
    tagline: 'Master of Form',
    moves: buildMoves(
      { name: 'Shape Shift',    desc: 'Attacks while mid-transform',   power: 1.0 },
      { name: 'Form Steal',     desc: 'Copies foe\'s fighting style',  power: 1.6 },
      { name: 'Perfect Mimic',  desc: 'Becomes the ultimate fighter!', power: 2.0, effect: 'confuse', effectChance: 0.8 }
    ),
  },
  {
    id: 'neuro', image: 'images/neuro.png', name: 'Neuro', group: 'elemental',
    element: 'mind', hp: 100, attack: 20, defense: 13, speed: 17,
    tagline: 'Master of Mind',
    moves: buildMoves(
      { name: 'Mind Tap',       desc: 'Reads and mirrors foe\'s move', power: 1.0 },
      { name: 'Psychic Blast',  desc: 'Overloads the enemy\'s mind',   power: 1.6 },
      { name: 'Mind Break',     desc: 'Shatters foe\'s concentration!',power: 2.0, effect: 'confuse', effectChance: 0.85 }
    ),
  },
  {
    id: 'ash', image: 'images/ash.png', name: 'Ash', group: 'elemental',
    element: 'smoke', hp: 98, attack: 21, defense: 12, speed: 20,
    tagline: 'Master of Smoke',
    moves: buildMoves(
      { name: 'Smoke Jab',      desc: 'Strikes through a smoke screen',power: 1.0 },
      { name: 'Ash Cloud',      desc: 'Covers foe in choking ash',     power: 1.5 },
      { name: 'Smoke Bomb',     desc: 'Total smoke screen explosion!', power: 2.0, effect: 'blind', effectChance: 0.8 }
    ),
  },
  {
    id: 'paleman', image: 'images/paleman.png', name: 'Paleman', group: 'elemental',
    element: 'light', hp: 95, attack: 20, defense: 13, speed: 18,
    tagline: 'Master of Light',
    moves: buildMoves(
      { name: 'Light Punch',    desc: 'A blinding flash punch',        power: 1.0 },
      { name: 'Radiant Blast',  desc: 'Fires a beam of pure light',    power: 1.5 },
      { name: 'Solar Burst',    desc: 'Blinds with intense light!',    power: 2.0, effect: 'blind', effectChance: 0.85 }
    ),
  },
  {
    id: 'bolobo', image: 'images/bolobo.png', name: 'Bolobo', group: 'elemental',
    element: 'nature', hp: 110, attack: 19, defense: 17, speed: 14,
    tagline: 'Master of Nature',
    moves: buildMoves(
      { name: 'Vine Whip',      desc: 'Lashes with a thorny vine',     power: 1.0 },
      { name: 'Root Trap',      desc: 'Roots grow and entangle foe',   power: 1.5 },
      { name: 'Nature\'s Wrath',desc: 'The forest itself attacks!',    power: 2.0, effect: 'poison', effectChance: 0.8 }
    ),
  },
  {
    id: 'jacob', image: 'images/jacob.png', name: 'Jacob', group: 'elemental',
    element: 'sound', hp: 98, attack: 22, defense: 11, speed: 17,
    tagline: 'Master of Sound',
    moves: buildMoves(
      { name: 'Sonic Slap',     desc: 'A loud stunning slap',          power: 1.0 },
      { name: 'Resonance Hit',  desc: 'Hits on the foe\'s frequency',  power: 1.6 },
      { name: 'Deafening Roar', desc: 'Ear-splitting sonic wave!',     power: 2.0, effect: 'stun', effectChance: 0.8 }
    ),
  },

  // ─── MORE VILLAINS ────────────────────────────────────────────────────────
  {
    id: 'sensei_yang', image: 'images/sensei_yang.png', name: 'Sensei Yang', group: 'villain', premium: true,
    element: 'ghost', hp: 120, attack: 23, defense: 16, speed: 17,
    tagline: 'The Haunted Master',
    moves: buildMoves(
      { name: 'Ghost Fist',     desc: 'A blow from beyond',            power: 1.0 },
      { name: 'Haunt Strike',   desc: 'Terrifying ghost assault',      power: 1.6 },
      { name: 'Rift of Return', desc: 'Tears open a haunted rift!',    power: 2.2, effect: 'phase', effectChance: 0.8 }
    ),
  },
  {
    id: 'unagami', image: 'images/unagami.png', name: 'Unagami', group: 'villain', premium: true,
    element: 'tech', hp: 135, attack: 26, defense: 18, speed: 15,
    tagline: 'Prime Empire AI',
    moves: buildMoves(
      { name: 'Pixel Strike',   desc: 'Attacks with pixelated energy', power: 1.0 },
      { name: 'Data Drain',     desc: 'Sucks the life from the foe',   power: 1.7 },
      { name: 'Game Over',      desc: 'Total Prime Empire shutdown!',  power: 2.4, effect: 'blind', effectChance: 0.85 }
    ),
  },
  {
    id: 'the_mechanic', image: 'images/the_mechanic.png', name: 'The Mechanic', group: 'villain', premium: true,
    element: 'tech', hp: 115, attack: 24, defense: 17, speed: 14,
    tagline: 'Inmate 4011-D',
    moves: buildMoves(
      { name: 'Wrench Bash',    desc: 'Hits hard with a giant wrench', power: 1.0 },
      { name: 'Tech Shock',     desc: 'Electric gadget attack',        power: 1.6 },
      { name: 'Mech Arm Slam',  desc: 'Crushes with his mech arms!',   power: 2.2, effect: 'armorbreak', effectChance: 0.75 }
    ),
  },

  {
    id: 'chen_anacondrai', image: 'images/chen_anacondrai.png', name: 'Chen (Anacondrai)', group: 'season_4',
    element: 'acid', hp: 145, attack: 28, defense: 18, speed: 15,
    tagline: 'Tournament Master — Anacondrai Mutation',
    moves: buildMoves(
      { name: 'Venom Bite',      desc: 'Snaps with transformed jaws',     power: 1.0 },
      { name: 'Snake Slam',      desc: 'Coils and crushes the foe',       power: 1.8 },
      { name: 'Acid Mutation',   desc: 'Mutagen flood corrodes all!',     power: 2.5, effect: 'melt', effectChance: 0.85 }
    ),
  },

  // ─── MORE SKELETON ARMY ───────────────────────────────────────────────────
  {
    id: 'wyplash', image: 'images/wyplash.png', name: 'Wyplash', group: 'skeleton',
    element: 'ice', hp: 108, attack: 20, defense: 15, speed: 14,
    tagline: 'Skulkin Ice General',
    moves: buildMoves(
      { name: 'Frost Bash',     desc: 'Bashes with icy bone fists',    power: 0.9 },
      { name: 'Chill Strike',   desc: 'Chilling skull slam',           power: 1.5 },
      { name: 'Skull Blizzard', desc: 'Freezing skulkin assault!',     power: 2.0, effect: 'freeze', effectChance: 0.7 }
    ),
  },
  {
    id: 'frakjaw', image: 'images/frakjaw.png', name: 'Frakjaw', group: 'skeleton',
    element: 'fire', hp: 100, attack: 19, defense: 12, speed: 15,
    tagline: 'Skulkin Fire Warrior',
    moves: buildMoves(
      { name: 'Flame Bone',     desc: 'Throws a flaming bone',         power: 0.9 },
      { name: 'Fire Skull',     desc: 'Hurls a burning skull',         power: 1.5 },
      { name: 'Bone Inferno',   desc: 'Skull volcano eruption!',       power: 1.9, effect: 'burn', effectChance: 0.7 }
    ),
  },

  // ─── DRAGONS RISING ───────────────────────────────────────────────────────
  {
    id: 'acidicus_snake_dr', image: 'images/acidicus_snake.png', name: 'Acid Snake (DR)', group: 'dragons_rising',
    element: 'acid', hp: 200, attack: 32, defense: 22, speed: 11,
    tagline: 'Ancient Serpent — Dragons Rising',
    moves: buildMoves(
      { name: 'Acid Spit',      desc: 'Sprays blinding venom',          power: 1.0 },
      { name: 'Crushing Coil',  desc: 'Wraps and squeezes the foe',     power: 1.8 },
      { name: 'Venom Flood',    desc: 'Bathes the arena in acid!',      power: 2.6, effect: 'melt', effectChance: 0.9 }
    ),
  },
  {
    id: 'ras', image: 'images/ras.png', name: 'Ras', group: 'dragons_rising',
    element: 'darkness', hp: 140, attack: 28, defense: 20, speed: 16,
    tagline: 'Imperium Warlord',
    moves: buildMoves(
      { name: 'Imperium Blade',  desc: 'Swift Imperium strike',           power: 1.0 },
      { name: 'Shadow Lash',     desc: 'Whips with dark energy tendrils', power: 1.8 },
      { name: 'Void Command',    desc: 'Unleashes Imperium chaos!',       power: 2.4, effect: 'curse', effectChance: 0.8 }
    ),
  },
  {
    id: 'wyldfyre', image: 'images/wyldfyre.png', name: 'Wyldfyre', group: 'dragons_rising',
    element: 'fire', hp: 118, attack: 26, defense: 15, speed: 20,
    tagline: 'Wild Child of Fire',
    moves: buildMoves(
      { name: 'Wild Flame',      desc: 'Reckless fire burst',             power: 1.0 },
      { name: 'Inferno Rush',    desc: 'Charges through enemy in flames', power: 1.7 },
      { name: 'Dragon\'s Roar',  desc: 'Unleashes pure dragon fire!',     power: 2.4, effect: 'burn', effectChance: 0.85 }
    ),
  },
  {
    id: 'sora', image: 'images/sora.png', name: 'Sora', group: 'dragons_rising',
    element: 'lightning', hp: 112, attack: 24, defense: 14, speed: 22,
    tagline: 'Young Elemental Ninja',
    moves: buildMoves(
      { name: 'Thunder Punch',   desc: 'Lightning-charged fist',          power: 1.0 },
      { name: 'Storm Dash',      desc: 'Blinding speed strike',           power: 1.7 },
      { name: 'Spark Burst',     desc: 'Overloads foe with voltage!',     power: 2.3, effect: 'stun', effectChance: 0.8 }
    ),
  },
  {
    id: 'jay_dragon_dr', image: 'images/jay_dragon_dr.png', name: 'Jay — Dragon Form', group: 'dragons_rising',
    element: 'lightning', hp: 175, attack: 33, defense: 20, speed: 20,
    tagline: 'Dragons Rising — Jay\'s Dragon Form',
    moves: buildMoves(
      { name: 'Thunder Claw',   desc: 'Slashes with electric talons',   power: 1.0 },
      { name: 'Storm Dive',     desc: 'Dives at blinding speed',        power: 1.8 },
      { name: 'Tempest Roar',   desc: 'Unleashes a lightning storm!',   power: 2.6, effect: 'stun', effectChance: 0.9 }
    ),
  },
  {
    id: 'lloyd_dragon_dr', image: 'images/lloyd_dragon_dr.png', name: 'Lloyd — Dragon Form', group: 'dragons_rising',
    element: 'energy', hp: 185, attack: 35, defense: 22, speed: 18,
    tagline: 'Dragons Rising — Lloyd\'s Draconus Form',
    moves: buildMoves(
      { name: 'Dragon Fang',    desc: 'Bites with emerald dragon jaws',  power: 1.0 },
      { name: 'Green Surge',    desc: 'Channels energy through scales',  power: 1.8 },
      { name: 'Draconus Roar',  desc: 'Overwhelming dragon energy!',     power: 2.6, effect: 'overpower', effectChance: 0.9 }
    ),
  },
  {
    id: 'zane_dragon_dr', image: 'images/zane_dragon_dr.png', name: 'Zane — Dragon Form', group: 'dragons_rising',
    element: 'ice', hp: 170, attack: 30, defense: 25, speed: 19,
    tagline: 'Dragons Rising — Zane\'s Draconus Form',
    moves: buildMoves(
      { name: 'Frost Wing',     desc: 'Strikes with icy dragon wings',   power: 1.0 },
      { name: 'Blizzard Dive',  desc: 'Plunges through freezing air',    power: 1.8 },
      { name: 'Arctic Roar',    desc: 'Flash-freezes everything!',       power: 2.5, effect: 'freeze', effectChance: 0.9 }
    ),
  },
  {
    id: 'kai_dragon_dr', image: 'images/kai_dragon_dr.png', name: 'Kai — Dragon Form', group: 'dragons_rising',
    element: 'fire', hp: 175, attack: 36, defense: 18, speed: 20,
    tagline: 'Dragons Rising — Kai\'s Draconus Form',
    moves: buildMoves(
      { name: 'Flame Claw',     desc: 'Rakes with burning dragon claws', power: 1.0 },
      { name: 'Inferno Wing',   desc: 'Scorches foe with fire wings',    power: 1.8 },
      { name: 'Dragon Inferno', desc: 'Erupts in total dragon fire!',    power: 2.6, effect: 'burn', effectChance: 0.95 }
    ),
  },
  {
    id: 'cole_dragon_dr', image: 'images/cole_dragon_dr.png', name: 'Cole — Dragon Form', group: 'dragons_rising',
    element: 'earth', hp: 190, attack: 32, defense: 28, speed: 14,
    tagline: 'Dragons Rising — Cole\'s Draconus Form',
    moves: buildMoves(
      { name: 'Boulder Claw',   desc: 'Crushes with stone dragon fist',  power: 1.0 },
      { name: 'Quake Wing',     desc: 'Shakes ground with dragon force',  power: 1.9 },
      { name: 'Terra Roar',     desc: 'Cracks earth with dragon might!',  power: 2.5, effect: 'armorbreak', effectChance: 0.9 }
    ),
  },
  {
    id: 'acid_monster_dr', image: 'images/acid_monster_dr.png', name: 'Acid Monster', group: 'dragons_rising',
    element: 'acid', hp: 160, attack: 30, defense: 16, speed: 14,
    tagline: 'Venomous Elemental Monster',
    moves: buildMoves(
      { name: 'Acid Spit',      desc: 'Spits corrosive acid',            power: 1.0 },
      { name: 'Venom Lunge',    desc: 'Leaps and bites with poison jaws',power: 1.8 },
      { name: 'Acid Flood',     desc: 'Floods the arena with acid!',     power: 2.5, effect: 'melt', effectChance: 0.9 }
    ),
  },
  {
    id: 'fire_monster_dr', image: 'images/drs4_trailer_54.png', name: 'Fire Monster', group: 'dragons_rising',
    element: 'fire', hp: 155, attack: 32, defense: 14, speed: 16,
    tagline: 'Blazing Elemental Monster',
    moves: buildMoves(
      { name: 'Ember Claw',     desc: 'Rakes with burning claws',        power: 1.0 },
      { name: 'Skull Flame',    desc: 'Launches flaming skull blast',    power: 1.8 },
      { name: 'Inferno Surge',  desc: 'Erupts in a wall of fire!',       power: 2.5, effect: 'burn', effectChance: 0.95 }
    ),
  },
  {
    id: 'earth_monster_dr', image: 'images/earth_monster_dr.webp', name: 'Earth Monster', group: 'dragons_rising',
    element: 'earth', hp: 170, attack: 28, defense: 24, speed: 11,
    tagline: 'Unstoppable Elemental Monster of Earth',
    moves: buildMoves(
      { name: 'Stone Fist',     desc: 'Hammers foe with a rocky fist',    power: 1.0 },
      { name: 'Tremor Stomp',   desc: 'Shakes the ground with raw force', power: 1.8 },
      { name: 'Rockslide',      desc: 'Buries the arena in boulders!',    power: 2.5, effect: 'armorbreak', effectChance: 0.9 }
    ),
  },
  {
    id: 'mutation_monster_dr', image: 'images/boss_mutation_monster_big_dr.png', name: 'Mutation Monster', group: 'dragons_rising',
    element: 'poison_oni', hp: 210, attack: 34, defense: 22, speed: 10,
    tagline: 'Colossal Mutated Elemental Boss',
    moves: buildMoves(
      { name: 'Multi-Claw',     desc: 'Strikes with many limbs at once', power: 1.1 },
      { name: 'Mutation Slam',  desc: 'Crashes down with full mass',     power: 2.0 },
      { name: 'Void Eruption',  desc: 'Releases mutagen in all directions!', power: 2.8, effect: 'poison', effectChance: 1.0 }
    ),
  },
  {
    id: 'euphrasia', image: 'images/euphrasia.png', name: 'Euphrasia', group: 'dragons_rising',
    element: 'nature', hp: 130, attack: 26, defense: 18, speed: 17,
    tagline: 'Dragons Rising Ally',
    moves: buildMoves(
      { name: 'Vine Whip',      desc: 'Lashes out with wild vines',      power: 1.0 },
      { name: 'Nature\'s Grip', desc: 'Roots the foe in place',          power: 1.7 },
      { name: 'Forest Surge',   desc: 'The jungle rises up!',            power: 2.3, effect: 'bind', effectChance: 0.85 }
    ),
  },
  {
    id: 'frak', image: 'images/frak.png', name: 'Frak', group: 'dragons_rising',
    element: 'acid', hp: 115, attack: 22, defense: 14, speed: 18,
    tagline: 'Frak Slitherbottom',
    moves: buildMoves(
      { name: 'Venom Spit',     desc: 'Spits caustic venom',             power: 1.0 },
      { name: 'Tail Sweep',     desc: 'Knocks foe off their feet',       power: 1.6 },
      { name: 'Acid Burst',     desc: 'Releases concentrated acid!',     power: 2.2, effect: 'melt', effectChance: 0.8 }
    ),
  },
  {
    id: 'reginald', image: 'images/frak_dad.png', name: 'Reginald Slitherbottom', group: 'serpentine',
    element: 'acid', hp: 125, attack: 23, defense: 16, speed: 14,
    tagline: 'Frak\'s Dad — Venomari Elder',
    moves: buildMoves(
      { name: 'Elder Bite',     desc: 'Venomous elder fangs strike',     power: 1.0 },
      { name: 'Slither Slam',   desc: 'Crashes down with full weight',   power: 1.7 },
      { name: 'Venom Spray',    desc: 'Drenches foe in venom!',          power: 2.3, effect: 'poison', effectChance: 0.85 }
    ),
  },
  {
    id: 'treewoks', image: 'images/treewoks.png', name: 'Treewoks', group: 'dragons_rising',
    element: 'nature', hp: 85, attack: 16, defense: 12, speed: 22,
    tagline: 'Tiny Forest People of the Whispering Wood',
    moves: buildMoves(
      { name: 'Twig Strike',    desc: 'Dozens of tiny warriors swarm!', power: 1.0 },
      { name: 'Forest Ambush',  desc: 'Attack from the treetops!',      power: 1.6 },
      { name: 'Treewok Rush',   desc: 'The whole forest rises up!',     power: 2.1, effect: 'bind', effectChance: 0.8 }
    ),
  },

  {
    id: 'zilvar', image: 'images/zilvar.svg', name: 'Zilvar', group: 'dragons_rising',
    element: 'crystal', hp: 140, attack: 28, defense: 16, speed: 21,
    tagline: 'Crystal Dragon of Dragons Rising',
    moves: buildMoves(
      { name: 'Crystal Slash',  desc: 'Razor-sharp crystal strike',        power: 1.0 },
      { name: 'Shard Volley',   desc: 'Fires a hail of crystal shards',    power: 1.7 },
      { name: 'Prism Burst',    desc: 'Shatters reality with pure crystal!', power: 2.4, effect: 'stun', effectChance: 0.80 }
    ),
  },

  // ─── LEGENDARY PACK (£5) ─────────────────────────────────────────────────
  {
    id: 'first_spinjitzu_master', image: 'images/first_spinjitzu_master.png', name: 'First Spinjitzu Master', group: 'legendary', premiumMega: true,
    element: 'creation', hp: 250, attack: 45, defense: 35, speed: 20,
    tagline: 'Creator of Ninjago',
    moves: buildMoves(
      { name: 'Creation Strike',  desc: 'A blow that shakes reality',      power: 1.0 },
      { name: 'Spinjitzu Origin', desc: 'The first Spinjitzu ever used',   power: 2.0 },
      { name: 'World Creation',   desc: 'Reshapes reality around the foe!',power: 3.0, effect: 'overpower', effectChance: 1.0 }
    ),
  },
  {
    id: 'golden_lloyd', image: 'images/golden_lloyd.png', name: 'Golden Lloyd', group: 'legendary', premiumMega: true,
    element: 'golden', hp: 220, attack: 42, defense: 32, speed: 22,
    tagline: 'The Ultimate Spinjitzu Master',
    moves: buildMoves(
      { name: 'Golden Strike',    desc: 'Hits with unstoppable golden power',power: 1.0 },
      { name: 'Golden Dragon',    desc: 'Unleashes the Golden Dragon!',     power: 2.2 },
      { name: 'Golden Power',     desc: 'Full Golden Power annihilation!',  power: 3.2, effect: 'overpower', effectChance: 1.0 }
    ),
  },
  {
    id: 'overlord_dragon', image: 'images/overlord_dragon.png', name: 'Overlord Dragon', group: 'legendary', premiumMega: true,
    element: 'shadow', hp: 240, attack: 44, defense: 30, speed: 18,
    tagline: 'True Form of the Overlord',
    moves: buildMoves(
      { name: 'Dark Talon',       desc: 'Razor shadow claw attack',        power: 1.0 },
      { name: 'Dark Matter Rain', desc: 'Rains dark matter everywhere',    power: 2.0 },
      { name: 'Shadow Apocalypse',desc: 'Total shadow annihilation!',      power: 3.1, effect: 'curse', effectChance: 1.0 }
    ),
  },
  {
    id: 'oni_garmadon', image: 'images/oni_garmadon.png', name: 'Oni Garmadon', group: 'legendary', premiumMega: true,
    element: 'oni', hp: 230, attack: 43, defense: 28, speed: 16,
    tagline: 'The Destroyer — 4-Armed Form',
    moves: buildMoves(
      { name: 'Four Fist Combo',  desc: 'Strikes 4 times simultaneously', power: 1.2 },
      { name: 'Oni Rage',         desc: 'Oni fury in full force',          power: 2.1 },
      { name: 'Darkness Reigns',  desc: 'Oni world takeover assault!',     power: 3.0, effect: 'curse', effectChance: 0.95 }
    ),
  },
  {
    id: 'iron_doom', image: 'images/iron_doom.png', name: 'Iron Doom', group: 'legendary', premiumMega: true,
    element: 'time', hp: 280, attack: 40, defense: 42, speed: 8,
    tagline: 'Colossal Time Twin Mech',
    moves: buildMoves(
      { name: 'Mech Stomp',       desc: 'Crushes foe under giant foot',   power: 1.0 },
      { name: 'Time Cannon',      desc: 'Fires a time-warped blast',       power: 2.0 },
      { name: 'Iron Doom Crush',  desc: 'The mech\'s full power unleashed!',power: 3.0, effect: 'stun', effectChance: 1.0 }
    ),
  },

  // ─── DRAGONS ──────────────────────────────────────────────────────────────
  {
    id: 'fire_dragon', image: 'images/fire_dragon.png', name: 'Fire Dragon', group: 'dragon',
    element: 'fire', hp: 160, attack: 30, defense: 20, speed: 14,
    tagline: 'Kai\'s Flame Dragon',
    moves: buildMoves(
      { name: 'Claw Swipe',    desc: 'Slashes with fiery claws',  power: 0.9 },
      { name: 'Inferno Bite',  desc: 'Bites down with fire',      power: 1.6 },
      { name: 'Fire Breath',   desc: 'Engulfs foe in dragonfire!',power: 2.5, effect: 'burn', effectChance: 0.85 }
    ),
  },
  {
    id: 'ice_dragon', image: 'images/ice_dragon.png', name: 'Ice Dragon', group: 'dragon',
    element: 'ice', hp: 155, attack: 28, defense: 22, speed: 13,
    tagline: 'Zane\'s Frost Dragon',
    moves: buildMoves(
      { name: 'Ice Claw',      desc: 'Strikes with frozen talons', power: 0.9 },
      { name: 'Glacier Bite',  desc: 'Freezing powerful bite',     power: 1.6 },
      { name: 'Blizzard Roar', desc: 'Blast of arctic wind!',      power: 2.4, effect: 'freeze', effectChance: 0.8 }
    ),
  },
  {
    id: 'lightning_dragon', image: 'images/lightning_dragon.png', name: 'Lightning Dragon', group: 'dragon',
    element: 'lightning', hp: 150, attack: 29, defense: 18, speed: 17,
    tagline: 'Jay\'s Storm Dragon',
    moves: buildMoves(
      { name: 'Thunder Claw',  desc: 'Electrified claw strike',     power: 1.0 },
      { name: 'Storm Fang',    desc: 'Shocking bite attack',        power: 1.7 },
      { name: 'Thunderstrike', desc: 'Lightning bolt from above!',  power: 2.5, effect: 'stun', effectChance: 0.85 }
    ),
  },
  {
    id: 'earth_dragon', image: 'images/earth_dragon.png', name: 'Earth Dragon', group: 'dragon',
    element: 'earth', hp: 165, attack: 27, defense: 25, speed: 11,
    tagline: 'Cole\'s Rock Dragon',
    moves: buildMoves(
      { name: 'Seismic Claw',  desc: 'Claw shake the ground',      power: 0.9 },
      { name: 'Boulder Bite',  desc: 'Crushing bite like a rock',   power: 1.6 },
      { name: 'Earthquake',    desc: 'Crumbles all defenses!',      power: 2.4, effect: 'armorbreak', effectChance: 0.8 }
    ),
  },

  // ─── MECHS ────────────────────────────────────────────────────────────────
  {
    id: 'fire_mech', image: 'images/fire_mech.png', name: 'Fire Mech', group: 'mech',
    element: 'fire', hp: 155, attack: 26, defense: 24, speed: 12,
    tagline: 'Kai\'s Fire Mech',
    moves: buildMoves(
      { name: 'Mech Punch',    desc: 'Steel fist to the face',     power: 0.9 },
      { name: 'Rocket Fist',   desc: 'Fires rocket-powered fist',  power: 1.7 },
      { name: 'Flame Cannon',  desc: 'Fires superheated blast!',   power: 2.3, effect: 'burn', effectChance: 0.75 }
    ),
  },
  {
    id: 'samurai_mech', image: 'images/samurai_mech.png', name: 'Samurai Mech', group: 'mech',
    element: 'water', hp: 150, attack: 25, defense: 23, speed: 14,
    tagline: 'Nya\'s Samurai Mech',
    moves: buildMoves(
      { name: 'Blade Slash',   desc: 'Quick mech blade strike',    power: 1.0 },
      { name: 'Shield Bash',   desc: 'Slams with mech shield',     power: 1.6 },
      { name: 'Hydro Cannon',  desc: 'Fires high-pressure water!', power: 2.3, effect: 'soak', effectChance: 0.75 }
    ),
  },
  {
    id: 'earth_mech', image: 'images/earth_mech.png', name: 'Earth Mech', group: 'mech',
    element: 'earth', hp: 160, attack: 24, defense: 26, speed: 10,
    tagline: 'Cole\'s Earth Driller',
    moves: buildMoves(
      { name: 'Drill Jab',     desc: 'Drill-tipped punch',         power: 0.9 },
      { name: 'Rock Hammer',   desc: 'Hammers with stone fist',    power: 1.7 },
      { name: 'Ground Drill',  desc: 'Burrows and erupts beneath!',power: 2.3, effect: 'armorbreak', effectChance: 0.75 }
    ),
  },
  {
    id: 'titanium_mech', image: 'images/titanium_mech.png', name: 'Titanium Mech', group: 'mech',
    element: 'ice', hp: 145, attack: 27, defense: 22, speed: 15,
    tagline: 'Zane\'s Titanium Mech',
    moves: buildMoves(
      { name: 'Cryo Fist',     desc: 'Sub-zero powered punch',     power: 1.0 },
      { name: 'Ice Cannon',    desc: 'Fires a burst of ice',       power: 1.6 },
      { name: 'Absolute Zero', desc: 'Freezes everything!',        power: 2.4, effect: 'freeze', effectChance: 0.8 }
    ),
  },
];

// Lookup helpers
function getCharacter(id) {
  return CHARACTERS.find(c => c.id === id);
}

function getCharactersByGroup(group) {
  return CHARACTERS.filter(c => c.group === group);
}

function getElement(elementKey) {
  return ELEMENTS[elementKey];
}

function getStatusEffect(effectKey) {
  return STATUS_EFFECTS[effectKey];
}

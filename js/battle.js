// Ninjago Battle — Combat Logic

class BattleState {
  constructor(playerChar, opponentChar) {
    this.player = this._createFighter(playerChar, 'player');
    this.opponent = this._createFighter(opponentChar, 'opponent');
    this.turn = 'player'; // 'player' | 'opponent'
    this.log = [];
    this.over = false;
    this.winner = null;
    this.locked = false; // prevents input during animations
  }

  _createFighter(charData, side) {
    return {
      ...charData,
      currentHp: charData.hp,
      maxHp: charData.hp,
      charges: 0,
      maxCharges: 3,
      isDefending: false,
      statusEffects: [], // [{ key, turnsLeft, ...effectData }]
      side,
    };
  }

  // ─── DAMAGE CALCULATION ──────────────────────────────────────────────────

  calcDamage(attacker, defender, move) {
    if (move.type === 'defend') return 0;

    let atk = attacker.attack;
    let def = defender.defense;

    // Apply attacker status modifiers
    for (const fx of attacker.statusEffects) {
      if (fx.attackMult !== undefined) atk *= fx.attackMult;
    }

    // Apply defender status modifiers
    let defMult = 1;
    for (const fx of defender.statusEffects) {
      if (fx.defenseMult !== undefined) defMult = Math.min(defMult, fx.defenseMult);
      if (fx.defenseMult === 0) { def = 0; break; }
    }
    def *= defMult;

    // Defending halves damage
    if (defender.isDefending) def *= 2;

    const raw = (atk * move.power) - (def * 0.5);
    const variance = Math.floor(Math.random() * 11) - 5;
    return Math.max(1, Math.round(raw + variance));
  }

  // ─── STATUS EFFECT HELPERS ──────────────────────────────────────────────

  applyStatusEffect(fighter, effectKey) {
    const template = getStatusEffect(effectKey);
    if (!template) return;

    // Check if already has this effect (refresh duration or stack for poison/burn)
    const existing = fighter.statusEffects.find(fx => fx.key === effectKey);
    if (existing) {
      if (effectKey === 'poison' || effectKey === 'burn' || effectKey === 'infect') {
        // Stackable: add another instance
        fighter.statusEffects.push({ key: effectKey, turnsLeft: template.duration, ...template });
        this.addLog(`${fighter.name} is more ${template.label}!`, 'status');
      } else {
        // Refresh
        existing.turnsLeft = template.duration;
        this.addLog(`${fighter.name}'s ${template.label} refreshed!`, 'status');
      }
    } else {
      fighter.statusEffects.push({ key: effectKey, turnsLeft: template.duration, ...template });
      this.addLog(`${fighter.name} is ${template.label}!`, 'status');
    }
  }

  tickStatusEffects(fighter) {
    let totalDot = 0;
    const remaining = [];

    for (const fx of fighter.statusEffects) {
      if (fx.damagePerTurn) {
        totalDot += fx.damagePerTurn;
      }
      fx.turnsLeft--;
      if (fx.turnsLeft > 0) {
        remaining.push(fx);
      } else {
        this.addLog(`${fighter.name}'s ${fx.label} wore off.`, 'info');
      }
    }

    fighter.statusEffects = remaining;

    if (totalDot > 0) {
      fighter.currentHp = Math.max(0, fighter.currentHp - totalDot);
      this.addLog(`${fighter.name} took ${totalDot} damage from status effects!`, 'damage');
    }
    return totalDot;
  }

  hasEffect(fighter, effectKey) {
    return fighter.statusEffects.some(fx => fx.key === effectKey);
  }

  getSkipTurn(fighter) {
    return fighter.statusEffects.some(fx => fx.skipTurn);
  }

  // ─── DODGE CHECK ────────────────────────────────────────────────────────

  checkDodge(defender) {
    for (const fx of defender.statusEffects) {
      if (fx.dodgeChance && Math.random() < fx.dodgeChance) return true;
    }
    return false;
  }

  // ─── EXECUTE MOVE ───────────────────────────────────────────────────────

  executeMove(attackerSide, moveId) {
    if (this.over) return null;

    const attacker = attackerSide === 'player' ? this.player : this.opponent;
    const defender = attackerSide === 'player' ? this.opponent : this.player;

    const move = attacker.moves.find(m => m.id === moveId);
    if (!move) return null;

    // Validate special charge
    if (move.type === 'special' && attacker.charges < 1) {
      this.addLog(`${attacker.name} doesn't have enough charge!`, 'info');
      return null;
    }

    // Reset defending state at start of action
    if (move.type !== 'defend') {
      attacker.isDefending = false;
    }

    let result = {
      attackerSide,
      moveId,
      moveName: move.name,
      attackerName: attacker.name,
      defenderName: defender.name,
      damage: 0,
      missed: false,
      defended: false,
      effectApplied: null,
      dodged: false,
    };

    if (move.type === 'defend') {
      attacker.isDefending = true;
      attacker.charges = Math.min(attacker.maxCharges, attacker.charges + 1);
      this.addLog(`${attacker.name} takes a defensive stance! (+1 charge)`, 'defend');
      result.defended = true;
    } else {
      // Check blind (miss chance)
      const isBlind = this.hasEffect(attacker, 'blind');
      if (isBlind && Math.random() < 0.4) {
        this.addLog(`${attacker.name}'s ${move.name} missed! (Blinded)`, 'miss');
        result.missed = true;
        this._gainCharge(attacker, move);
        this._endTurn(attacker, defender, result);
        return result;
      }

      // Check confused (random action)
      const isConfused = this.hasEffect(attacker, 'confuse');
      let finalMove = move;
      if (isConfused && Math.random() < 0.5) {
        const lightMove = attacker.moves.find(m => m.id === 'light');
        finalMove = lightMove;
        this.addLog(`${attacker.name} is confused and attacks randomly!`, 'status');
        result.moveName = finalMove.name;
      }

      // Check dodge
      if (this.checkDodge(defender)) {
        this.addLog(`${defender.name} phased through ${attacker.name}'s attack!`, 'dodge');
        result.dodged = true;
        this._gainCharge(attacker, finalMove);
        this._endTurn(attacker, defender, result);
        return result;
      }

      // Calculate and deal damage
      const dmg = this.calcDamage(attacker, defender, finalMove);
      defender.currentHp = Math.max(0, defender.currentHp - dmg);
      result.damage = dmg;

      // Build log message
      const typeLabel = finalMove.type === 'heavy' ? 'heavy' : finalMove.type === 'special' ? 'SPECIAL' : '';
      const label = typeLabel ? ` [${typeLabel}]` : '';
      this.addLog(`${attacker.name} used ${finalMove.name}${label} — ${dmg} damage!`, 'attack');

      // Special charges and effects
      if (finalMove.type === 'special') {
        attacker.charges = Math.max(0, attacker.charges - 1);
        // Apply effect
        if (finalMove.effect && Math.random() < (finalMove.effectChance || 0.5)) {
          this.applyStatusEffect(defender, finalMove.effect);
          result.effectApplied = finalMove.effect;
        }
      } else {
        this._gainCharge(attacker, finalMove);
      }

      // Check if defender fainted
      if (defender.currentHp <= 0) {
        defender.currentHp = 0;
        this.over = true;
        this.winner = attackerSide;
        this.addLog(`${defender.name} has been defeated!`, 'ko');
        return result;
      }
    }

    this._endTurn(attacker, defender, result);
    return result;
  }

  _gainCharge(fighter, move) {
    if (move.type === 'light') {
      fighter.charges = Math.min(fighter.maxCharges, fighter.charges + 1);
    } else if (move.type === 'heavy') {
      fighter.charges = Math.min(fighter.maxCharges, fighter.charges + 0.5);
      fighter.charges = Math.round(fighter.charges * 2) / 2; // keep in 0.5 steps
    }
  }

  _endTurn(attacker, defender, result) {
    // Tick status effects for the one whose turn just ended
    this.tickStatusEffects(attacker);

    if (attacker.currentHp <= 0) {
      attacker.currentHp = 0;
      this.over = true;
      this.winner = defender.side;
      this.addLog(`${attacker.name} was defeated by status damage!`, 'ko');
    }
  }

  // ─── AI TURN ────────────────────────────────────────────────────────────

  getAIMove() {
    const ai = this.opponent;
    const player = this.player;

    // Skip turn if frozen/hypnotized
    if (this.getSkipTurn(ai)) {
      const fx = ai.statusEffects.find(f => f.skipTurn);
      this.addLog(`${ai.name} can't move! (${fx ? fx.label : 'Frozen'})`, 'status');
      this.tickStatusEffects(ai);
      this.turn = 'player';
      return 'skip';
    }

    const hpRatio = ai.currentHp / ai.maxHp;
    const playerHpRatio = player.currentHp / player.maxHp;

    // Priority logic
    // 1. Use special if fully charged and player is not low on HP (to maximize damage)
    if (ai.charges >= 3) {
      return 'special';
    }

    // 2. Use special if low HP to gamble
    if (hpRatio < 0.3 && ai.charges >= 1) {
      return 'special';
    }

    // 3. Defend if player likely to land a big hit and AI is fragile
    if (hpRatio < 0.5 && Math.random() < 0.25) {
      return 'defend';
    }

    // 4. Use heavy attack sometimes
    if (Math.random() < 0.3) {
      return 'heavy';
    }

    // 5. Default to light attack
    return 'light';
  }

  // ─── TURN FLOW ───────────────────────────────────────────────────────────

  playerTakeTurn(moveId) {
    if (this.turn !== 'player' || this.over) return;

    // Check skip
    if (this.getSkipTurn(this.player)) {
      const fx = this.player.statusEffects.find(f => f.skipTurn);
      this.addLog(`${this.player.name} can't move! (${fx ? fx.label : 'Frozen'})`, 'status');
      this.tickStatusEffects(this.player);
      if (this.player.currentHp <= 0) {
        this.player.currentHp = 0;
        this.over = true;
        this.winner = 'opponent';
      }
      this.turn = 'opponent';
      return { skipped: true };
    }

    const result = this.executeMove('player', moveId);
    if (!result) return null;
    if (!this.over) {
      this.turn = 'opponent';
    }
    return result;
  }

  opponentTakeTurn() {
    if (this.turn !== 'opponent' || this.over) return;

    const moveId = this.getAIMove();
    if (moveId === 'skip') {
      this.turn = 'player';
      return { skipped: true };
    }

    const result = this.executeMove('opponent', moveId);
    if (!this.over) {
      this.turn = 'player';
    }
    return result;
  }

  // ─── LOG ────────────────────────────────────────────────────────────────

  addLog(message, type = 'info') {
    this.log.unshift({ message, type, id: Date.now() + Math.random() });
    if (this.log.length > 6) this.log.pop();
  }

  getRecentLog(n = 4) {
    return this.log.slice(0, n);
  }
}

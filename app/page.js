'use client';

import React, { useState, useEffect } from 'react';
import { Users, Crosshair, Heart, Zap, ChevronDown, ChevronUp, X } from 'lucide-react';

// Complete item data - T1: 800, T2: 1250, T3: 3000, T4: 6200
const itemData = {
  // ===== TIER 1: 800 SOULS - WEAPON =====
  "close_quarters": {
    name: "Close Quarters",
    image: "/items/close_quarters/800g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { meleeResist: 20 },
    passive: {
      weaponDamageConditional: 20,
      closeRangeBonus: 15,
      conditionLabel: "In Close Range"
    },
    upgradesTo: ["Point Blank"]
  },
  "extended_magazine": {
    name: "Extended Magazine",
    image: "/items/extended_magazine/800g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { ammo: 30, weaponDamage: 6 },
    upgradesTo: ["Titanic Magazine", "Escalating Resilience"]
  },
  "headshot_booster": {
    name: "Headshot Booster",
    image: "/items/headshot_booster/800g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { bonusHealth: 40 },
    passive: {
      headshotBonusDamage: 50,
      cooldown: 8,
      conditionLabel: "Next Headshot on Hero",
      description: "Your next headshot against an enemy Hero deals bonus weapon damage."
    },
    upgradesTo: ["Headhunter"]
  },
  "high_velocity_rounds": {
    name: "High-Velocity Rounds",
    image: "/items/high_velocity_rounds/800g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { bulletVelocity: 35, fireRate: 5 },
    upgradesTo: ["Express Shot", "Armor Piercing Rounds"]
  },
  "monster_rounds": {
    name: "Monster Rounds",
    image: "/items/monster_rounds/800g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { 
      weaponDamageVsNPCs: 25,
      bulletResistVsNPCs: 25,
      outOfCombatRegen: 1
    },
    upgradesTo: ["Cultist Sacrifice"]
  },
  "rapid_rounds": {
    name: "Rapid Rounds",
    image: "/items/rapid_rounds/800g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { fireRate: 10 },
    upgradesTo: ["Burst Fire", "Swift Striker"]
  },
  "restorative_shot": {
    name: "Restorative Shot",
    image: "/items/restorative_shot/800g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { weaponDamage: 6 },
    passive: {
      healOnBullet: 50,
      healOnBulletNPC: 15,
      cooldown: 6,
      description: "Your next bullet will heal you based on what target you hit."
    },
    upgradesTo: ["Medic Bullets"]
  },

  // ===== TIER 2: 1600 SOULS - WEAPON =====
  "active_reload": {
    name: "Active Reload",
    image: "/items/active_reload/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { maxAmmo: 20 },
    passive: {
      fireRateConditional: 25,
      bulletLifestealConditional: 18,
      duration: 7,
      cooldown: 12,
      conditionLabel: "Perfect Reload Timing",
      description: "While reloading, pressing Reload button during the highlighted portion will instantly finish your reload and give you Fire Rate, Bullet Lifesteal and Move Speed."
    }
  },
  "backstabber": {
    name: "Backstabber",
    image: "/items/backstabber/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { bonusHealth: 75, footstepSoundReduction: 50 },
    passive: {
      spiritDamagePerSecond: 17,
      bulletResistReduction: 6,
      moveSpeedConditional: 1.75,
      debuffDuration: 5,
      bonusRadius: 25,
      cooldown: 5,
      conditionLabel: "Attacking from Behind",
      description: "Attacking enemies from behind with your weapon or melee opens a wound dealing spirit damage over time and reducing their bullet resist. During this time, if you or any allies are near the target, will see them through walls and be given bonus move speed."
    }
  },
  "fleetfoot": {
    name: "Fleetfoot",
    image: "/items/fleetfoot/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { slideDistance: 35, bulletResist: 6 },
    passive: {
      description: "Removes the Move Speed penalty while shooting."
    },
    active: {
      moveSpeedConditional: 3.5,
      slowResist: 40,
      duration: 6,
      cooldown: 16,
      conditionLabel: "Fleetfoot Active",
      description: "Gain bonus Move Speed and Slow Resistance."
    }
  },
  "intensifying_magazine": {
    name: "Intensifying Magazine",
    image: "/items/intensifying_magazine/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { maxAmmo: 20 },
    passive: {
      weaponDamageConditional: 45,
      timeForMax: 3,
      conditionLabel: "Continuous Fire",
      description: "Increases Weapon Damage as you continuously fire your weapon."
    }
  },
  "kinetic_dash": {
    name: "Kinetic Dash",
    image: "/items/kinetic_dash/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { stamina: 1, staminaRecovery: 12 },
    passive: {
      fireRateConditional: 30,
      temporaryAmmoConditional: 8,
      duration: 7,
      cooldown: 7,
      conditionLabel: "After Dash Jump",
      description: "When you Dash Jump you gain Fire Rate and bonus Ammo until your next reload. Lasts up to 7s."
    },
    upgradesFrom: ["Extra Stamina"]
  },
  "long_range": {
    name: "Long Range",
    image: "/items/long_range/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { sprintSpeed: 1 },
    passive: {
      weaponDamageConditional: 40,
      minDistance: 15,
      conditionLabel: "Beyond Min Distance",
      description: "Deal additional Weapon Damage when beyond a minimum distance from your target."
    },
    upgradesTo: ["Sharpshooter"]
  },
  "melee_charge": {
    name: "Melee Charge",
    image: "/items/melee_charge/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { heavyMeleeDistance: 50, meleeDamage: 10, bulletResist: 6 },
    passive: {
      bonusHeavyMeleeConditional: 25,
      cooldown: 7,
      conditionLabel: "Next Heavy Melee",
      description: "Your next Heavy Melee attack against an enemy deals increased damage."
    },
    upgradesTo: ["Crushing Fists"]
  },
  "mystic_shot": {
    name: "Mystic Shot",
    image: "/items/mystic_shot/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { spiritPower: 7 },
    passive: {
      spiritDamagePerBullet: 60,
      spiritScaling: 0.65,
      cooldown: 8,
      description: "Your next bullet deals bonus Spirit Damage."
    },
    upgradesTo: ["Crackshot"]
  },
  "opening_rounds": {
    name: "Opening Rounds",
    image: "/items/opening_rounds/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { spiritPower: 7 },
    passive: {
      weaponDamageConditional: 40,
      healthThreshold: 50,
      conditionLabel: "Target Above 50% Health",
      description: "Your attacks have additional Weapon Damage against enemies above 50% health."
    },
    upgradesTo: ["Pristine Emblem"]
  },
  "slowing_bullets": {
    name: "Slowing Bullets",
    image: "/items/slowing_bullets/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { fireRate: 7 },
    passive: {
      moveSpeedReduction: 30,
      dashDistanceReduction: 20,
      debuffDuration: 3.5,
      buildUpPerShot: 0.77,
      description: "Your bullets build up a Movement Slow on enemies."
    },
    upgradesTo: ["Slowing Bullets"]
  },
  "spirit_shredder_bullets": {
    name: "Spirit Shredder Bullets",
    image: "/items/spirit_shredder_bullets/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { },
    passive: {
      spiritResistReduction: 8,
      spiritLifestealConditional: 8,
      debuffDuration: 8,
      conditionLabel: "Bullets Hit Enemy",
      description: "Your bullets apply a debuff that reduces the Spirit Resist of the target and grants you and your allies Spirit Lifesteal against them."
    },
    upgradesTo: ["Spirit Rend"]
  },
  "split_shot": {
    name: "Split Shot",
    image: "/items/split_shot/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { },
    active: {
      multishotCount: 5,
      weaponDamagePerStack: 10,
      maxStacks: 6,
      stackDuration: 12,
      buffDuration: 5,
      cooldown: 14,
      conditionLabel: "Multishot Active",
      description: "Make your weapon fire multishot. Hitting more than one Hero per attack will grant a stacking weapon damage bonus."
    },
    upgradesTo: ["Split Shot"]
  },
  "swift_striker": {
    name: "Swift Striker",
    image: "/items/swift_striker/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { fireRate: 20, sprintSpeed: 1 },
    upgradesFrom: ["Rapid Rounds"]
  },
  "titanic_magazine": {
    name: "Titanic Magazine",
    image: "/items/titanic_magazine/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { ammo: 90, weaponDamage: 12 },
    upgradesFrom: ["Extended Magazine"]
  },
  "weakening_headshot": {
    name: "Weakening Headshot",
    image: "/items/weakening_headshot/1600g.png",
    cost: 1600,
    tier: 2,
    category: "gun",
    stats: { bonusHealth: 75 },
    passive: {
      bulletResistReduction: 13,
      debuffDuration: 12,
      description: "Landing a Headshot on Heroes reduces their Bullet Resist."
    },
    upgradesTo: ["Crippling Headshot"]
  },

  // ===== TIER 1: 800 SOULS - SPIRIT =====
  "extra_charge": {
    name: "Extra Charge",
    image: "/items/extra_charge/800s.png",
    cost: 800,
    tier: 1,
    category: "spirit",
    stats: { bonusAbilityCharges: 1, spiritPowerForChargedAbilities: 7 },
    upgradesTo: ["Rapid Recharge"]
  },
  "extra_spirit": {
    name: "Extra Spirit",
    image: "/items/extra_spirit/800s.png",
    cost: 800,
    tier: 1,
    category: "spirit",
    stats: { spiritPower: 10 },
    upgradesTo: ["Improved Spirit", "Surge of Power"]
  },
  "mystic_burst": {
    name: "Mystic Burst",
    image: "/items/mystic_burst/800s.png",
    cost: 800,
    tier: 1,
    category: "spirit",
    stats: { },
    passive: {
      bonusDamageThreshold: 80,
      bonusDamage: 40,
      cooldown: 12,
      description: "Charges up over time with bonus spirit damage, causing abilities dealing more than 80 damage to deal additional damage."
    },
    upgradesTo: ["Tankbuster"]
  },
  "mystic_expansion": {
    name: "Mystic Expansion",
    image: "/items/mystic_expansion/800s.png",
    cost: 800,
    tier: 1,
    category: "spirit",
    stats: { abilityRange: 20 },
    description: "Imbue an ability to increase its range and effect radius.",
    upgradesTo: ["Greater Expansion"]
  },
  "rusted_barrel": {
    name: "Rusted Barrel",
    image: "/items/rusted_barrel/800s.png",
    cost: 800,
    tier: 1,
    category: "spirit",
    stats: { bonusHealth: 60, sprintSpeed: 0.5 },
    active: {
      description: "Target an enemy to reduce their Fire Rate and Bullet Resistance.",
      cooldown: 20,
      fireRateReduction: 35,
      bulletResistReduction: 6,
      duration: 5,
      castRange: 28
    },
    upgradesTo: ["Disarming Hex"]
  },
  "spirit_strike": {
    name: "Spirit Strike",
    image: "/items/spirit_strike/800s.png",
    cost: 800,
    tier: 1,
    category: "spirit",
    stats: { },
    passive: {
      meleeSpiritDamage: 40,
      spiritResistReduction: 6,
      duration: 6,
      cooldown: 8,
      description: "When you perform a Light or Heavy Melee attack against a hero, deal extra Spirit Damage with the attack and reduce the target's Spirit Resist. Cooldown is 2x longer for Light Melee hits."
    },
    upgradesTo: ["Spirit Snatch"]
  },

  // ===== TIER 2: 1600 SOULS - SPIRIT =====
  "arcane_surge": {
    name: "Arcane Surge",
    image: "/items/arcane_surge/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { stamina: 1, staminaRecovery: 12 },
    passive: {
      abilityRange: 15,
      abilityDuration: 15,
      spiritPowerConditional: 15,
      duration: 7,
      conditionLabel: "After Dash Jump",
      description: "When you Dash Jump the next ability you use will have bonus Range, Duration, and Spirit Power. Lasts up to 7s."
    },
    upgradesFrom: ["Extra Stamina"]
  },
  "bullet_resist_shredder": {
    name: "Bullet Resist Shredder",
    image: "/items/bullet_resist_shredder/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { bonusHealth: 90, bulletResist: 7 },
    passive: {
      bulletResistReduction: 13,
      duration: 8,
      conditionLabel: "Spirit Damage Reduces Bullet Resist",
      description: "Reduces Bullet Resist on enemies when you deal Spirit Damage."
    }
  },
  "cold_front": {
    name: "Cold Front",
    image: "/items/cold_front/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { spiritResist: 6 },
    active: {
      damage: 100,
      spiritScaling: 0.47,
      movementSlowConditional: 60,
      duration: 4,
      endRadius: 12,
      cooldown: 24,
      description: "Release an expanding ice blast that deals Spirit Damage and Slows targets it hits."
    },
    upgradesTo: ["Arctic Blast"]
  },
  "compress_cooldown": {
    name: "Compress Cooldown",
    image: "/items/compress_cooldown/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { },
    passive: {
      cooldownReduction: 22,
      description: "Imbue an ability to reduce its Cooldown."
    },
    upgradesTo: ["Superior Cooldown"]
  },
  "duration_extender": {
    name: "Duration Extender",
    image: "/items/duration_extender/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { },
    passive: {
      abilityDuration: 22,
      description: "Imbue an ability to increase its Duration."
    },
    upgradesTo: ["Superior Duration"]
  },
  "improved_spirit": {
    name: "Improved Spirit",
    image: "/items/improved_spirit/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { spiritPower: 18, outOfCombatRegen: 1.5 },
    upgradesFrom: ["Extra Spirit"],
    upgradesTo: ["Boundless Spirit"]
  },
  "mystic_slow": {
    name: "Mystic Slow",
    image: "/items/mystic_slow/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { bonusHealth: 50, sprintSpeed: 1 },
    passive: {
      movementSlowConditional: 30,
      duration: 2,
      conditionLabel: "Spirit Damage Slows",
      description: "When the target takes Spirit Damage, they have their Move Speed reduced."
    },
    upgradesTo: ["Lightning Scroll"]
  },
  "mystic_vulnerability": {
    name: "Mystic Vulnerability",
    image: "/items/mystic_vulnerability/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { spiritResist: 8 },
    passive: {
      spiritResistReduction: 8,
      duration: 6,
      conditionLabel: "Spirit Damage Reduces Spirit Resist",
      description: "When the target takes Spirit Damage, they have their Spirit Resist reduced."
    },
    upgradesTo: ["Escalating Exposure"]
  },
  "quicksilver_reload": {
    name: "Quicksilver Reload",
    image: "/items/quicksilver_reload/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { },
    passive: {
      bonusSpiritDamage: 55,
      fireRateBonus: 10,
      ammoReloaded: 100,
      chargeUpTime: 18,
      description: "Your imbued ability charges up over time with bonus spirit damage, bonus fire rate, and bonus bullets on use."
    },
    upgradesTo: ["Mercurial Magnum"]
  },
  "slowing_hex": {
    name: "Slowing Hex",
    image: "/items/slowing_hex/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { sprintSpeed: 0.5 },
    active: {
      moveSpeedReduction: 20,
      dashDistanceReduction: 30,
      castRange: 25,
      duration: 3.5,
      cooldown: 30,
      description: "Slows movement of enemy target. Also Silences their movement-based items and abilities. Does not affect target's stamina usage."
    },
    upgradesTo: ["Vortex Web"]
  },
  "spirit_sap": {
    name: "Spirit Sap",
    image: "/items/spirit_sap/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { bonusHealth: 75 },
    active: {
      spiritResistReduction: 12,
      spiritPowerReduction: 24,
      castRange: 40,
      duration: 12,
      cooldown: 30,
      description: "Target an enemy to reduce their Spirit Resist and Spirit Power."
    },
    upgradesTo: ["Silence Wave"]
  },
  "suppressor": {
    name: "Suppressor",
    image: "/items/suppressor/1600s.png",
    cost: 1600,
    tier: 2,
    category: "spirit",
    stats: { spiritPower: 6, bonusHealth: 75 },
    passive: {
      fireRateReduction: 30,
      duration: 4,
      conditionLabel: "Spirit Damage Reduces Fire Rate",
      description: "When you deal Spirit Damage to enemies, you also reduce their Fire Rate."
    }
  },

  // ===== TIER 1: 800 SOULS - VITALITY =====
  "extra_health": {
    name: "Extra Health",
    image: "/items/extra_health/800v.png",
    cost: 800,
    tier: 1,
    category: "vitality",
    stats: { bonusHealth: 175 },
    upgradesTo: ["Fortitude", "Colossus"]
  },
  "extra_regen": {
    name: "Extra Regen",
    image: "/items/extra_regen/800v.png",
    cost: 800,
    tier: 1,
    category: "vitality",
    stats: { healthRegen: 3 },
    upgradesTo: ["Healing Booster"]
  },
  "extra_stamina": {
    name: "Extra Stamina",
    image: "/items/extra_stamina/800v.png",
    cost: 800,
    tier: 1,
    category: "vitality",
    stats: { stamina: 1, staminaRecovery: 12 },
    upgradesTo: ["Stamina Mastery", "Kinetic Dash", "Arcane Surge"]
  },
  "healing_rite": {
    name: "Healing Rite",
    image: "/items/healing_rite/800v.png",
    cost: 800,
    tier: 1,
    category: "vitality",
    stats: { },
    active: {
      description: "Grant Regen and Sprint Speed to the target. Heals 300 HP and gives +0.93 Spirit Power over 17s. Gets dispelled if you take damage from enemy players or objectives. Can be self-cast.",
      cooldown: 70,
      healAmount: 300,
      spiritPowerBonus: 0.93,
      duration: 17
    },
    passive: {
      sprintSpeedConditional: 2,
      conditionLabel: "During Healing Rite"
    },
    upgradesTo: ["Rescue Beam", "Healing Nova"]
  },
  "melee_lifesteal": {
    name: "Melee Lifesteal",
    image: "/items/melee_lifesteal/800v.png",
    cost: 800,
    tier: 1,
    category: "vitality",
    stats: { meleeDamage: 12 },
    passive: {
      meleeHeal: 100,
      cooldown: 8,
      description: "Your next Melee attack heals you. This heal is 30% effective vs non-heroes. Cooldown is 2x as long for Light Melee hits."
    },
    upgradesTo: ["Lifestrike"]
  },
  "rebuttal": {
    name: "Rebuttal",
    image: "/items/rebuttal/800v.png",
    cost: 800,
    tier: 1,
    category: "vitality",
    stats: { bonusHealth: 75 },
    passive: {
      parryDuration: 2,
      parryCooldown: 6,
      bonusDamageConditional: 30,
      buffDuration: 6,
      conditionLabel: "After successful Parry"
    },
    description: "On a successful Parry against an enemy Hero, Heal yourself for the damage parried and gain increased damage.",
    upgradesTo: ["Melee Charge", "Melee Rebuttal"]
  },
  "sprint_boots": {
    name: "Sprint Boots",
    image: "/items/sprint_boots/800v.png",
    cost: 800,
    tier: 1,
    category: "vitality",
    stats: { sprintSpeed: 2, outOfCombatRegen: 2 },
    upgradesTo: ["Trophy Collector", "Enduring Speed"]
  }
};

// Character data
const characterData = {
  abrams: {
    name: "Abrams",
    portrait: "/characters/Abrams/portrait.png",
    abilities: [
      {
        name: "Siphon Life",
        image: "/characters/Abrams/1.png",
        description: "Drain health from nearby enemies in front of you, dealing spirit damage over time and healing for a portion of the damage dealt.",
        baseDamage: 32,
        spiritScaling: 0.0465,
        damageType: "spirit",
        stats: {
          dps: 32,
          duration: 4,
          cooldown: 42,
          range: 10,
          lifesteal: 0.6,
          lifestealVsNonHeroes: 0.3
        },
        upgrades: [
          { name: "-19s Cooldown", points: 1 },
          { name: "+2s Duration", points: 2 },
          { name: "+38 Damage Per Second", points: 5 }
        ]
      },
      {
        name: "Shoulder Charge",
        image: "/characters/Abrams/2.png",
        description: "Charge forward, pulling enemies you hit. Pushing a hero into a wall applies stun.",
        baseDamage: 37,
        spiritScaling: 1.95,
        damageType: "spirit",
        stats: {
          damage: 37,
          chargeTime: 1.4,
          cooldown: 37
        },
        upgrades: [
          { 
            name: "On Hero Collide: +25% Weapon Damage for 8s", 
            points: 1,
            conditionalDamage: {
              label: "After Shoulder Charge Hit",
              weaponDamageMultiplier: 1.25,
              duration: 8,
              appliesTo: ["gun"]
            }
          },
          { name: "On Wall Hit: +0.45s Stun Duration", points: 2 },
          { name: "-22s Cooldown", points: 5 }
        ]
      },
      {
        name: "Infernal Resilience",
        image: "/characters/Abrams/3.png",
        description: "Gain bonus defensive attributes. Taking damage grants temporary regeneration for a portion of the damage taken.",
        baseDamage: 0,
        spiritScaling: 0,
        damageType: "passive",
        stats: {
          damageRegenPercent: 13,
          regenTime: 20,
          flatRegen: 1
        },
        upgrades: [
          { name: "+1.5 Health Regen", points: 1 },
          { name: "+150 Max Health", points: 2 },
          { name: "+7% Damage Regenerated", points: 5 }
        ]
      },
      {
        name: "Seismic Impact",
        image: "/characters/Abrams/4.png",
        description: "Leap high into the air before crashing into the ground, dealing spirit damage and applying stun.",
        baseDamage: 55,
        spiritScaling: 2.33,
        damageType: "spirit",
        stats: {
          damage: 55,
          radius: 10.5,
          stun: 1.5,
          cooldown: 185
        },
        upgrades: [
          { name: "-35s Cooldown", points: 1 },
          { name: "On Hero Hit: +100 Max HP and +15% Fire Rate", points: 2 },
          { name: "On cast, become Unstoppable", points: 5 }
        ]
      }
    ],
    stats: {
      weapon: {
        dps: 72,
        bulletDamage: 1.9,
        ammo: 10,
        bulletsPerSec: 4.76,
        reloadTime: 2.5,
        bulletVelocity: 318,
        lightMelee: 63,
        heavyMelee: 116,
        falloffRangeStart: 20,
        falloffRangeEnd: 58,
        maxRange: 20
      },
      vitality: {
        maxHealth: 650,
        healthRegen: 2,
        bulletResist: 0,
        spiritResist: 0,
        moveSpeed: 7.29,
        sprintSpeed: 2.0,
        stamina: 3,
        staminaCooldown: 5
      },
      spirit: {
        spiritPower: 0,
        abilityCooldown: 0,
        abilityDuration: 0,
        abilityRange: 0,
        spiritLifesteal: 0,
        maxChargesIncrease: 0,
        chargeCooldown: 0
      }
    }
  }
};

export default function DeadlockBuildMaker() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedItems, setSelectedItems] = useState(Array(12).fill(null));
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [hoverTimer, setHoverTimer] = useState(null);
  const [abilityUpgrades, setAbilityUpgrades] = useState({});
  const [expandedAbilities, setExpandedAbilities] = useState({ 0: true, 1: true, 2: true, 3: true });
  const [itemSelectorOpen, setItemSelectorOpen] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('gun');
  const [selectedTier, setSelectedTier] = useState(1);
  const [damageModifiers, setDamageModifiers] = useState({});

  const addItemToSlot = (itemKey, slotIndex) => {
    const newItems = [...selectedItems];
    newItems[slotIndex] = itemKey;
    setSelectedItems(newItems);
    setItemSelectorOpen(false);
    setSelectedSlotIndex(null);
  };

  const removeItem = (index) => {
    const newItems = [...selectedItems];
    newItems[index] = null;
    setSelectedItems(newItems);
  };

  const openItemSelector = (index) => {
    setSelectedSlotIndex(index);
    setItemSelectorOpen(true);
  };

  const handleItemHover = (item, event) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    
    const rect = event.currentTarget.getBoundingClientRect();
    const timer = setTimeout(() => {
      setHoveredItem(item);
      // Position to the right of item, or left if too close to edge
      const spaceOnRight = window.innerWidth - rect.right;
      setTooltipPosition({
        x: spaceOnRight > 420 ? rect.right + 10 : rect.left - 410,
        y: Math.max(10, Math.min(rect.top, window.innerHeight - 600))
      });
    }, 350);
    setHoverTimer(timer);
  };

  const handleItemLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    setHoveredItem(null);
  };

  const getSoulInvestment = () => {
    const investment = { gun: 0, vitality: 0, spirit: 0 };
    selectedItems.forEach(itemKey => {
      if (itemKey) {
        const item = itemData[itemKey];
        investment[item.category] += item.cost;
      }
    });
    return investment;
  };

  const getSoulScalingBonus = (souls) => {
    const tiers = [
      { souls: 0, weapon: 0, health: 0, spirit: 0 },
      { souls: 800, weapon: 7, health: 8, spirit: 7 },
      { souls: 1600, weapon: 9, health: 10, spirit: 11 },
      { souls: 2400, weapon: 13, health: 13, spirit: 15 },
      { souls: 3200, weapon: 20, health: 17, spirit: 19 },
      { souls: 4800, weapon: 29, health: 22, spirit: 25 },
      { souls: 7200, weapon: 40, health: 27, spirit: 32 },
      { souls: 9600, weapon: 58, health: 32, spirit: 44 },
      { souls: 16000, weapon: 72, health: 36, spirit: 56 },
      { souls: 22400, weapon: 83, health: 40, spirit: 69 },
      { souls: 28800, weapon: 93, health: 44, spirit: 81 }
    ];
    
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (souls >= tiers[i].souls) {
        return tiers[i];
      }
    }
    return tiers[0];
  };

  const getTotalSpiritPower = () => {
    const soulInvestment = getSoulInvestment();
    const spiritScaling = getSoulScalingBonus(soulInvestment.spirit);
    
    let spiritPower = spiritScaling.spirit;
    selectedItems.forEach(itemKey => {
      if (itemKey && itemData[itemKey].stats?.spiritPower) {
        spiritPower += itemData[itemKey].stats.spiritPower;
      }
    });
    return spiritPower;
  };

  const getWeaponDamageBonus = () => {
    const soulInvestment = getSoulInvestment();
    const weaponScaling = getSoulScalingBonus(soulInvestment.gun);
    return weaponScaling.weapon;
  };

  const getHealthBonus = () => {
    const soulInvestment = getSoulInvestment();
    const healthScaling = getSoulScalingBonus(soulInvestment.vitality);
    return healthScaling.health;
  };

  const calculateAbilityDamage = (ability, modifiers = {}) => {
    if (!ability.baseDamage) return null;
    const spiritPower = getTotalSpiritPower();
    let damage = ability.baseDamage;
    
    if (ability.spiritScaling > 0) {
      damage = damage * (1 + (spiritPower * ability.spiritScaling / 100));
    }
    
    // Apply damage modifiers
    Object.values(modifiers).forEach(mod => {
      if (mod.active) {
        damage = damage * (1 + mod.value / 100);
      }
    });
    
    return damage.toFixed(1);
  };

  const getTotalSouls = () => {
    return selectedItems.reduce((sum, itemKey) => {
      return sum + (itemKey ? itemData[itemKey].cost : 0);
    }, 0);
  };

  const toggleAbilityUpgrade = (abilityIndex, upgradeIndex) => {
    const key = `${abilityIndex}-${upgradeIndex}`;
    const newUpgrades = { ...abilityUpgrades };
    
    if (!newUpgrades[key]) {
      for (let i = 0; i <= upgradeIndex; i++) {
        const autoKey = `${abilityIndex}-${i}`;
        newUpgrades[autoKey] = true;
      }
    } else {
      for (let i = upgradeIndex; i < 3; i++) {
        const subsequentKey = `${abilityIndex}-${i}`;
        newUpgrades[subsequentKey] = false;
      }
    }
    
    setAbilityUpgrades(newUpgrades);
  };

  const getTotalAbilityPoints = () => {
    let total = 0;
    Object.keys(abilityUpgrades).forEach(key => {
      if (abilityUpgrades[key]) {
        const [abilityIndex, upgradeIndex] = key.split('-').map(Number);
        const char = characterData[selectedCharacter];
        total += char.abilities[abilityIndex].upgrades[upgradeIndex].points;
      }
    });
    return total;
  };

  const CharacterGrid = () => (
    <div className="p-8">
      <div className="bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-xl p-4 mb-0.5">
        <h1 className="text-4xl font-bold text-center text-white tracking-wide">Heroes</h1>
      </div>
      <div className="bg-zinc-800 rounded-b-xl p-6">
        <div className="grid grid-cols-6 gap-3">
          {Object.entries(characterData).map(([key, char]) => (
            <button
              key={key}
              onClick={() => setSelectedCharacter(key)}
              className="relative group overflow-hidden rounded-lg border-4 border-zinc-700 hover:border-amber-500 transition-all duration-300 aspect-square"
              style={{
                backgroundImage: `url(${char.portrait})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-900"></div>
              <div className="relative h-full flex items-end justify-center p-2">
                <span className="text-white font-bold text-lg uppercase tracking-wider drop-shadow-lg">
                  {char.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const ItemSelector = () => {
    if (!itemSelectorOpen) return null;

    // Organize items by category and tier
    const organizedItems = {
      gun: { 1: [], 2: [], 3: [], 4: [] },
      vitality: { 1: [], 2: [], 3: [], 4: [] },
      spirit: { 1: [], 2: [], 3: [], 4: [] }
    };

    Object.entries(itemData).forEach(([key, item]) => {
      organizedItems[item.category][item.tier].push({ key, ...item });
    });

    const categoryConfig = {
      gun: { 
        label: 'Weapon',
        bg: 'bg-amber-600',
        activeBg: 'bg-amber-700',
        itemBg: 'bg-amber-800',
        border: 'border-amber-400',
        text: 'text-amber-300'
      },
      vitality: { 
        label: 'Vitality',
        bg: 'bg-green-600',
        activeBg: 'bg-green-700',
        itemBg: 'bg-green-700',
        border: 'border-green-400',
        text: 'text-green-300'
      },
      spirit: { 
        label: 'Spirit',
        bg: 'bg-purple-600',
        activeBg: 'bg-purple-700',
        itemBg: 'bg-purple-700',
        border: 'border-purple-400',
        text: 'text-purple-300'
      }
    };

    const currentItems = organizedItems[selectedCategory][selectedTier];
    const config = categoryConfig[selectedCategory];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="bg-zinc-900 rounded-xl w-full max-w-6xl h-[85vh] flex flex-col">
          {/* Header */}
          <div className="bg-zinc-800 p-4 rounded-t-xl flex justify-between items-center border-b-2 border-zinc-700">
            <h2 className="text-2xl font-bold text-white">Select Item - Slot {(selectedSlotIndex || 0) + 1}</h2>
            <button
              onClick={() => {
                setItemSelectorOpen(false);
                setSelectedSlotIndex(null);
                setHoveredItem(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 font-semibold transition-colors"
            >
              Close
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 p-4 bg-zinc-800">
            {['gun', 'vitality', 'spirit'].map(cat => {
              const catConfig = categoryConfig[cat];
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                    isActive ? catConfig.activeBg : catConfig.bg
                  } ${isActive ? 'ring-4 ring-white' : ''} text-white hover:opacity-90`}
                >
                  {catConfig.label}
                </button>
              );
            })}
          </div>

          {/* Tier Tabs */}
          <div className="flex gap-2 px-4 pb-4 bg-zinc-800">
            {[1, 2, 3, 4].map(tier => {
              const tierCosts = { 1: 800, 2: 1600, 3: 3000, 4: 6200 };
              const isActive = selectedTier === tier;
              const hasItems = organizedItems[selectedCategory][tier].length > 0;
              
              return (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  disabled={!hasItems}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    isActive ? config.activeBg : 'bg-zinc-700'
                  } ${isActive ? 'ring-2 ring-white' : ''} ${
                    hasItems ? 'text-white hover:opacity-90' : 'text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Tier {tier} - ${tierCosts[tier]}
                </button>
              );
            })}
          </div>

          {/* Items Grid */}
          <div className="flex-1 bg-zinc-900 p-6 overflow-y-auto">
            {currentItems.length === 0 ? (
              <div className="text-center text-gray-400 text-xl mt-20">
                No items available in this tier
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4">
                {currentItems.map((item) => (
                  <button
                    key={item.key}
                    onMouseEnter={(e) => handleItemHover(item, e)}
                    onMouseLeave={handleItemLeave}
                    onClick={() => addItemToSlot(item.key, selectedSlotIndex)}
                    className={`${config.itemBg} border-2 ${config.border} rounded-lg p-4 hover:scale-105 transition-transform`}
                  >
                    <div className="text-white font-bold text-sm mb-2 min-h-[40px] flex items-center justify-center text-center">
                      {item.name}
                    </div>
                    <div className="text-green-400 font-bold text-xs text-center">
                      ${item.cost}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredItem && <ItemTooltip item={hoveredItem} position={tooltipPosition} />}
      </div>
    );
  };

  const ItemSlotGrid = () => {
    return (
      <div className="bg-zinc-800 rounded-xl p-4">
        <h3 className="text-xl font-bold text-white mb-4">Items ({selectedItems.filter(i => i).length}/12)</h3>
        <div className="grid grid-cols-6 gap-3 mb-4">
          {selectedItems.map((itemKey, index) => (
            <div
              key={index}
              className="relative aspect-square bg-zinc-700 rounded-lg border-2 border-zinc-600 hover:border-amber-500 transition-all"
            >
              {itemKey ? (
                <>
                  <button
                    onClick={() => removeItem(index)}
                    className="absolute top-1 right-1 bg-red-600 rounded-full p-0.5 hover:bg-red-700 z-10"
                  >
                    <X size={14} />
                  </button>
                  <button
                    onClick={() => openItemSelector(index)}
                    className="w-full h-full p-2 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-xs text-white font-semibold mb-1">
                        {itemData[itemKey].name}
                      </div>
                      <div className="text-xs text-green-400">
                        ${itemData[itemKey].cost}
                      </div>
                    </div>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => openItemSelector(index)}
                  className="w-full h-full flex items-center justify-center"
                >
                  <span className="text-zinc-500 text-sm">+</span>
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-zinc-700 rounded-lg p-3">
          <div className="text-white font-bold mb-2">Soul Investment</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-red-400">Gun:</span>
              <span className="text-white">{getSoulInvestment().gun} <span className="text-green-400 ml-1">+{getWeaponDamageBonus()}%</span></span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-400">Vitality:</span>
              <span className="text-white">{getSoulInvestment().vitality} <span className="text-green-400 ml-1">+{getHealthBonus()}%</span></span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-400">Spirit:</span>
              <span className="text-white">{getSoulInvestment().spirit} <span className="text-purple-400 ml-1">+{getSoulScalingBonus(getSoulInvestment().spirit).spirit}</span></span>
            </div>
            <div className="flex justify-between border-t border-zinc-600 pt-1 mt-2">
              <span className="text-amber-400 font-bold">Total Souls:</span>
              <span className="text-white font-bold">{getTotalSouls()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ItemTooltip = ({ item, position }) => {
    if (!item || !position) return null;
    
    const tooltipColors = {
      gun: { header: 'bg-amber-500', border: 'border-amber-400', gradient: 'from-amber-600 to-amber-700' },
      vitality: { header: 'bg-green-500', border: 'border-green-400', gradient: 'from-green-600 to-green-700' },
      spirit: { header: 'bg-purple-500', border: 'border-purple-400', gradient: 'from-purple-600 to-purple-700' }
    };
    
    const colors = tooltipColors[item.category];
    
    return (
      <div 
        className={`fixed w-96 bg-gradient-to-b ${colors.gradient} rounded-lg shadow-2xl border-4 ${colors.border} z-[70] pointer-events-none`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      >
        <div className={`${colors.header} p-3 rounded-t-lg`}>
          <h3 className="text-white font-bold text-xl">{item.name}</h3>
        </div>
        <div className="p-4 bg-zinc-800 rounded-b-lg max-h-[500px] overflow-y-auto">
          <div className="flex justify-between mb-3">
            <span className="text-white">Cost</span>
            <span className="text-green-400 font-bold">${item.cost}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-white">Tier</span>
            <span className="text-white font-bold">{item.tier}</span>
          </div>
          {item.stats && Object.keys(item.stats).length > 0 && (
            <div className="space-y-1 mb-3">
              {Object.entries(item.stats).map(([stat, value]) => (
                <div key={stat} className="text-amber-300 text-sm">
                  +{value} {stat.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              ))}
            </div>
          )}
          {item.passive && (
            <div className="mb-3">
              <div className="text-amber-400 font-semibold italic mb-1">Passive</div>
              {typeof item.passive === 'string' ? (
                <div className="text-gray-300 text-sm">{item.passive}</div>
              ) : (
                <div className="text-gray-300 text-sm">{item.passive.description || 'Passive effect'}</div>
              )}
            </div>
          )}
          {item.active && (
            <div className="mb-3">
              <div className="text-amber-400 font-semibold italic mb-1">Active</div>
              {typeof item.active === 'string' ? (
                <div className="text-gray-300 text-sm">{item.active}</div>
              ) : (
                <>
                  <div className="text-gray-300 text-sm">{item.active.description}</div>
                  {item.active.cooldown && (
                    <div className="text-gray-400 text-xs mt-1">Cooldown: {item.active.cooldown}s</div>
                  )}
                </>
              )}
            </div>
          )}
          {item.description && (
            <div className="mb-3">
              <div className="text-gray-300 text-sm">{item.description}</div>
            </div>
          )}
          {item.upgradesTo && item.upgradesTo.length > 0 && (
            <div className="border-t border-zinc-700 pt-3">
              <div className="text-white font-semibold mb-1">UPGRADES TO:</div>
              {item.upgradesTo.map((upgrade, idx) => (
                <div key={idx} className="text-amber-400 text-sm">{upgrade}</div>
              ))}
            </div>
          )}
          {item.upgradesFrom && item.upgradesFrom.length > 0 && (
            <div className="border-t border-zinc-700 pt-3 mt-3">
              <div className="text-white font-semibold mb-1">UPGRADES FROM:</div>
              {item.upgradesFrom.map((upgrade, idx) => (
                <div key={idx} className="text-amber-400 text-sm">{upgrade}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ItemTooltipContent = ({ item }) => {
    return null; // Removed, using hover tooltip now
  };

  const AbilityPanel = ({ ability, index, characterKey }) => {
    const isExpanded = expandedAbilities[index];
    const scaledDamage = calculateAbilityDamage(ability, damageModifiers);
    
    return (
      <div className="bg-zinc-700 rounded-lg overflow-hidden flex flex-col h-full">
        <button
          onClick={() => setExpandedAbilities(prev => ({ ...prev, [index]: !prev[index] }))}
          className="w-full p-3 flex flex-col items-center hover:bg-zinc-600 transition-all"
        >
          <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden mb-2">
            <img src={ability.image} alt={ability.name} className="w-full h-full object-contain" />
          </div>
          <div className="text-center w-full">
            <div className="text-white font-bold text-sm">{ability.name}</div>
            {scaledDamage && (
              <div className="text-amber-400 text-xs font-semibold mt-1">
                {scaledDamage} Damage
              </div>
            )}
          </div>
          <div className="mt-2">
            {isExpanded ? <ChevronUp className="text-white" size={16} /> : <ChevronDown className="text-white" size={16} />}
          </div>
        </button>
        
        <div className="flex-grow flex flex-col justify-end">
          {isExpanded && (
            <div className="p-3 bg-zinc-800">
              <div className="text-gray-400 text-xs mb-2">{ability.description}</div>
              
              {scaledDamage && (
                <div className="bg-zinc-700 rounded-lg p-2 mb-2">
                  <div className="text-purple-400 font-semibold text-xs mb-1">Spirit Scaling</div>
                  <div className="text-xs text-gray-300">
                    Base: <span className="text-white font-bold">{ability.baseDamage}</span>
                  </div>
                  <div className="text-xs text-gray-300">
                    Spirit: <span className="text-purple-400 font-bold">{getTotalSpiritPower()}</span> × {ability.spiritScaling}
                  </div>
                  <div className="text-xs text-amber-400 font-bold mt-1">
                    Total: {scaledDamage}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                {Object.entries(ability.stats).map(([stat, value]) => (
                  <div key={stat} className="flex justify-between">
                    <span className="text-gray-400 text-xs capitalize">{stat.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-white font-semibold text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-3 bg-zinc-900 space-y-1 mt-auto">
            <div className="text-purple-400 font-semibold text-xs mb-1">Upgrades</div>
            {ability.upgrades.map((upgrade, upgradeIndex) => {
              const upgradeKey = `${index}-${upgradeIndex}`;
              const isActive = abilityUpgrades[upgradeKey];
              
              return (
                <button
                  key={upgradeIndex}
                  onClick={() => toggleAbilityUpgrade(index, upgradeIndex)}
                  className={`w-full p-1.5 rounded flex justify-between items-center transition-all text-xs ${
                    isActive 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-zinc-700 hover:bg-zinc-600'
                  }`}
                >
                  <span className="text-white truncate pr-1">{upgrade.name}</span>
                  <span className={`font-bold whitespace-nowrap ${isActive ? 'text-green-300' : 'text-amber-400'}`}>
                    {upgrade.points}pt
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const DamageCalculator = ({ characterKey }) => {
    const char = characterData[characterKey];
    const weaponBonus = getWeaponDamageBonus();
    
    // Collect all conditional stat modifiers
    const conditionalModifiers = [];
    
    // Check items for conditional effects
    selectedItems.forEach((itemKey, idx) => {
      if (!itemKey) return;
      const item = itemData[itemKey];
      
      // Check for conditional damage in item
      if (item.conditionalDamage) {
        conditionalModifiers.push({
          id: `item_${idx}`,
          label: `${item.name}: ${item.conditionalDamage.label}`,
          ...item.conditionalDamage
        });
      }
      
      // Check for conditional passive effects
      if (item.passive && item.passive.conditionLabel) {
        conditionalModifiers.push({
          id: `item_passive_${idx}`,
          label: `${item.name}: ${item.passive.conditionLabel}`,
          type: 'passive',
          itemKey: itemKey,
          ...item.passive
        });
      }
    });
    
    // Check ability upgrades for conditional damage
    char.abilities.forEach((ability, abilityIdx) => {
      ability.upgrades.forEach((upgrade, upgradeIdx) => {
        const upgradeKey = `${abilityIdx}-${upgradeIdx}`;
        if (abilityUpgrades[upgradeKey] && upgrade.conditionalDamage) {
          conditionalModifiers.push({
            id: `ability_${abilityIdx}_${upgradeIdx}`,
            label: `${ability.name}: ${upgrade.conditionalDamage.label}`,
            ...upgrade.conditionalDamage
          });
        }
      });
    });
    
    // Calculate stats with active modifiers
    const calculateModifiedStats = () => {
      const baseGunDamage = char.stats.weapon.bulletDamage * (1 + weaponBonus / 100);
      let modifiedGunDamage = baseGunDamage;
      let bonusDamage = 0;
      let sprintSpeed = char.stats.vitality.sprintSpeed;
      
      conditionalModifiers.forEach(mod => {
        if (!damageModifiers[mod.id]?.active) return;
        
        // Apply weapon damage modifiers
        if (mod.weaponDamageBonus) {
          modifiedGunDamage += mod.weaponDamageBonus;
        }
        if (mod.weaponDamageMultiplier) {
          modifiedGunDamage *= mod.weaponDamageMultiplier;
        }
        
        // Apply bonus damage
        if (mod.bonusDamageConditional) {
          bonusDamage += mod.bonusDamageConditional;
        }
        
        // Apply sprint speed modifiers
        if (mod.sprintSpeedConditional) {
          sprintSpeed += mod.sprintSpeedConditional;
        }
      });
      
      return {
        baseGunDamage,
        modifiedGunDamage,
        bonusDamage,
        sprintSpeed
      };
    };
    
    const stats = calculateModifiedStats();
    
    return (
      <div className="bg-zinc-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Adjusted Stats</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-3">Conditional Modifiers</h3>
            {conditionalModifiers.length === 0 ? (
              <p className="text-gray-400 text-sm">No conditional modifiers available</p>
            ) : (
              <div className="space-y-2">
                {conditionalModifiers.map((mod) => {
                  let effectDescription = '';
                  
                  if (mod.weaponDamageBonus) {
                    effectDescription = `+${mod.weaponDamageBonus} Weapon Damage`;
                  }
                  if (mod.weaponDamageMultiplier) {
                    effectDescription = `+${((mod.weaponDamageMultiplier - 1) * 100).toFixed(0)}% Weapon Damage`;
                  }
                  if (mod.bonusDamageConditional) {
                    effectDescription = `+${mod.bonusDamageConditional}% Bonus Damage`;
                  }
                  if (mod.sprintSpeedConditional) {
                    effectDescription = `+${mod.sprintSpeedConditional}m/s Sprint Speed`;
                  }
                  
                  return (
                    <label key={mod.id} className="flex items-start gap-2 cursor-pointer p-2 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors">
                      <input
                        type="checkbox"
                        checked={damageModifiers[mod.id]?.active || false}
                        onChange={(e) => {
                          setDamageModifiers(prev => ({
                            ...prev,
                            [mod.id]: {
                              active: e.target.checked,
                              ...mod
                            }
                          }));
                        }}
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <span className="text-white text-sm block">{mod.label}</span>
                        <span className="text-green-400 text-xs">
                          {effectDescription}
                        </span>
                        {mod.duration && (
                          <span className="text-gray-400 text-xs ml-1">({mod.duration}s)</span>
                        )}
                        {mod.buffDuration && (
                          <span className="text-gray-400 text-xs ml-1">({mod.buffDuration}s buff)</span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-3">Modified Stats</h3>
            <div className="space-y-3">
              <div className="bg-zinc-700 rounded-lg p-3">
                <div className="text-red-400 font-semibold mb-2">Gun Damage</div>
                <div className="text-white text-sm">
                  Base: {stats.baseGunDamage.toFixed(2)}
                </div>
                {stats.modifiedGunDamage !== stats.baseGunDamage && (
                  <div className="text-green-400 text-sm font-bold mt-1">
                    With Modifiers: {stats.modifiedGunDamage.toFixed(2)}
                  </div>
                )}
              </div>
              
              {stats.bonusDamage > 0 && (
                <div className="bg-zinc-700 rounded-lg p-3">
                  <div className="text-orange-400 font-semibold mb-2">Bonus Damage</div>
                  <div className="text-green-400 text-sm font-bold">
                    +{stats.bonusDamage}%
                  </div>
                </div>
              )}
              
              {stats.sprintSpeed !== char.stats.vitality.sprintSpeed && (
                <div className="bg-zinc-700 rounded-lg p-3">
                  <div className="text-blue-400 font-semibold mb-2">Sprint Speed</div>
                  <div className="text-white text-sm">
                    Base: {char.stats.vitality.sprintSpeed}m/s
                  </div>
                  <div className="text-green-400 text-sm font-bold mt-1">
                    With Modifiers: {stats.sprintSpeed.toFixed(1)}m/s
                  </div>
                </div>
              )}
              
              {char.abilities.map((ability, idx) => {
                const damage = calculateAbilityDamage(ability);
                if (!damage) return null;
                
                return (
                  <div key={idx} className="bg-zinc-700 rounded-lg p-3">
                    <div className="text-purple-400 font-semibold mb-1 text-sm">{ability.name}</div>
                    <div className="text-white text-sm">
                      Damage: {damage}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CharacterStats = ({ characterKey }) => {
    const char = characterData[characterKey];
    const ws = char.stats.weapon;
    const vs = char.stats.vitality;
    
    const weaponBonus = getWeaponDamageBonus();
    const healthBonus = getHealthBonus();
    const spiritPower = getTotalSpiritPower();
    
    const scaledBulletDamage = (ws.bulletDamage * (1 + weaponBonus / 100)).toFixed(2);
    const scaledDPS = (ws.dps * (1 + weaponBonus / 100)).toFixed(1);
    const scaledLightMelee = (ws.lightMelee * (1 + weaponBonus / 100)).toFixed(0);
    const scaledHeavyMelee = (ws.heavyMelee * (1 + weaponBonus / 100)).toFixed(0);
    const scaledMaxHealth = (vs.maxHealth * (1 + healthBonus / 100)).toFixed(0);

    return (
      <div className="min-h-screen bg-zinc-900 p-8">
        <button
          onClick={() => setSelectedCharacter(null)}
          className="mb-6 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
        >
          ← Back to Heroes
        </button>

        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-zinc-800 rounded-xl p-6">
            <h1 className="text-4xl font-bold text-amber-500 mb-2">{char.name}</h1>
            <div className="text-purple-400 text-lg font-semibold">
              Ability Points Used: {getTotalAbilityPoints()}
            </div>
          </div>

          <ItemSlotGrid />

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Crosshair className="text-red-500" size={24} />
                <h2 className="text-2xl font-bold text-white">Weapon Stats</h2>
                {weaponBonus > 0 && (
                  <span className="text-green-400 font-bold text-sm">+{weaponBonus}%</span>
                )}
              </div>
              <div className="space-y-2">
                <StatRow label="DPS" value={scaledDPS} bonus={weaponBonus > 0 ? `(${ws.dps})` : null} />
                <StatRow label="Bullet Damage" value={scaledBulletDamage} bonus={weaponBonus > 0 ? `(${ws.bulletDamage})` : null} />
                <StatRow label="Ammo" value={ws.ammo} />
                <StatRow label="Bullets/sec" value={ws.bulletsPerSec} />
                <StatRow label="Reload Time" value={`${ws.reloadTime}s`} />
                <StatRow label="Light Melee" value={scaledLightMelee} bonus={weaponBonus > 0 ? `(${ws.lightMelee})` : null} />
                <StatRow label="Heavy Melee" value={scaledHeavyMelee} bonus={weaponBonus > 0 ? `(${ws.heavyMelee})` : null} />
              </div>
            </div>

            <div className="bg-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-green-500" size={24} />
                <h2 className="text-2xl font-bold text-white">Vitality Stats</h2>
                {healthBonus > 0 && (
                  <span className="text-green-400 font-bold text-sm">+{healthBonus}%</span>
                )}
              </div>
              <div className="space-y-2">
                <StatRow label="Max Health" value={scaledMaxHealth} bonus={healthBonus > 0 ? `(${vs.maxHealth})` : null} />
                <StatRow label="Health Regen" value={vs.healthRegen} />
                <StatRow label="Bullet Resist" value={`${vs.bulletResist}%`} />
                <StatRow label="Spirit Resist" value={`${vs.spiritResist}%`} />
                <StatRow label="Move Speed" value={`${vs.moveSpeed}m/s`} />
                <StatRow label="Sprint Speed" value={`${vs.sprintSpeed}m/s`} />
                <StatRow label="Stamina" value={vs.stamina} />
              </div>
            </div>

            <div className="bg-zinc-800 rounded-xl p-6 col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-purple-500" size={24} />
                <h2 className="text-2xl font-bold text-white">Spirit Stats</h2>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                <StatRow label="Spirit Power" value={spiritPower} />
                <StatRow label="Ability Cooldown" value={`${char.stats.spirit.abilityCooldown}%`} />
                <StatRow label="Ability Duration" value={`${char.stats.spirit.abilityDuration}%`} />
                <StatRow label="Ability Range" value={`${char.stats.spirit.abilityRange}%`} />
                <StatRow label="Spirit Lifesteal" value={`${char.stats.spirit.spiritLifesteal}%`} />
                <StatRow label="Max Charges Increase" value={char.stats.spirit.maxChargesIncrease} />
                <StatRow label="Charge Cooldown" value={`${char.stats.spirit.chargeCooldown}%`} />
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-purple-500" size={32} />
              <h2 className="text-3xl font-bold text-white">Abilities</h2>
            </div>
            <div className="grid grid-cols-4 gap-4" style={{ gridAutoRows: '1fr' }}>
              {char.abilities.map((ability, idx) => (
                <AbilityPanel key={idx} ability={ability} index={idx} characterKey={characterKey} />
              ))}
            </div>
          </div>

          <DamageCalculator characterKey={characterKey} />
        </div>

        <ItemSelector />
        <ItemTooltip item={hoveredItem} />
      </div>
    );
  };

  const StatRow = ({ label, value, bonus }) => (
    <div className="flex justify-between items-center py-1 text-sm">
      <span className="text-gray-300">{label}:</span>
      <span className="text-white font-bold">
        {value} {bonus && <span className="text-gray-500 text-xs ml-1">{bonus}</span>}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-900">
      {selectedCharacter ? (
        <CharacterStats characterKey={selectedCharacter} />
      ) : (
        <CharacterGrid />
      )}
    </div>
  );
}
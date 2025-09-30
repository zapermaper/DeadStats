'use client';

import React, { useState, useEffect } from 'react';
import { Users, Crosshair, Heart, Zap, ChevronDown, ChevronUp, X } from 'lucide-react';

// Complete item data - T1: 500, T2: 1250, T3: 3000, T4: 6200
const itemData = {
  // TIER 1: 500 SOULS
  "extra_stamina": {
    name: "Extra Stamina",
    image: "/items/extra_stamina/500v.png",
    cost: 800,
    tier: 1,
    category: "vitality",
    stats: { stamina: 1, healthRegen: 1 }
  },
  "basic_magazine": {
    name: "Basic Magazine",
    image: "/items/basic_magazine/500g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { ammo: 24, weaponDamage: 7 }
  },
  "mystic_burst": {
    name: "Mystic Burst",
    image: "/items/mystic_burst/500s.png",
    cost: 800,
    tier: 1,
    category: "spirit",
    stats: { spiritPower: 4, cooldownReduction: 4 }
  },
  "spirit_strike": {
    name: "Spirit Strike",
    image: "/items/spirit_strike/500s.png",
    cost: 800,
    tier: 1,
    category: "spirit",
    stats: { spiritPower: 5 },
    passive: "+35% Melee Damage, melee deals 4% max health as Spirit Damage",
    damageModifier: { type: "spiritSteal", value: 5 }
  },
  
  "close_quarters": {
    name: "Close Quarters",
    image: "/items/close_quarters/1250g.png",
    cost: 800,
    tier: 1,
    category: "gun",
    stats: { weaponDamage: 8, stamina: 1 },
    passive: "+20 Weapon Damage (Conditional) in close range"
  },
  "headshot_booster": {
    name: "Headshot Booster",
    image: "/items/headshot_booster/1250g.png",
    cost: 1250,
    tier: 1,
    category: "gun",
    stats: { weaponDamage: 10, headshotDamage: 40 }
  },
  
  // TIER 3: 3000 SOULS
  "inhibitor": {
    name: "Inhibitor",
    image: "/items/inhibitor/3000v.png",
    cost: 3000,
    tier: 3,
    category: "vitality",
    stats: { health: 150, healthRegen: 3 },
    passive: "Enemy hero hit deals -30% damage for 4s",
    damageModifier: { type: "enemyDebuff", value: -30 }
  },
  
  // TIER 4: 6200 SOULS
  "echo_shard": {
    name: "Echo Shard",
    image: "/items/echo_shard/6200s.png",
    cost: 6200,
    tier: 4,
    category: "spirit",
    stats: { spiritPower: 14, cooldownReduction: 20 },
    active: "Duplicate last cast ability"
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
        description: "Drain health from enemies in front of you while they are in the radius.",
        baseDamage: 32,
        spiritScaling: 0.605,
        damageType: "spirit",
        stats: {
          dps: 32,
          duration: 8,
          cooldown: 32,
          range: 12
        },
        upgrades: [
          { name: "+2s Duration", points: 1 },
          { name: "+20 DPS", points: 2 },
          { name: "-13s Cooldown", points: 5 }
        ]
      },
      {
        name: "Infernal Resilience",
        image: "/characters/Abrams/2.png",
        description: "Regenerate a portion of incoming damage over time.",
        baseDamage: 37,
        spiritScaling: 1.95,
        damageType: "spirit",
        stats: {
          regenPercent: 20,
          duration: 12,
          cooldown: 27
        },
        upgrades: [
          { name: "+15% Regen", points: 1 },
          { name: "+14s Duration", points: 2 },
          { name: "+1 Stamina", points: 5 }
        ]
      },
      {
        name: "Shoulder Charge",
        image: "/characters/Abrams/3.png",
        description: "Charge forward, damaging and pushing enemies.",
        baseDamage: 120,
        spiritScaling: 0,
        damageType: "ability",
        stats: {
          damage: 120,
          cooldown: 20,
          range: 25
        },
        upgrades: [
          { name: "+30 Damage", points: 1 },
          { name: "-8s Cooldown", points: 2 },
          { name: "+15m Cast Range", points: 5 }
        ]
      },
      {
        name: "Seismic Impact",
        image: "/characters/Abrams/4.png",
        description: "Leap high into the air and choose a ground location to crash into.",
        baseDamage: 55,
        spiritScaling: 2.33,
        damageType: "spirit",
        stats: {
          damage: 200,
          stun: 1.2,
          cooldown: 85,
          radius: 14
        },
        upgrades: [
          { name: "+10m Radius", points: 1 },
          { name: "+40% Damage", points: 2 },
          { name: "-30s Cooldown", points: 5 }
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
  const [hoverTimer, setHoverTimer] = useState(null);
  const [abilityUpgrades, setAbilityUpgrades] = useState({});
  const [expandedAbilities, setExpandedAbilities] = useState({ 0: true, 1: true, 2: true, 3: true });
  const [itemSelectorOpen, setItemSelectorOpen] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
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

  const handleItemHover = (item) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    const timer = setTimeout(() => {
      setHoveredItem(item);
    }, 500);
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

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-8">
        <div className="bg-zinc-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-zinc-800 p-4 border-b border-zinc-700 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-white">Select Item</h2>
            <button
              onClick={() => {
                setItemSelectorOpen(false);
                setSelectedSlotIndex(null);
                handleItemLeave();
              }}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 grid grid-cols-3 gap-4">
            {Object.entries(itemData).map(([key, item]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleItemHover(item)}
                onMouseLeave={handleItemLeave}
              >
                <button
                  onClick={() => addItemToSlot(key, selectedSlotIndex)}
                  className="w-full bg-zinc-700 hover:bg-zinc-600 rounded-lg p-4 text-left transition-all border-2 border-transparent hover:border-amber-500"
                >
                  <div className="text-sm text-white font-semibold mb-1">{item.name}</div>
                  <div className="text-xs text-green-400">${item.cost}</div>
                  <div className="text-xs text-gray-400 mt-1">Tier {item.tier}</div>
                </button>
              </div>
            ))}
          </div>
        </div>
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

  const ItemTooltip = ({ item }) => {
    if (!item || !itemSelectorOpen) return null;
    
    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-96 bg-gradient-to-b from-amber-700 to-amber-800 rounded-lg shadow-2xl border-4 border-amber-600 z-50">
        <div className="bg-amber-600 p-3 rounded-t-lg">
          <h3 className="text-white font-bold text-xl">{item.name}</h3>
        </div>
        <div className="p-4 bg-zinc-800 rounded-b-lg">
          <div className="flex justify-between mb-3">
            <span className="text-white">Cost</span>
            <span className="text-green-400 font-bold">${item.cost}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-white">Tier</span>
            <span className="text-white font-bold">{item.tier}</span>
          </div>
          {item.stats && (
            <div className="space-y-2 mb-3">
              {Object.entries(item.stats).map(([stat, value]) => (
                <div key={stat} className="text-amber-300">
                  +{value} {stat.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              ))}
            </div>
          )}
          {item.passive && (
            <div className="mb-3">
              <div className="text-amber-400 font-semibold italic mb-1">Passive</div>
              <div className="text-gray-300 text-sm">{item.passive}</div>
            </div>
          )}
          {item.active && (
            <div>
              <div className="text-amber-400 font-semibold italic mb-1">Active</div>
              <div className="text-gray-300 text-sm">{item.active}</div>
            </div>
          )}
        </div>
      </div>
    );
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
    const baseGunDamage = char.stats.weapon.bulletDamage * (1 + weaponBonus / 100);
    
    return (
      <div className="bg-zinc-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Damage Calculator</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-3">Damage Modifiers</h3>
            <div className="space-y-2">
              {selectedItems.map((itemKey, idx) => {
                if (!itemKey || !itemData[itemKey].damageModifier) return null;
                const item = itemData[itemKey];
                const modKey = `item_${idx}`;
                
                return (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={damageModifiers[modKey]?.active || false}
                      onChange={(e) => {
                        setDamageModifiers(prev => ({
                          ...prev,
                          [modKey]: {
                            active: e.target.checked,
                            value: item.damageModifier.value,
                            name: item.name
                          }
                        }));
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-white text-sm">{item.name}</span>
                    <span className="text-green-400 text-sm">
                      {item.damageModifier.value > 0 ? '+' : ''}{item.damageModifier.value}%
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-amber-500 mb-3">Calculated Damage</h3>
            <div className="space-y-3">
              <div className="bg-zinc-700 rounded-lg p-3">
                <div className="text-red-400 font-semibold mb-2">Gun Damage</div>
                <div className="text-white">
                  Base: {baseGunDamage.toFixed(2)}
                </div>
              </div>
              
              {char.abilities.map((ability, idx) => {
                const damage = calculateAbilityDamage(ability, damageModifiers);
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
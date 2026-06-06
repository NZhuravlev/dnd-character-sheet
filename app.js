const CHARACTER_URL = "./data/character.json";
const STORAGE_KEY = "student-prizmari-combat-state-v1";
const ARCANE_DABBLER_SLOT_COSTS = {
  1: 2,
  2: 3,
  3: 5,
  4: 6,
  5: 7
};
const ACTION_TO_EFFECT_PRESET = {
  "victory-before-battle": "predestined-victory"
};

const ABILITY_ORDER = ["str", "dex", "con", "int", "wis", "cha"];
const ABILITY_LABELS = {
  str: "Сила",
  dex: "Ловкость",
  con: "Телосложение",
  int: "Интеллект",
  wis: "Мудрость",
  cha: "Харизма"
};

const SKILL_DEFINITIONS = {
  acr: { label: "Акробатика", ability: "dex" },
  ani: { label: "Уход за животными", ability: "wis" },
  arc: { label: "Магия", ability: "int" },
  ath: { label: "Атлетика", ability: "str" },
  dec: { label: "Обман", ability: "cha" },
  his: { label: "История", ability: "int" },
  ins: { label: "Проницательность", ability: "wis" },
  itm: { label: "Запугивание", ability: "cha" },
  inv: { label: "Анализ", ability: "int" },
  med: { label: "Медицина", ability: "wis" },
  nat: { label: "Природа", ability: "int" },
  per: { label: "Восприятие", ability: "wis" },
  prf: { label: "Выступление", ability: "cha" },
  rel: { label: "Религия", ability: "int" },
  slt: { label: "Ловкость рук", ability: "dex" },
  ste: { label: "Скрытность", ability: "dex" },
  sur: { label: "Выживание", ability: "wis" }
};

const CONDITION_DEFINITIONS = [
  { id: "blinded", label: "Ослеплен", description: "Не видишь; атаки по тебе с преимуществом, твои атаки с помехой." },
  { id: "charmed", label: "Очарован", description: "Не можешь атаковать источник очарования; источник получает преимущество на соц. проверки." },
  { id: "deafened", label: "Оглох", description: "Не слышишь." },
  { id: "exhaustion", label: "Истощение", description: "Накопительное состояние; степень отслеживается отдельно, если нужно." },
  { id: "frightened", label: "Испуган", description: "Помеха на проверки и атаки, пока источник страха в поле зрения." },
  { id: "grappled", label: "Схвачен", description: "Скорость 0." },
  { id: "incapacitated", label: "Недееспособен", description: "Не можешь совершать действия и реакции." },
  { id: "invisible", label: "Невидим", description: "Не виден без особых средств; твои атаки с преимуществом." },
  { id: "paralyzed", label: "Парализован", description: "Недееспособен, скорость 0, провал Str/Dex сейвов." },
  { id: "petrified", label: "Окаменел", description: "Превращен в неживой материал; множество иммунитетов и сопротивлений." },
  { id: "poisoned", label: "Отравлен", description: "Помеха на атаки и проверки характеристик." },
  { id: "prone", label: "Сбит", description: "Лежишь ничком; движение стоит вдвое дороже." },
  { id: "restrained", label: "Опутан", description: "Скорость 0; атаки по тебе с преимуществом, твои атаки с помехой." },
  { id: "stunned", label: "Ошеломлен", description: "Недееспособен, скорость 0, провал Str/Dex сейвов." },
  { id: "unconscious", label: "Без сознания", description: "Недееспособен, лежишь ничком, не осознаешь окружение." }
];

const MYSTIC_PROGRESS = {
  1: { psiPoints: 4, psiLimit: 2, talentsKnown: 1, disciplinesKnown: 1, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  2: { psiPoints: 6, psiLimit: 2, talentsKnown: 1, disciplinesKnown: 1, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  3: { psiPoints: 14, psiLimit: 3, talentsKnown: 2, disciplinesKnown: 2, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  4: { psiPoints: 17, psiLimit: 3, talentsKnown: 2, disciplinesKnown: 2, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  5: { psiPoints: 27, psiLimit: 5, talentsKnown: 2, disciplinesKnown: 3, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  6: { psiPoints: 32, psiLimit: 5, talentsKnown: 2, disciplinesKnown: 3, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  7: { psiPoints: 38, psiLimit: 6, talentsKnown: 2, disciplinesKnown: 4, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  8: { psiPoints: 44, psiLimit: 6, talentsKnown: 2, disciplinesKnown: 4, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  9: { psiPoints: 57, psiLimit: 7, talentsKnown: 2, disciplinesKnown: 5, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  10: { psiPoints: 64, psiLimit: 7, talentsKnown: 3, disciplinesKnown: 5, psionicMasteryUses: 0, psionicMasteryPoints: 0 },
  11: { psiPoints: 64, psiLimit: 7, talentsKnown: 3, disciplinesKnown: 5, psionicMasteryUses: 1, psionicMasteryPoints: 9 },
  12: { psiPoints: 64, psiLimit: 7, talentsKnown: 3, disciplinesKnown: 6, psionicMasteryUses: 1, psionicMasteryPoints: 9 },
  13: { psiPoints: 64, psiLimit: 7, talentsKnown: 3, disciplinesKnown: 6, psionicMasteryUses: 2, psionicMasteryPoints: 9 },
  14: { psiPoints: 64, psiLimit: 7, talentsKnown: 3, disciplinesKnown: 6, psionicMasteryUses: 2, psionicMasteryPoints: 9 },
  15: { psiPoints: 64, psiLimit: 7, talentsKnown: 3, disciplinesKnown: 7, psionicMasteryUses: 3, psionicMasteryPoints: 9 },
  16: { psiPoints: 64, psiLimit: 7, talentsKnown: 3, disciplinesKnown: 7, psionicMasteryUses: 3, psionicMasteryPoints: 9 },
  17: { psiPoints: 64, psiLimit: 7, talentsKnown: 4, disciplinesKnown: 7, psionicMasteryUses: 4, psionicMasteryPoints: 9 },
  18: { psiPoints: 71, psiLimit: 7, talentsKnown: 4, disciplinesKnown: 8, psionicMasteryUses: 4, psionicMasteryPoints: 11 },
  19: { psiPoints: 71, psiLimit: 7, talentsKnown: 4, disciplinesKnown: 8, psionicMasteryUses: 4, psionicMasteryPoints: 11 },
  20: { psiPoints: 71, psiLimit: 7, talentsKnown: 4, disciplinesKnown: 8, psionicMasteryUses: 4, psionicMasteryPoints: 13 }
};

let characterData;
let runtimeState;
let activeModalContext = null;
let modalFeedbackText = "";

async function main() {
  characterData = await loadCharacter();
  runtimeState = loadState(characterData);
  render();
  wireUi();
}

async function loadCharacter() {
  const response = await fetch(CHARACTER_URL);
  if (response.ok) {
    return response.json();
  }

  throw new Error(`Не удалось загрузить ${CHARACTER_URL}`);
}

function loadState(data) {
  const defaults = structuredClone(data.stateDefaults);
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return defaults;
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      ...defaults,
      ...parsed,
      concentration: { ...defaults.concentration, ...(parsed.concentration ?? {}) },
      spellSlotsCurrent: { ...defaults.spellSlotsCurrent, ...(parsed.spellSlotsCurrent ?? {}) }
    };
  } catch {
    return defaults;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runtimeState));
}

function render() {
  const derived = deriveCharacter(characterData, runtimeState);
  renderHero(derived);
  renderAbilities(derived);
  renderDisciplines(derived);
  renderTalents(derived);
  renderSpells(derived);
  renderFeatures(derived);
  renderFeats(derived);
  renderItems(derived);
  renderEquipment(derived);
  renderCurrency(derived);
  renderFocusControls(derived);
  renderEffectsControls(derived);
  renderConditions(derived);
  renderState(derived);
  renderSpellSlotsControls(derived);
}

window.__openActions = (type) => openActionsModal(type);
window.__createSpellSlot = (level) => createSpellSlot(level);
window.__spendSpellSlot = (level) => spendSpellSlot(level);

function deriveCharacter(data, state) {
  const progression = MYSTIC_PROGRESS[data.identity.level];
  const proficiencyBonus = Math.floor((data.identity.level - 1) / 4) + 2;
  const abilities = deriveAbilities(data);
  const hpMax = deriveHitPoints(data, abilities);
  const saves = deriveSavingThrows(data, abilities, proficiencyBonus);
  const skills = deriveSkills(data, abilities, proficiencyBonus);
  const passivePerception = 10 + skills.per;

  const derived = {
    data,
    state,
    progression,
    proficiencyBonus,
    abilities,
    saves,
    skills,
    passivePerception,
    spell: {
      ability: data.combat.psionicAbility,
      saveDC: 8 + proficiencyBonus + abilities[data.combat.psionicAbility].mod,
      attackBonus: proficiencyBonus + abilities[data.combat.psionicAbility].mod
    },
    hpMax,
    armorClass: deriveArmorClass(data, abilities),
    initiative: abilities.dex.mod,
    speed: { walk: data.movement.walk },
    weapons: deriveWeapons(data, abilities, proficiencyBonus),
    spellSlots: deriveSpellSlots(data, state),
    attunement: {
      current: data.items.filter((item) => item.requiresAttunement && item.attuned).length,
      max: 3
    },
    actionLibrary: buildActionLibrary(data)
  };

  applyStaticModifiers(derived, data.feats);
  applyActiveEffects(derived, data.effectPresets, state.activeEffectIds);

  return derived;
}

function deriveAbilities(data) {
  const abilities = {};

  for (const key of ABILITY_ORDER) {
    const source = data.abilities[key];
    const base = typeof source === "number" ? source : source.base;
    abilities[key] = {
      key,
      label: ABILITY_LABELS[key],
      base,
      score: base
    };
  }

  for (const item of data.items) {
    if (!item.bonuses) continue;
    if (item.requiresAttunement && !item.attuned) continue;
    if (item.equipped === false && !item.consumed) continue;

    for (const [abilityKey, payload] of Object.entries(item.bonuses)) {
      if (payload.score) {
        abilities[abilityKey].score = evaluateFormula(payload.score, abilities[abilityKey].score, { abilities });
      }
    }
  }

  for (const key of ABILITY_ORDER) {
    abilities[key].mod = Math.floor((abilities[key].score - 10) / 2);
  }

  return abilities;
}

function deriveHitPoints(data, abilities) {
  if (data.durability.hpMode !== "fixed") {
    return data.stateDefaults.hpCurrent;
  }

  const level = data.identity.level;
  const hitDie = data.durability.hitDie;
  const averagePerLevel = Math.floor(hitDie / 2) + 1;
  const conMod = abilities.con.mod;

  return hitDie + conMod + (level - 1) * (averagePerLevel + conMod);
}

function deriveSavingThrows(data, abilities, proficiencyBonus) {
  const proficient = new Set(data.proficiencies.savingThrows);
  const saves = {};

  for (const key of ABILITY_ORDER) {
    saves[key] = abilities[key].mod + (proficient.has(key) ? proficiencyBonus : 0);
  }

  return saves;
}

function deriveSkills(data, abilities, proficiencyBonus) {
  const proficient = new Set(data.proficiencies.skills);
  const expertise = new Set(data.proficiencies.expertise);
  const skills = {};

  for (const [key, definition] of Object.entries(SKILL_DEFINITIONS)) {
    const base = abilities[definition.ability].mod;
    const multiplier = expertise.has(key) ? 2 : proficient.has(key) ? 1 : 0;
    skills[key] = base + proficiencyBonus * multiplier;
  }

  return skills;
}

function deriveArmorClass(data, abilities) {
  if (data.combat.armor.equipped) {
    return data.combat.armor.baseArmorClass + abilities.dex.mod;
  }

  return 10 + abilities.dex.mod;
}

function deriveWeapons(data, abilities, proficiencyBonus) {
  return data.combat.weapons.map((weapon) => {
    const attackBonus = abilities[weapon.attackAbility].mod + (weapon.proficient ? proficiencyBonus : 0);
    const damageBonus = abilities[weapon.damageAbility].mod;

    return {
      ...weapon,
      attackBonus,
      damageBonus
    };
  });
}

function deriveSpellSlots(data, state) {
  const enabled = data.classFeatures.some((feature) => feature.id === "arcane-dabbler");
  if (!enabled) {
    return { enabled: false, levels: [] };
  }

  const levels = Object.entries(ARCANE_DABBLER_SLOT_COSTS).map(([level, cost]) => {
    const numericLevel = Number(level);
    const current = Number(state.spellSlotsCurrent?.[level] ?? 0);

    return {
      level: numericLevel,
      cost,
      current,
      creatable: Math.floor(Math.max(0, state.psiPointsCurrent) / cost)
    };
  });

  return { enabled: true, levels };
}

function applyStaticModifiers(derived, sources) {
  for (const source of sources) {
    if (!source.modifiers) continue;
    for (const modifier of source.modifiers) {
      applyModifier(derived, modifier.target, modifier.formula);
    }
  }
}

function applyActiveEffects(derived, presets, activeEffectIds) {
  const effects = presets.filter((preset) => activeEffectIds.includes(preset.id));

  for (const effect of effects) {
    if (effect.modifiers) {
      for (const modifier of effect.modifiers) {
        applyModifier(derived, modifier.target, modifier.formula);
      }
    }

    if (effect.weaponId && effect.weaponModifiers) {
      const weapon = derived.weapons.find((entry) => entry.id === effect.weaponId);
      if (!weapon) continue;

      if (effect.weaponModifiers.attackBonus) {
        weapon.attackBonus = evaluateFormula(effect.weaponModifiers.attackBonus, weapon.attackBonus, buildFormulaContext(derived));
      }
      if (effect.weaponModifiers.damageBonus) {
        weapon.damageBonus = evaluateFormula(effect.weaponModifiers.damageBonus, weapon.damageBonus, buildFormulaContext(derived));
      }
    }
  }
}

function applyModifier(derived, target, formula) {
  const targetMap = {
    initiative: () => {
      derived.initiative = evaluateFormula(formula, derived.initiative, buildFormulaContext(derived));
    },
    armorClass: () => {
      derived.armorClass = evaluateFormula(formula, derived.armorClass, buildFormulaContext(derived));
    },
    "speed.walk": () => {
      derived.speed.walk = evaluateFormula(formula, derived.speed.walk, buildFormulaContext(derived));
    }
  };

  targetMap[target]?.();
}

function buildFormulaContext(derived) {
  return {
    abilities: Object.fromEntries(
      Object.entries(derived.abilities).map(([key, value]) => [key, { ...value }])
    ),
    derived
  };
}

function evaluateFormula(formula, value, context) {
  const expression = formula.replace(/\bvalue\b/g, `(${value})`);
  return Function(
    "context",
    `const { abilities, derived } = context; const max = Math.max; const min = Math.min; const floor = Math.floor; const ceil = Math.ceil; const round = Math.round; return ${expression};`
  )(context);
}

function buildActionLibrary(data) {
  const actions = [];

  for (const feature of data.classFeatures) {
    if (feature.kind === "passive") continue;
    actions.push({
      id: feature.id,
      kind: "feature",
      name: feature.name,
      type: normalizeActionType(feature.kind),
      source: "Умение класса",
      summary: feature.summary,
      duration: feature.duration,
      autoEffectPresetId: resolveActionEffectPresetId(data, feature.id)
    });
  }

  for (const spell of data.spells) {
    actions.push({
      id: spell.id,
      kind: "spell",
      name: spell.name,
      type: normalizeActionType(spell.castingTime),
      source: `Заклинание ${spell.level} уровня`,
      spellLevel: spell.level,
      range: spell.range,
      duration: spell.duration,
      summary: spell.summary,
      autoEffectPresetId: resolveActionEffectPresetId(data, spell.id)
    });
  }

  for (const discipline of data.disciplines) {
    for (const effect of discipline.effects) {
      const type = normalizeActionType(effect.type);
      if (!type) continue;
      actions.push({
        id: effect.id,
        kind: "discipline",
        name: effect.name,
        type,
        source: discipline.name,
        cost: effect.cost,
        range: effect.range,
        duration: effect.duration,
        summary: effect.summary,
        autoEffectPresetId: resolveActionEffectPresetId(data, effect.id)
      });
    }
  }

  for (const talent of data.talents) {
    actions.push({
      id: talent.id,
      kind: "talent",
      name: talent.name,
      type: normalizeActionType(talent.type),
      source: "Псионический талант",
      cost: "0 пси",
      range: talent.range,
      duration: talent.duration,
      summary: talent.summary,
      autoEffectPresetId: resolveActionEffectPresetId(data, talent.id)
    });
  }

  actions.push({
    id: "short-rest",
    kind: "rest",
    name: "Короткий отдых",
    type: "special",
    source: "Отдых",
    summary: "1 час отдыха. Заканчивает короткие эффекты; пси и ячейки арканиста не восстанавливаются, лечение через кости хитов отмечается вручную."
  });

  actions.push({
    id: "long-rest",
    kind: "rest",
    name: "Долгий отдых",
    type: "special",
    source: "Отдых",
    summary: "8 часов отдыха. Восстанавливает хиты, пси, Lucky и Psionic Mastery; добавляет до половины костей хитов, сбрасывает психофокус и убирает созданные ячейки арканиста."
  });

  actions.push({
    id: "potion-of-superior-healing",
    kind: "item",
    name: "Зелье превосходного лечения",
    type: "action",
    source: "Предмет",
    summary: "8d4 + 8 хитов; расходует зелье."
  });

  actions.push({
    id: "wish-luck-blade",
    kind: "item",
    name: "Wish (Клинок удачи)",
    type: "action",
    source: "Клинок удачи",
    summary: "1 оставшееся исполнение желания; точный эффект зависит от формулировки и решения мастера."
  });

  return actions;
}

function resolveActionEffectPresetId(data, actionId) {
  if (data.effectPresets.some((effect) => effect.id === actionId)) {
    return actionId;
  }

  return ACTION_TO_EFFECT_PRESET[actionId] ?? null;
}

function normalizeActionType(rawType) {
  if (!rawType) return null;
  const map = {
    action: "action",
    bonus: "bonus",
    reaction: "reaction",
    special: "special"
  };
  return map[rawType] ?? map[String(rawType).toLowerCase()] ?? "action";
}

function formatModifier(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

function renderHero(derived) {
  document.querySelector("#hero-name").textContent = derived.data.identity.name;
  document.querySelector("#hero-subtitle").textContent =
    `${derived.data.identity.className} ${derived.data.identity.level} · ${derived.data.identity.subclassName}`;

  const tags = [
    { label: "XP", value: derived.data.identity.xp.toLocaleString("ru-RU"), accent: "strong" },
    { label: "PB", value: formatModifier(derived.proficiencyBonus), accent: "strong" },
    { label: "КС", value: `${derived.spell.saveDC}`, icon: "sigil" },
    { label: "Пси-атака", value: formatModifier(derived.spell.attackBonus), icon: "spark" },
    { label: "КД", value: `${derived.armorClass}`, icon: "shield" },
    { label: "Инициатива", value: formatModifier(derived.initiative), icon: "arrow" },
    { label: "Скорость", value: `${derived.speed.walk} фт.`, icon: "stride" },
    { label: "Пси-лимит", value: `${derived.progression.psiLimit}`, icon: "psi" },
    { label: "Пассивное восприятие", value: `${derived.passivePerception}`, icon: "eye" },
    { label: "Телепатия", value: "120 фт.", icon: "wave" }
  ];

  document.querySelector("#hero-tags").innerHTML = tags
    .map((tag) => `
      <span class="tag ${tag.accent ?? ""} ${tag.icon ? "with-icon" : ""}">
        ${tag.icon ? `<span class="tag-icon" aria-hidden="true">${chipIcon(tag.icon)}</span>` : ""}
        <span>${tag.label} ${tag.value}</span>
      </span>
    `)
    .join("");
}

function chipIcon(type) {
  const icons = {
    shield: `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 2.25 12.5 4v3.2c0 3.1-1.7 5.25-4.5 6.55C5.2 12.45 3.5 10.3 3.5 7.2V4L8 2.25Z"/>
      </svg>
    `,
    arrow: `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 13V3M4.75 6.25 8 3l3.25 3.25"/>
      </svg>
    `,
    stride: `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5.25 3.25h2.5M6 3.25 8.5 7l2-.5M7.5 8.25 6 13m3-4.75L12 13"/>
      </svg>
    `,
    psi: `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 2.5v11M4.75 4.5c0-1 1.3-2 3.25-2s3.25 1 3.25 2-1.3 2-3.25 2-3.25 1-3.25 2 1.3 2 3.25 2 3.25 1 3.25 2"/>
      </svg>
    `,
    eye: `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1.75 8s2.25-3.75 6.25-3.75S14.25 8 14.25 8s-2.25 3.75-6.25 3.75S1.75 8 1.75 8Z"/>
        <circle cx="8" cy="8" r="1.75"/>
      </svg>
    `,
    wave: `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2.5 6.25c1 .9 2 .9 3 0s2-.9 3 0 2 .9 3 0 2-.9 2.5 0M2.5 9.75c1 .9 2 .9 3 0s2-.9 3 0 2 .9 3 0 2-.9 2.5 0"/>
      </svg>
    `,
    spark: `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m8 1.75 1.35 4.9 4.9 1.35-4.9 1.35L8 14.25 6.65 9.35 1.75 8l4.9-1.35L8 1.75Z"/>
      </svg>
    `,
    sigil: `
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="8" r="4.75"/>
        <path d="M8 5.25v5.5M5.25 8h5.5"/>
      </svg>
    `
  };

  return icons[type] ?? "";
}

function renderAbilities(derived) {
  const skillProficiencies = new Set(derived.data.proficiencies.skills);
  const skillExpertise = new Set(derived.data.proficiencies.expertise);
  const saveProficiencies = new Set(derived.data.proficiencies.savingThrows);

  document.querySelector("#abilities-grid").innerHTML = ABILITY_ORDER.map((key) => {
    const ability = derived.abilities[key];
    const meta = ability.score !== ability.base ? `base ${ability.base}` : "";
    const relatedSkills = Object.entries(SKILL_DEFINITIONS)
      .filter(([, definition]) => definition.ability === key)
      .map(([skillKey, definition]) => {
        const markerClass = skillExpertise.has(skillKey)
          ? "is-expertise"
          : skillProficiencies.has(skillKey)
            ? "is-proficient"
            : "";

        return `
          <div class="ledger-line">
            <span class="ledger-marker circle ${markerClass}"></span>
            <span class="ledger-label">${definition.label}</span>
            <span class="ledger-value">${formatModifier(derived.skills[skillKey])}</span>
          </div>
        `;
      })
      .join("");
    const hasSkills = Boolean(relatedSkills);

    return `
      <article class="ability-row-sheet ${hasSkills ? "" : "no-ledger"}">
        <div class="ability-box">
          <div class="ability-frame">
            <strong class="ability-name">${ability.label}</strong>
            <div class="ability-main">
              <span class="ability-score">${ability.score}</span>
              <div class="ability-side">
                <span class="ability-mod">${formatModifier(ability.mod)}</span>
                <span class="ability-save ${saveProficiencies.has(key) ? "is-proficient" : ""}">СБ ${formatModifier(derived.saves[key])}</span>
              </div>
            </div>
            ${meta ? `<span class="ability-meta">${meta}</span>` : ""}
          </div>
        </div>
        ${hasSkills ? `
          <div class="ability-ledger">
            <div class="ledger-skills">${relatedSkills}</div>
          </div>
        ` : ""}
      </article>
    `;
  }).join("");
}

function renderDisciplines(derived) {
  document.querySelector("#disciplines-list").innerHTML = derived.data.disciplines.map((discipline) => `
    <article class="stack-card">
      <strong>${discipline.name}</strong>
      <p><strong>Психофокус:</strong> ${discipline.focus}</p>
      <div class="detail-row"><span>${discipline.effects.map((effect) => effect.name).join(" · ")}</span></div>
    </article>
  `).join("");
}

function renderTalents(derived) {
  document.querySelector("#talents-list").innerHTML = derived.data.talents.map((talent) => {
    const damageText = talent.damage ? formatTalentDamage(talent, derived) : "Без урона";
    return `
      <article class="stack-card">
        <strong>${talent.name}</strong>
        <p>${talent.summary}</p>
        <div class="detail-row"><span>${talent.range}</span><span>${talent.save ?? damageText}</span></div>
        ${talent.damage ? `<div class="detail-row"><span>Урон</span><span>${damageText}</span></div>` : ""}
      </article>
    `;
  }).join("");
}

function renderSpells(derived) {
  document.querySelector("#spells-list").innerHTML = derived.data.spells.map((spell) => `
    <article class="stack-card">
      <strong>${spell.name}</strong>
      <p>${spell.summary}</p>
      <div class="detail-row"><span>${spell.level} ур.</span><span>${spell.range}</span></div>
      <div class="detail-row"><span>${humanActionType(spell.castingTime)}</span><span>${spell.duration}</span></div>
    </article>
  `).join("");
}

function renderFeatures(derived) {
  const features = derived.data.classFeatures.map((feature) => ({
    name: feature.name,
    summary: feature.summary,
    source: "Класс"
  }));

  document.querySelector("#features-list").innerHTML = features.map((entry) => `
    <article class="stack-card">
      <strong>${entry.name}</strong>
      <p>${entry.summary}</p>
      <div class="detail-row"><span>${entry.source}</span></div>
    </article>
  `).join("");
}

function renderFeats(derived) {
  document.querySelector("#feats-list").innerHTML = derived.data.feats.map((feat) => `
    <article class="stack-card">
      <strong>${feat.name}</strong>
      <p>${feat.summary}</p>
      <div class="detail-row"><span>Фит</span></div>
    </article>
  `).join("");
}

function renderItems(derived) {
  document.querySelector("#items-list").innerHTML = derived.data.items.map((item) => {
    const tags = [
      item.requiresAttunement ? (item.attuned ? "настроен" : "требует настройки") : null,
      item.consumed ? "использован" : null,
      item.quantity ? `x${item.quantity}` : null
    ].filter(Boolean).join(" · ");

    return `
      <article class="stack-card">
        <strong>${item.name}</strong>
        <p>${item.notes?.join(" ") ?? "Без дополнительных заметок."}</p>
        <div class="detail-row"><span>${item.category}</span><span>${tags || "—"}</span></div>
      </article>
    `;
  }).join("");
}

function renderEquipment(derived) {
  document.querySelector("#equipment-list").innerHTML = `
    <strong>Обычное снаряжение</strong><br />
    ${derived.data.equipment.join("<br />")}
  `;
}

function renderCurrency(derived) {
  document.querySelector("#currency-box").innerHTML = `
    <strong>Деньги</strong><br />
    ${derived.data.currency.pp.toLocaleString("ru-RU")} пм<br />
    ${derived.data.currency.gp.toLocaleString("ru-RU")} зм<br />
    <br />
    <strong>Настройка</strong><br />
    ${derived.attunement.current}/${derived.attunement.max}
  `;
}

function renderFocusControls(derived) {
  const select = document.querySelector("#focus-select");
  const options = [
    `<option value="">Без психофокуса</option>`,
    ...derived.data.disciplines.map(
      (discipline) => `<option value="${discipline.id}" ${derived.state.psionicFocusId === discipline.id ? "selected" : ""}>${discipline.name}</option>`
    )
  ];
  select.innerHTML = options.join("");

  const current = derived.data.disciplines.find((discipline) => discipline.id === derived.state.psionicFocusId);
  document.querySelector("#focus-summary").textContent = current ? current.focus : "Психофокус не выбран.";
}

function renderEffectsControls(derived) {
  const select = document.querySelector("#effect-select");
  const inactive = derived.data.effectPresets.filter((effect) => !derived.state.activeEffectIds.includes(effect.id));

  select.innerHTML = inactive.length
    ? inactive.map((effect) => `<option value="${effect.id}">${effect.name}</option>`).join("")
    : `<option value="">Нет доступных эффектов</option>`;

  document.querySelector("#active-effects").innerHTML = derived.state.activeEffectIds.map((effectId) => {
    const effect = derived.data.effectPresets.find((entry) => entry.id === effectId);
    if (!effect) return "";
    return `
      <div class="chip">
        <span>${effect.name}</span>
        <button type="button" data-remove-effect="${effect.id}">убрать</button>
      </div>
    `;
  }).join("");
}

function renderConditions(derived) {
  document.querySelector("#conditions-grid").innerHTML = CONDITION_DEFINITIONS.map((condition) => {
    const active = derived.state.conditions.includes(condition.id);
    return `
      <label class="condition-chip ${active ? "active" : ""}" title="${condition.description}">
        <input type="checkbox" data-condition-id="${condition.id}" ${active ? "checked" : ""} />
        <span>${condition.label}</span>
      </label>
    `;
  }).join("");
}

function renderState(derived) {
  const effectiveMaxHp = derived.hpMax + derived.state.maxHpAdjustment;
  document.querySelector("#hp-summary").textContent = `${Math.max(0, derived.state.hpCurrent)} / ${effectiveMaxHp} HP`;
  const tempHpSummary = document.querySelector("#temp-hp-summary");
  if (derived.state.tempHp > 0) {
    tempHpSummary.classList.remove("hidden");
    tempHpSummary.textContent = `+${derived.state.tempHp} temp HP`;
  } else {
    tempHpSummary.classList.add("hidden");
    tempHpSummary.textContent = "";
  }
  document.querySelector("#psi-input").value = derived.state.psiPointsCurrent;
  document.querySelector("#hit-dice-input").value = derived.state.hitDiceCurrent;
  document.querySelector("#lucky-input").value = derived.state.luckyPointsCurrent;
  document.querySelector("#mastery-input").value = derived.state.psionicMasteryUsesCurrent;
  document.querySelector("#temp-hp-input").value = derived.state.tempHp;
  document.querySelector("#max-hp-adjustment").value = derived.state.maxHpAdjustment;
  document.querySelector("#concentration-active").checked = derived.state.concentration.active;
  document.querySelector("#concentration-name").value = derived.state.concentration.active
    ? derived.state.concentration.name
    : "";
  document.querySelector("#combat-notes").value = derived.state.notes;

  const concentrationDc = document.querySelector("#concentration-dc");
  if (derived.state.concentration.active) {
    concentrationDc.classList.remove("hidden");
    concentrationDc.textContent = `Концентрация: Con save ${formatModifier(derived.saves.con)} с преимуществом`;
  } else {
    concentrationDc.classList.add("hidden");
    concentrationDc.textContent = "";
  }
}

function applyHpAdjustment(sign) {
  const amount = Math.abs(readNumber("#hp-adjustment"));
  if (!amount) return;
  applyHitChange(sign * amount);
}

function setTempHp() {
  runtimeState.tempHp = Math.max(0, readNumber("#temp-hp-input"));
  persistAndRender();
}

function setMaxHpAdjustment() {
  runtimeState.maxHpAdjustment = readNumber("#max-hp-adjustment");
  persistAndRender();
}

function renderSpellSlotsControls(derived) {
  const block = document.querySelector("#spell-slots-block");
  const container = document.querySelector("#spell-slots-editor");

  if (!derived.spellSlots.enabled) {
    block.classList.add("hidden");
    container.innerHTML = "";
    return;
  }

  block.classList.remove("hidden");
  container.innerHTML = derived.spellSlots.levels.map((slot) => `
    <div class="spell-slot-row">
      <div class="spell-slot-main">
        <strong>${slot.level} ур.</strong>
        <span>${slot.cost} пси · еще ${slot.creatable}</span>
      </div>
      <span class="spell-slot-count">${slot.current}</span>
      <div class="spell-slot-buttons">
        <button
          type="button"
          class="slot-button"
          onclick="window.__createSpellSlot?.(${slot.level})"
          data-create-slot="${slot.level}"
          title="Создать ячейку ${slot.level} уровня за ${slot.cost} пси"
          aria-label="Создать ячейку ${slot.level} уровня за ${slot.cost} пси"
          ${slot.creatable < 1 ? "disabled" : ""}
        >+</button>
        <button
          type="button"
          class="slot-button ghost"
          onclick="window.__spendSpellSlot?.(${slot.level})"
          data-spend-slot="${slot.level}"
          title="Потратить ячейку ${slot.level} уровня"
          aria-label="Потратить ячейку ${slot.level} уровня"
          ${slot.current < 1 ? "disabled" : ""}
        >−</button>
      </div>
    </div>
  `).join("");
}

function renderModalFeedback() {
  const feedback = document.querySelector("#modal-feedback");
  if (!feedback) return;

  if (!modalFeedbackText) {
    feedback.classList.add("hidden");
    feedback.textContent = "";
    return;
  }

  feedback.classList.remove("hidden");
  feedback.textContent = modalFeedbackText;
}

function wireUi() {
  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest(".action-trigger");
    if (actionButton) {
      openActionsModal(actionButton.dataset.actionType);
      return;
    }

    const applyActionCard = event.target.closest("[data-apply-action-id]");
    if (applyActionCard) {
      applyAction(applyActionCard.dataset.applyActionId);
      return;
    }

    const removeEffectButton = event.target.closest("[data-remove-effect]");
    if (removeEffectButton) {
      runtimeState.activeEffectIds = runtimeState.activeEffectIds.filter((id) => id !== removeEffectButton.dataset.removeEffect);
      persistAndRender();
      return;
    }

    if (event.target.dataset.closeModal === "true") {
      closeActionsModal();
    }
  });
  document.querySelector("#close-modal-button").addEventListener("click", closeActionsModal);
  document.querySelector("#modal-search-input").addEventListener("input", renderModalSearchResults);

  document.querySelector("#damage-button").addEventListener("click", () => applyHpAdjustment(-1));
  document.querySelector("#heal-button").addEventListener("click", () => applyHpAdjustment(1));
  document.querySelector("#temp-hp-button").addEventListener("click", setTempHp);
  document.querySelector("#max-hp-button").addEventListener("click", setMaxHpAdjustment);

  document.querySelector("#hp-adjustment").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyHpAdjustment(1);
    }
  });
  document.querySelector("#temp-hp-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTempHp();
    }
  });
  document.querySelector("#max-hp-adjustment").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setMaxHpAdjustment();
    }
  });

  for (const [selector, key] of [
    ["#psi-input", "psiPointsCurrent"],
    ["#hit-dice-input", "hitDiceCurrent"],
    ["#lucky-input", "luckyPointsCurrent"],
    ["#mastery-input", "psionicMasteryUsesCurrent"]
  ]) {
    document.querySelector(selector).addEventListener("change", (event) => {
      runtimeState[key] = Math.max(0, Number(event.target.value || 0));
      persistAndRender();
    });
  }

  document.querySelector("#focus-select").addEventListener("change", (event) => {
    runtimeState.psionicFocusId = event.target.value || null;
    persistAndRender();
  });

  document.querySelector("#concentration-active").addEventListener("change", (event) => {
    runtimeState.concentration.active = event.target.checked;
    if (!event.target.checked) {
      runtimeState.concentration.name = "";
    }
    persistAndRender();
  });

  document.querySelector("#concentration-name").addEventListener("input", (event) => {
    runtimeState.concentration.name = event.target.value;
    saveState();
  });

  document.querySelector("#combat-notes").addEventListener("input", (event) => {
    runtimeState.notes = event.target.value;
    saveState();
  });

  document.querySelector("#add-effect-button").addEventListener("click", () => {
    const effectId = document.querySelector("#effect-select").value;
    if (!effectId || runtimeState.activeEffectIds.includes(effectId)) return;
    runtimeState.activeEffectIds = [...runtimeState.activeEffectIds, effectId];
    persistAndRender();
  });

  document.addEventListener("change", (event) => {
    const input = event.target.closest("[data-condition-id]");
    if (!input) return;
    const { conditionId } = input.dataset;
    const next = new Set(runtimeState.conditions);
    if (input.checked) {
      next.add(conditionId);
    } else {
      next.delete(conditionId);
    }
    runtimeState.conditions = [...next];
    persistAndRender();
  });

  document.querySelector("#reset-state-button").addEventListener("click", () => {
    runtimeState = structuredClone(characterData.stateDefaults);
    persistAndRender();
  });
}

function applyHitChange(delta) {
  if (!delta) return;

  const effectiveMaxHp = deriveCharacter(characterData, runtimeState).hpMax + runtimeState.maxHpAdjustment;

  if (delta < 0) {
    let remainingDamage = Math.abs(delta);

    if (runtimeState.tempHp > 0) {
      const absorbed = Math.min(runtimeState.tempHp, remainingDamage);
      runtimeState.tempHp -= absorbed;
      remainingDamage -= absorbed;
    }

    runtimeState.hpCurrent = Math.max(0, runtimeState.hpCurrent - remainingDamage);

    if (runtimeState.concentration.active && remainingDamage > 0) {
      const dc = Math.max(10, Math.floor(remainingDamage / 2));
      document.querySelector("#concentration-dc").classList.remove("hidden");
      document.querySelector("#concentration-dc").textContent = `DC ${dc} Con save ${formatModifier(deriveCharacter(characterData, runtimeState).saves.con)} с преимуществом`;
    }
  } else {
    runtimeState.hpCurrent = Math.min(effectiveMaxHp, runtimeState.hpCurrent + delta);
  }

  persistAndRender();
}

function createSpellSlot(level) {
  const cost = ARCANE_DABBLER_SLOT_COSTS[level];
  if (!cost || runtimeState.psiPointsCurrent < cost) return;

  runtimeState.psiPointsCurrent -= cost;
  runtimeState.spellSlotsCurrent[level] = Number(runtimeState.spellSlotsCurrent[level] ?? 0) + 1;
  persistAndRender();
}

function spendSpellSlot(level) {
  const current = Number(runtimeState.spellSlotsCurrent[level] ?? 0);
  if (current < 1) return;

  runtimeState.spellSlotsCurrent[level] = current - 1;
  persistAndRender();
}

function applyAction(actionId) {
  const derived = deriveCharacter(characterData, runtimeState);
  const action = derived.actionLibrary.find((entry) => entry.id === actionId);
  if (!action) return;

  if (action.kind === "rest") {
    applyRest(action.id, derived);
    modalFeedbackText = "";
    persistAndRender();
    closeActionsModal();
    return;
  }

  const blockingReason = getActionBlockingReason(action);
  if (blockingReason) {
    modalFeedbackText = blockingReason;
    renderModalFeedback();
    return;
  }

  if (action.spellLevel) {
    runtimeState.spellSlotsCurrent[action.spellLevel] = Math.max(
      0,
      Number(runtimeState.spellSlotsCurrent[action.spellLevel] ?? 0) - 1
    );
  }

  const fixedPsiCost = parseFixedPsiCost(action.cost);
  if (fixedPsiCost) {
    runtimeState.psiPointsCurrent = Math.max(0, runtimeState.psiPointsCurrent - fixedPsiCost);
  }

  if (isConcentrationDuration(action.duration)) {
    clearConcentrationEffects();
  }

  if (action.autoEffectPresetId) {
    const nextEffects = new Set(runtimeState.activeEffectIds);
    nextEffects.add(action.autoEffectPresetId);
    runtimeState.activeEffectIds = [...nextEffects];
  }

  if (isConcentrationDuration(action.duration)) {
    runtimeState.concentration.active = true;
    runtimeState.concentration.name = action.name;
  }

  modalFeedbackText = "";
  persistAndRender();
  closeActionsModal();
}

function getActionBlockingReason(action) {
  if (action.kind === "rest") {
    return "";
  }

  if (action.spellLevel) {
    const currentSlots = Number(runtimeState.spellSlotsCurrent[action.spellLevel] ?? 0);
    if (currentSlots < 1) {
      return `Нет доступной ячейки ${action.spellLevel} уровня. Сначала создай её в блоке ресурсов.`;
    }
  }

  if (hasVariablePsiCost(action.cost)) {
    return "Для этого действия нужно вручную выбрать, сколько пси-очков потратить.";
  }

  const fixedPsiCost = parseFixedPsiCost(action.cost);
  if (fixedPsiCost > runtimeState.psiPointsCurrent) {
    return `Недостаточно пси-очков: нужно ${fixedPsiCost}, сейчас ${runtimeState.psiPointsCurrent}.`;
  }

  if (action.id === "potion-of-superior-healing") {
    return "Расход зелий пока не автоматизирован.";
  }

  if (action.id === "wish-luck-blade") {
    return "Wish лучше отмечать вручную: эффект и формулировка зависят от решения мастера.";
  }

  if (action.id === "psionic-mastery") {
    return "Psionic Mastery пока не автоматизирован: специальные пси-очки нужно отметить вручную.";
  }

  if (!action.autoEffectPresetId && !isConcentrationDuration(action.duration) && !action.spellLevel && !fixedPsiCost) {
    return "Для этого действия пока нет безопасного автоматического применения.";
  }

  return "";
}

function clearConcentrationEffects() {
  const concentrationEffectIds = new Set(
    characterData.effectPresets
      .filter((effect) => isConcentrationDuration(effect.duration))
      .map((effect) => effect.id)
  );

  runtimeState.activeEffectIds = runtimeState.activeEffectIds.filter((id) => !concentrationEffectIds.has(id));
}

function applyRest(restId, derived) {
  if (restId === "short-rest") {
    applyShortRest(derived);
    return;
  }

  if (restId === "long-rest") {
    applyLongRest(derived);
  }
}

function applyShortRest(derived) {
  const remainingEffects = runtimeState.activeEffectIds.filter((effectId) => {
    const effect = characterData.effectPresets.find((entry) => entry.id === effectId);
    return effect && !expiresOnShortRest(effect);
  });
  runtimeState.activeEffectIds = remainingEffects;

  if (runtimeState.concentration.active) {
    const hasRemainingConcentrationEffect = remainingEffects.some((effectId) => {
      const effect = characterData.effectPresets.find((entry) => entry.id === effectId);
      return effect && isConcentrationDuration(effect.duration);
    });

    if (concentrationExpiresOnShortRest(derived) || (!runtimeState.concentration.name && !hasRemainingConcentrationEffect)) {
      runtimeState.concentration.active = false;
      runtimeState.concentration.name = "";
    }
  }
}

function applyLongRest(derived) {
  const effectiveMaxHp = derived.hpMax + runtimeState.maxHpAdjustment;
  const recoveredHitDice = Math.max(1, Math.floor(derived.data.identity.level / 2));

  runtimeState.hpCurrent = Math.max(0, effectiveMaxHp);
  runtimeState.tempHp = 0;
  runtimeState.psiPointsCurrent = derived.progression.psiPoints;
  runtimeState.spellSlotsCurrent = Object.fromEntries(
    Object.keys(characterData.stateDefaults.spellSlotsCurrent).map((level) => [level, 0])
  );
  runtimeState.hitDiceCurrent = Math.min(
    derived.data.identity.level,
    runtimeState.hitDiceCurrent + recoveredHitDice
  );
  runtimeState.luckyPointsCurrent = characterData.stateDefaults.luckyPointsCurrent;
  runtimeState.psionicMasteryUsesCurrent = derived.progression.psionicMasteryUses;
  runtimeState.concentration.active = false;
  runtimeState.concentration.name = "";
  runtimeState.psionicFocusId = null;
  runtimeState.activeEffectIds = [];
}

function concentrationExpiresOnShortRest(derived) {
  const effectByName = characterData.effectPresets.find((effect) => effect.name === runtimeState.concentration.name);
  if (effectByName) {
    return expiresOnShortRest(effectByName);
  }

  const actionByName = derived.actionLibrary.find((action) => action.name === runtimeState.concentration.name);
  return actionByName ? durationExpiresOnShortRest(actionByName.duration) : false;
}

function expiresOnShortRest(effect) {
  if (effect.id === "predestined-victory") {
    return true;
  }

  return durationExpiresOnShortRest(effect.duration);
}

function durationExpiresOnShortRest(duration) {
  const normalized = String(duration ?? "").trim().toLowerCase().replace(/ё/g, "е");
  if (!normalized) return false;

  if (/раунд|мгновенн|мину/.test(normalized)) {
    return true;
  }

  if (/до\s*1\s*час/.test(normalized) || /^1\s*час$/.test(normalized)) {
    return true;
  }

  return false;
}

function parseFixedPsiCost(cost) {
  const match = String(cost ?? "").trim().match(/^(\d+)\s*пси$/i);
  return match ? Number(match[1]) : 0;
}

function hasVariablePsiCost(cost) {
  return /\d+\s*-\s*\d+\s*пси/i.test(String(cost ?? ""));
}

function isConcentrationDuration(duration) {
  return /^концентрация/i.test(String(duration ?? "").trim());
}

function persistAndRender() {
  saveState();
  render();
}

function openActionsModal(type) {
  const derived = deriveCharacter(characterData, runtimeState);
  const modal = document.querySelector("#actions-modal");
  const actions = derived.actionLibrary.filter((action) => action.type === type);

  activeModalContext = { type, actions };
  modalFeedbackText = "";
  document.querySelector("#modal-type-label").textContent = humanActionType(type);
  document.querySelector("#modal-title").textContent = titleByActionType(type);
  document.querySelector("#modal-search-input").value = "";
  renderModalFeedback();
  renderModalSearchResults();
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.querySelector("#modal-search-input").focus();
}

function closeActionsModal() {
  const modal = document.querySelector("#actions-modal");
  activeModalContext = null;
  modalFeedbackText = "";
  renderModalFeedback();
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function renderModalSearchResults() {
  if (!activeModalContext) return;

  const query = document.querySelector("#modal-search-input").value.trim();
  const normalizedQuery = normalizeSearchText(query);
  const filteredActions = normalizedQuery
    ? activeModalContext.actions.filter((action) => buildActionSearchText(action).includes(normalizedQuery))
    : activeModalContext.actions;

  document.querySelector("#modal-actions-list").innerHTML = filteredActions.length
    ? filteredActions.map((action) => `
        <article class="modal-card modal-action-card" data-apply-action-id="${action.id}">
          <strong>${action.name}</strong>
          <p>${action.summary}</p>
          <div class="detail-row"><span>${action.source}</span><span>${action.cost ?? "без стоимости"}</span></div>
          <div class="detail-row"><span>${action.range ?? "—"}</span><span>${action.duration ?? "—"}</span></div>
        </article>
      `).join("")
    : `
        <article class="modal-card">
          <strong>${query ? "Ничего не найдено" : "Нет способностей"}</strong>
          <p>${query ? `По запросу «${query}» нет совпадений в этой категории.` : "Сейчас для этой категории нечего показать."}</p>
        </article>
      `;
}

function buildActionSearchText(action) {
  return normalizeSearchText([
    action.name,
    action.summary,
    action.source,
    action.cost,
    action.range,
    action.duration
  ].filter(Boolean).join(" "));
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .trim();
}

function humanActionType(type) {
  const labels = {
    action: "Действие",
    bonus: "Бонусное действие",
    reaction: "Реакция",
    special: "Особое"
  };
  return labels[type] ?? type;
}

function titleByActionType(type) {
  const labels = {
    action: "Доступные действия",
    bonus: "Доступные бонусные действия",
    reaction: "Доступные реакции",
    special: "Особые способности"
  };
  return labels[type] ?? "Действия";
}

function formatTalentDamage(talent, derived) {
  const level = derived.data.identity.level;
  const thresholds = Object.keys(talent.damage.baseDiceByLevel)
    .map(Number)
    .sort((a, b) => a - b);

  let diceCount = 1;
  for (const threshold of thresholds) {
    if (level >= threshold) {
      diceCount = talent.damage.baseDiceByLevel[threshold];
    }
  }

  const abilityBonus = talent.damage.abilityModifier
    ? derived.abilities[talent.damage.abilityModifier].mod
    : 0;

  return `${diceCount}${talent.damage.die}${abilityBonus >= 0 ? "+" : ""}${abilityBonus} ${talent.damage.damageType}`;
}

function readNumber(selector) {
  return Number(document.querySelector(selector).value || 0);
}

main().catch((error) => {
  document.body.innerHTML = `
    <main class="page-shell">
      <section class="panel">
        <p class="eyebrow">Ошибка загрузки</p>
        <h1>Страница не запустилась</h1>
        <p class="hero-subtitle">${error.message}</p>
        <p class="hero-subtitle">Для локального запуска используй <code>run-local.command</code> или подними сервер командой <code>python3 -m http.server 8000</code>.</p>
      </section>
    </main>
  `;
});

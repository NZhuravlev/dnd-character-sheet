const CHARACTER_URL = "./data/character.json";
const STORAGE_KEY = "student-prizmari-combat-state-v1";
const characterModuleData =
  typeof window !== "undefined" && window.__CHARACTER_DATA__
    ? window.__CHARACTER_DATA__
    : null;

const ABILITY_ORDER = ["str", "dex", "con", "int", "wis", "cha"];

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

async function main() {
  characterData = await loadCharacter();
  runtimeState = loadState(characterData);
  render();
  wireUi();
}

async function loadCharacter() {
  if (window.location.protocol === "file:") {
    if (characterModuleData) {
      return structuredClone(characterModuleData);
    }

    throw new Error("Не удалось получить данные персонажа из локального fallback-файла.");
  }

  try {
    const response = await fetch(CHARACTER_URL);
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    if (characterModuleData) {
      return structuredClone(characterModuleData);
    }

    throw error;
  }

  if (characterModuleData) {
    return structuredClone(characterModuleData);
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
    return { ...defaults, ...JSON.parse(saved), concentration: { ...defaults.concentration, ...JSON.parse(saved).concentration } };
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
  renderResources(derived);
  renderAbilities(derived);
  renderCombat(derived);
  renderSaves(derived);
  renderSkills(derived);
  renderDisciplines(derived);
  renderTalents(derived);
  renderSpells(derived);
  renderFeatures(derived);
  renderItems(derived);
  renderEquipment(derived);
  renderCurrency(derived);
  renderFocusControls(derived);
  renderEffectsControls(derived);
  renderConditions(derived);
  renderState(derived);
}

window.__openActions = (type) => openActionsModal(type);

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
    abilities[key] = {
      key,
      label: source.label,
      base: source.base,
      max: source.max,
      score: source.base
    };
  }

  for (const item of data.items) {
    if (!item.bonuses) continue;
    if (item.requiresAttunement && !item.attuned) continue;
    if (item.equipped === false && !item.consumed) continue;

    for (const [abilityKey, payload] of Object.entries(item.bonuses)) {
      if (payload.max) {
        abilities[abilityKey].max = evaluateFormula(payload.max, abilities[abilityKey].max, { abilities });
      }
      if (payload.score) {
        abilities[abilityKey].score = evaluateFormula(payload.score, abilities[abilityKey].score, { abilities });
      }
    }
  }

  for (const key of ABILITY_ORDER) {
    abilities[key].score = Math.min(abilities[key].score, abilities[key].max);
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
    if (feature.kind === "passive" || feature.kind === "special") continue;
    actions.push({
      name: feature.name,
      type: feature.kind,
      source: "Умение класса",
      summary: feature.summary
    });
  }

  for (const spell of data.spells) {
    actions.push({
      name: spell.name,
      type: normalizeActionType(spell.castingTime),
      source: `Заклинание ${spell.level} уровня`,
      range: spell.range,
      duration: spell.duration,
      summary: spell.summary
    });
  }

  for (const discipline of data.disciplines) {
    for (const effect of discipline.effects) {
      const type = normalizeActionType(effect.type);
      if (!type) continue;
      actions.push({
        name: effect.name,
        type,
        source: discipline.name,
        cost: effect.cost,
        range: effect.range,
        duration: effect.duration,
        summary: effect.summary
      });
    }
  }

  for (const talent of data.talents) {
    actions.push({
      name: talent.name,
      type: normalizeActionType(talent.type),
      source: "Псионический талант",
      cost: "0 пси",
      range: talent.range,
      duration: talent.duration,
      summary: talent.summary
    });
  }

  actions.push({
    name: "Зелье превосходного лечения",
    type: "action",
    source: "Предмет",
    summary: "8d4 + 8 хитов; расходует зелье."
  });

  actions.push({
    name: "Wish (Клинок удачи)",
    type: "action",
    source: "Клинок удачи",
    summary: "1 оставшееся исполнение желания; точный эффект зависит от формулировки и решения мастера."
  });

  return actions;
}

function normalizeActionType(rawType) {
  if (!rawType) return null;
  const map = {
    action: "action",
    bonus: "bonus",
    reaction: "reaction",
    special: null
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
    `XP ${derived.data.identity.xp.toLocaleString("ru-RU")}`,
    `PB ${formatModifier(derived.proficiencyBonus)}`,
    `КС ${derived.spell.saveDC}`,
    `Пси-атака ${formatModifier(derived.spell.attackBonus)}`,
    `Пассивное восприятие ${derived.passivePerception}`,
    `Телепатия 120 фт.`
  ];

  document.querySelector("#hero-tags").innerHTML = tags
    .map((tag, index) => `<span class="tag ${index < 2 ? "strong" : ""}">${tag}</span>`)
    .join("");
}

function renderResources(derived) {
  const state = derived.state;
  const effectiveMaxHp = derived.hpMax + state.maxHpAdjustment;
  const resources = [
    { label: "Хиты", value: `${Math.max(0, state.hpCurrent)}/${effectiveMaxHp}` },
    { label: "КД", value: `${derived.armorClass}` },
    { label: "Инициатива", value: `${formatModifier(derived.initiative)}` },
    { label: "Скорость", value: `${derived.speed.walk} фт.` },
    { label: "Пси-очки", value: `${state.psiPointsCurrent}/${derived.progression.psiPoints}` },
    { label: "Пси-лимит", value: `${derived.progression.psiLimit}` },
    { label: "Lucky", value: `${state.luckyPointsCurrent}/3` },
    { label: "Psionic Mastery", value: `${state.psionicMasteryUsesCurrent}/${derived.progression.psionicMasteryUses}` }
  ];

  document.querySelector("#resource-strip").innerHTML = resources
    .map(
      (resource) => `
        <article class="resource-card">
          <strong>${resource.label}</strong>
          <span>${resource.value}</span>
        </article>
      `
    )
    .join("");
}

function renderAbilities(derived) {
  document.querySelector("#abilities-grid").innerHTML = ABILITY_ORDER.map((key) => {
    const ability = derived.abilities[key];
    const changed = ability.score !== ability.base || ability.max !== derived.data.abilities[key].max;
    const meta = changed
      ? `base ${ability.base}, cap ${ability.max}`
      : `base ${ability.base}`;

    return `
      <article class="ability-card">
        <div class="ability-top">
          <strong>${ability.label}</strong>
          <span class="ability-mod">${formatModifier(ability.mod)}</span>
        </div>
        <span class="ability-score">${ability.score}</span>
        <span class="ability-meta">${meta}</span>
      </article>
    `;
  }).join("");
}

function renderCombat(derived) {
  const overview = [
    { label: "Сложность спасброска", value: `${derived.spell.saveDC}` },
    { label: "Пси / spell attack", value: `${formatModifier(derived.spell.attackBonus)}` },
    { label: "Спасбросок Int", value: `${formatModifier(derived.saves.int)}` },
    { label: "Спасбросок Wis", value: `${formatModifier(derived.saves.wis)}` }
  ];

  document.querySelector("#combat-overview").innerHTML = overview
    .map(
      (item) => `
        <article class="resource-card">
          <strong>${item.label}</strong>
          <span>${item.value}</span>
        </article>
      `
    )
    .join("");

  document.querySelector("#weapons-grid").innerHTML = derived.weapons
    .map(
      (weapon) => `
        <article class="weapon-card">
          <div class="weapon-row">
            <strong>${weapon.name}</strong>
            <span>${formatModifier(weapon.attackBonus)}</span>
          </div>
          <p>${weapon.damageDie}${weapon.damageBonus >= 0 ? "+" : ""}${weapon.damageBonus} ${weapon.damageType}</p>
          <p>${weapon.properties.length ? weapon.properties.join(" · ") : "Без особых свойств"}</p>
        </article>
      `
    )
    .join("");
}

function renderSaves(derived) {
  document.querySelector("#saving-throws-list").innerHTML = ABILITY_ORDER.map((key) => `
    <div class="metric-row">
      <strong>${derived.abilities[key].label}</strong>
      <span>${formatModifier(derived.saves[key])}</span>
    </div>
  `).join("");
}

function renderSkills(derived) {
  document.querySelector("#skills-list").innerHTML = Object.entries(SKILL_DEFINITIONS).map(([key, definition]) => `
    <div class="metric-row">
      <strong>${definition.label}</strong>
      <span>${formatModifier(derived.skills[key])}</span>
    </div>
  `).join("");
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
  const feats = derived.data.feats.map((feat) => ({
    name: feat.name,
    summary: feat.summary,
    source: "Фит"
  }));

  const features = derived.data.classFeatures.map((feature) => ({
    name: feature.name,
    summary: feature.summary,
    source: "Класс"
  }));

  document.querySelector("#features-list").innerHTML = [...features, ...feats].map((entry) => `
    <article class="stack-card">
      <strong>${entry.name}</strong>
      <p>${entry.summary}</p>
      <div class="detail-row"><span>${entry.source}</span></div>
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
  document.querySelector("#psi-input").value = derived.state.psiPointsCurrent;
  document.querySelector("#hit-dice-input").value = derived.state.hitDiceCurrent;
  document.querySelector("#lucky-input").value = derived.state.luckyPointsCurrent;
  document.querySelector("#mastery-input").value = derived.state.psionicMasteryUsesCurrent;
  document.querySelector("#temp-hp-input").value = derived.state.tempHp;
  document.querySelector("#max-hp-adjustment").value = derived.state.maxHpAdjustment;
  document.querySelector("#concentration-active").checked = derived.state.concentration.active;
  document.querySelector("#concentration-name").value = derived.state.concentration.name;
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

function wireUi() {
  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest(".action-trigger");
    if (actionButton) {
      openActionsModal(actionButton.dataset.actionType);
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

  document.querySelector("#damage-button").addEventListener("click", () => applyHitChange(-readNumber("#hp-adjustment")));
  document.querySelector("#heal-button").addEventListener("click", () => applyHitChange(readNumber("#hp-adjustment")));
  document.querySelector("#temp-hp-button").addEventListener("click", () => {
    runtimeState.tempHp = Math.max(0, readNumber("#temp-hp-input"));
    persistAndRender();
  });
  document.querySelector("#max-hp-button").addEventListener("click", () => {
    runtimeState.maxHpAdjustment = readNumber("#max-hp-adjustment");
    persistAndRender();
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

function persistAndRender() {
  saveState();
  render();
}

function openActionsModal(type) {
  const derived = deriveCharacter(characterData, runtimeState);
  const modal = document.querySelector("#actions-modal");
  const actions = derived.actionLibrary.filter((action) => action.type === type);

  document.querySelector("#modal-type-label").textContent = humanActionType(type);
  document.querySelector("#modal-title").textContent = titleByActionType(type);
  document.querySelector("#modal-actions-list").innerHTML = actions.map((action) => `
    <article class="modal-card">
      <strong>${action.name}</strong>
      <p>${action.summary}</p>
      <div class="detail-row"><span>${action.source}</span><span>${action.cost ?? "без стоимости"}</span></div>
      <div class="detail-row"><span>${action.range ?? "—"}</span><span>${action.duration ?? "—"}</span></div>
    </article>
  `).join("");

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeActionsModal() {
  const modal = document.querySelector("#actions-modal");
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function humanActionType(type) {
  const labels = {
    action: "Действие",
    bonus: "Бонусное действие",
    reaction: "Реакция"
  };
  return labels[type] ?? type;
}

function titleByActionType(type) {
  const labels = {
    action: "Доступные действия",
    bonus: "Доступные бонусные действия",
    reaction: "Доступные реакции"
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
        <p class="hero-subtitle">Если ты открыл файл напрямую через file://, подними простой локальный сервер, например: <code>python3 -m http.server 8000</code></p>
      </section>
    </main>
  `;
});

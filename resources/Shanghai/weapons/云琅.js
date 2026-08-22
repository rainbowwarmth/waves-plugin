const wiki = {"id": "1538900888550293504", "name": "云琅", "lastUpdateTime": "2026-08-20", "currentVersion": "4.0", "effectText": "却邪\n谐振(1/2/3/4/5)阶\n攻击提升（12%/15%/18%/21%/24%）。附加集谐偏移后，获得气动伤害加成提升（11.2%/14%/16.8%/19.6%/22.4%），持续2秒，最多叠加5层，该效果每0.5秒可触发1次。达到上限后，获得下列效果：\n·该气动伤害加成提升效果持续时间延长至30秒。\n·效果持续期间，气动伤害无视目标（10%/12.5%/15%/17.5%/20%）的防御。\n云烟缭绕，凝水天一碧；疏影横斜，伴落英缤纷。\n愿执玉锋入尘间，涤荡浊岁，斩却诸邪。\n获取途径：唤取"};

const EFFECT = {
  attack: { 1: 0.12, 2: 0.15, 3: 0.18, 4: 0.21, 5: 0.24 },
  aeroDamagePerStack: { 1: 0.112, 2: 0.14, 3: 0.168, 4: 0.196, 5: 0.224 },
  defenseIgnore: { 1: 0.10, 2: 0.125, 3: 0.15, 4: 0.175, 5: 0.20 },
  maxStacks: 5
};

function pick(map, reson) {
  return map ? Number(map[reson] ?? map[1] ?? 0) : 0;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

export default {
  name: "云琅",
  wiki,

  apply({ panel, options }) {
    const reson = Math.max(1, Math.min(5, Number(panel?.weaponResonLevel || 1)));
    const triggerActive = options?.yunlangEffectActive
      ?? options?.weaponEffectActive
      ?? true;
    const stacks = clamp(
      options?.yunlangStacks ?? options?.effectStacks ?? EFFECT.maxStacks,
      0,
      EFFECT.maxStacks
    );
    const buff = {
      attackPercent: pick(EFFECT.attack, reson),
      damageBonus: 0,
      ignoreDefense: 0,
      source: "云琅"
    };

    if (triggerActive) {
      buff.damageBonus = pick(EFFECT.aeroDamagePerStack, reson) * stacks;
      if (stacks >= EFFECT.maxStacks) {
        buff.ignoreDefense = pick(EFFECT.defenseIgnore, reson);
      }
    }
    return buff;
  }
};

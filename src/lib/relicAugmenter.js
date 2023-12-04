import { v4 as uuidv4 } from 'uuid';

export const RelicAugmenter = {
  augment: function(relic) {
    // console.log('Augmenting relic', relic)
    let augmentedStats = {}

    let mainStat = relic.main.stat
    let mainMaxValue = relic.main.value

    augmentedStats.mainStat = mainStat
    augmentedStats.mainValue = mainMaxValue

    for (let substat of relic.substats) {
      let stat = substat.stat
      let value = substat.value

      augmentedStats[stat] = value
    }

    if (!relic.id) {
      relic.id = uuidv4()
    }
    relic.augmentedStats = augmentedStats
    fixAugmentedStats([relic])
    calculateRelicRatings(relic)
    return relic
  }
}

function calculateRelicRatings(relic) {
  let cs = relic.augmentedStats[Constants.Stats.CD] * 100 + 
           relic.augmentedStats[Constants.Stats.CR] * 100 * 2 + 
           relic.augmentedStats[Constants.Stats.SPD] * 2.6

  let ss = relic.augmentedStats[Constants.Stats.DEF_P] * 100 * 1.2 +
           relic.augmentedStats[Constants.Stats.HP_P] * 100 * 1.5 + 
           relic.augmentedStats[Constants.Stats.RES] * 100 * 1.5 +
           relic.augmentedStats[Constants.Stats.SPD] * 2.6

  let ds = relic.augmentedStats[Constants.Stats.ATK_P] * 100 * 1.5 +
           relic.augmentedStats[Constants.Stats.EHR] * 100 * 1.5 + 
           relic.augmentedStats[Constants.Stats.BE] * 100 +
           relic.augmentedStats[Constants.Stats.SPD] * 2.6

  relic.cs = cs           
  relic.ss = ss           
  relic.ds = ds           
}

function isFlat(stat) {
  if (
    stat == Constants.Stats.HP ||
    stat == Constants.Stats.ATK || 
    stat == Constants.Stats.DEF || 
    stat == Constants.Stats.SPD
  ) {
    return true;
  }
  return false;
}
function fixAugmentedStats(relics) {
  return relics.map(x => {
    for (let stat of Object.values(Constants.Stats)) {
      x.augmentedStats[stat] = x.augmentedStats[stat] || 0
      if (!isFlat(stat)) {
        if (x.augmentedStats.mainStat == stat) {
          x.augmentedStats.mainValue = x.augmentedStats.mainValue / 100
        }
        x.augmentedStats[stat] = x.augmentedStats[stat] / 100
      }
    }
    return x
  })
}
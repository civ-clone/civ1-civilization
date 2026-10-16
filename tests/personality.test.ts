import * as Advances from '@civ-clone/civ1-science/Advances';
import {
  AbrahamLincoln,
  AlexanderTheGreat,
  ElizabethI,
  FrederickTheGreat,
  GenghisKhan,
  Hammurabi,
  JosephStalin,
  JuliusCaesar,
  MahatmaGandhi,
  MaoZedong,
  MoctezumaII,
  NapoleonI,
  RamessesII,
  Shaka,
} from '../Leaders';
import {
  Gunpowder,
  NuclearPower,
  Recycling,
  Robotics,
} from '@civ-clone/civ1-science/Advances';
import {
  product,
  sum,
  union,
} from '@civ-clone/base-leader-personality/lib/combine';
import AdvanceGrade from '@civ-clone/base-leader-personality/Rules/Player/AdvanceGrade';
import AttackConfidence from '@civ-clone/base-leader-personality/Rules/Player/AttackConfidence';
import BuildWeight from '@civ-clone/base-leader-personality/Rules/Player/BuildWeight';
import Civilization from '@civ-clone/core-civilization/Civilization';
import Expansion from '@civ-clone/base-leader-personality/Rules/Player/Expansion';
import PollutionConcern from '@civ-clone/base-leader-personality/Rules/Player/PollutionConcern';
import Leader from '@civ-clone/core-civilization/Leader';
import MilitaryUnhappinessTolerance from '@civ-clone/base-leader-personality/Rules/Player/MilitaryUnhappinessTolerance';
import Player from '@civ-clone/core-player/Player';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import ScienceBias from '@civ-clone/base-leader-personality/Rules/Player/ScienceBias';
import TraitRegistry from '@civ-clone/core-civilization/TraitRegistry';
import WantedAdvances from '@civ-clone/base-leader-personality/Rules/Player/WantedAdvances';
import Wonder from '@civ-clone/core-wonder/Wonder';
import CityImprovement from '@civ-clone/core-city-improvement/CityImprovement';
import Diplomatic from '@civ-clone/base-unit-type-diplomatic/Diplomatic';
import Unit from '@civ-clone/core-unit/Unit';
import Worker from '@civ-clone/base-unit-type-worker/Worker';
import advanceGrades from '../AdvanceGrades';
import { expect } from 'chai';
import { personalityRules } from '../registerPersonality';
import registerTraits from '../registerTraits';

class Temple extends CityImprovement {}
class Pyramids extends Wonder {}
class Militia extends Unit {}
class Settlers extends Worker {}
class Caravan extends Diplomatic {}

const traitRegistry = new TraitRegistry(),
  ruleRegistry = new RuleRegistry();

registerTraits(traitRegistry);
ruleRegistry.register(...personalityRules(traitRegistry));

const playerFor = (LeaderType: typeof Leader): Player => {
  const player = new Player(),
    civilization = new Civilization();

  player.setCivilization(civilization);
  civilization.setLeader(new LeaderType(traitRegistry));

  return player;
};

// Aggressive, Expansionist, Militaristic.
const genghisKhan = playerFor(GenghisKhan),
  // Friendly, Perfectionist, normal militarism.
  gandhi = playerFor(MahatmaGandhi),
  // Friendly, normal development, Civilized.
  lincoln = playerFor(AbrahamLincoln),
  // Normal aggression, Expansionist, normal militarism.
  elizabeth = playerFor(ElizabethI);

describe('Civ1 personalities', (): void => {
  it('leans science by Ideology', (): void => {
    expect(sum(ruleRegistry, ScienceBias, genghisKhan)).equal(-1);
    expect(sum(ruleRegistry, ScienceBias, gandhi)).equal(0);
    expect(sum(ruleRegistry, ScienceBias, lincoln)).equal(1);
    expect(sum(ruleRegistry, MilitaryUnhappinessTolerance, genghisKhan)).equal(
      -1
    );
    expect(sum(ruleRegistry, MilitaryUnhappinessTolerance, lincoln)).equal(1);
  });

  it('wants Robotics, and more by militarism and mood', (): void => {
    expect(union(ruleRegistry, WantedAdvances, genghisKhan)).members([
      Robotics,
    ]);
    expect(union(ruleRegistry, WantedAdvances, gandhi)).members([
      Robotics,
      Recycling,
      NuclearPower,
    ]);
    expect(union(ruleRegistry, WantedAdvances, lincoln)).length(9);
  });

  it('keeps Settlers by Policy and Ideology', (): void => {
    expect(product(ruleRegistry, Expansion, genghisKhan)).closeTo(
      (5 / 3) * (6 / 7),
      1e-9
    );
    expect(product(ruleRegistry, Expansion, gandhi)).closeTo(1 / 3, 1e-9);
    expect(product(ruleRegistry, Expansion, elizabeth)).closeTo(5 / 3, 1e-9);
    expect(product(ruleRegistry, Expansion, lincoln)).closeTo(6 / 5, 1e-9);
  });

  it('minds pollution by Ideology and Mood', (): void => {
    expect(product(ruleRegistry, PollutionConcern, genghisKhan)).closeTo(
      0.75 * 0.75,
      1e-9
    );
    expect(product(ruleRegistry, PollutionConcern, gandhi)).equal(1.25);
    expect(product(ruleRegistry, PollutionConcern, lincoln)).closeTo(
      1.5 * 1.25,
      1e-9
    );
    expect(product(ruleRegistry, PollutionConcern, elizabeth)).equal(1);
  });

  it('weighs improvements and military units, not Wonders, Settlers or Caravans, by Ideology', (): void => {
    expect(product(ruleRegistry, BuildWeight, lincoln, Temple)).closeTo(
      4 / 3,
      1e-9
    );
    expect(product(ruleRegistry, BuildWeight, genghisKhan, Temple)).closeTo(
      2 / 3,
      1e-9
    );
    expect(product(ruleRegistry, BuildWeight, gandhi, Temple)).equal(1);
    expect(product(ruleRegistry, BuildWeight, lincoln, Pyramids)).equal(1);
    expect(product(ruleRegistry, BuildWeight, lincoln, Militia)).closeTo(
      2 / 3,
      1e-9
    );
    expect(product(ruleRegistry, BuildWeight, genghisKhan, Militia)).closeTo(
      4 / 3,
      1e-9
    );
    expect(product(ruleRegistry, BuildWeight, gandhi, Militia)).equal(1);
    expect(product(ruleRegistry, BuildWeight, genghisKhan, Settlers)).equal(1);
    expect(product(ruleRegistry, BuildWeight, lincoln, Caravan)).equal(1);
  });

  it("grades advances by v474.05's table", (): void => {
    expect(sum(ruleRegistry, AdvanceGrade, genghisKhan, Gunpowder)).equal(10);
    expect(sum(ruleRegistry, AdvanceGrade, lincoln, Gunpowder)).equal(6);
    expect(sum(ruleRegistry, AdvanceGrade, elizabeth, Gunpowder)).equal(8);
  });

  it('grades every Civ1 advance, each once', (): void => {
    const graded = advanceGrades.map(([AdvanceType]) => AdvanceType);

    expect(graded).length(new Set(graded).size);
    expect(graded).members(Object.values(Advances));
  });

  it('attacks by Mood', (): void => {
    expect(product(ruleRegistry, AttackConfidence, genghisKhan, gandhi)).equal(
      1.25
    );
    expect(product(ruleRegistry, AttackConfidence, gandhi, genghisKhan)).equal(
      0.9
    );
    expect(
      product(ruleRegistry, AttackConfidence, elizabeth, genghisKhan)
    ).equal(1);
  });

  // Every leader's Mood, Policy and Ideology (−1, 0 or 1), as book Table 7-1 (p249) and OpenCivOne's `nationTypes`
  //  give them, read back from the rules.
  (
    [
      [AbrahamLincoln, -1, 0, 1],
      [MoctezumaII, 0, -1, 1],
      [Hammurabi, -1, -1, 1],
      [MaoZedong, 0, 0, 1],
      [RamessesII, 0, 0, 1],
      [ElizabethI, 0, 1, 0],
      [NapoleonI, 1, 1, 1],
      [FrederickTheGreat, 1, -1, 1],
      [AlexanderTheGreat, 0, 1, -1],
      [MahatmaGandhi, -1, -1, 0],
      [GenghisKhan, 1, 1, -1],
      [JuliusCaesar, 0, 1, 1],
      [JosephStalin, 1, 0, -1],
      [Shaka, 1, 0, 0],
    ] as [typeof Leader, number, number, number][]
  ).forEach(([LeaderType, mood, policy, ideology]) =>
    it(`gives ${LeaderType.name} Mood ${mood}, Policy ${policy} and Ideology ${ideology}`, (): void => {
      const player = playerFor(LeaderType);

      expect(product(ruleRegistry, AttackConfidence, player, player)).equal(
        [0.9, 1, 1.25][mood + 1]
      );
      expect(product(ruleRegistry, Expansion, player)).closeTo(
        [1 / 3, 1, 5 / 3][policy + 1] * (6 / (6 - ideology)),
        1e-9
      );
      expect(sum(ruleRegistry, ScienceBias, player)).equal(ideology);
    })
  );
});

// Civ1: what each leader's personality makes a computer player do (civ-clone/web-renderer#157), as the
//  `base-leader-personality` rules for the traits `registerTraits` gives the leaders.
//
// v474.05 keeps a leader's personality as three numbers, each −1, 0 or 1 (OpenCivOne `NationDefinition.cs`): Mood
//  (Friendly to Aggressive), Policy (Perfectionist to Expansionist) and Ideology (Militaristic to Civilized). Every
//  rule here comes from one place its AI reads them, or from a decision taken where it departs from them.
import {
  Aggressive,
  Civilized,
  Expansionist,
  Friendly,
  Militaristic,
  NormalMilitarism,
  Perfectionist,
} from './Traits';
import {
  Computers,
  FusionPower,
  GeneticEngineering,
  NuclearPower,
  Plastics,
  Recycling,
  Robotics,
  SpaceFlight,
  Superconductor,
} from '@civ-clone/civ1-science/Advances';
import { Game } from '@civ-clone/core-game';
import Advance from '@civ-clone/core-science/Advance';
import AdvanceGrade from '@civ-clone/base-leader-personality/Rules/Player/AdvanceGrade';
import AttackConfidence from '@civ-clone/base-leader-personality/Rules/Player/AttackConfidence';
import BuildWeight from '@civ-clone/base-leader-personality/Rules/Player/BuildWeight';
import CityImprovement from '@civ-clone/core-city-improvement/CityImprovement';
import Diplomatic from '@civ-clone/base-unit-type-diplomatic/Diplomatic';
import Effect from '@civ-clone/core-rule/Effect';
import Expansion from '@civ-clone/base-leader-personality/Rules/Player/Expansion';
import MilitaryUnhappinessTolerance from '@civ-clone/base-leader-personality/Rules/Player/MilitaryUnhappinessTolerance';
import Player from '@civ-clone/core-player/Player';
import PollutionConcern from '@civ-clone/base-leader-personality/Rules/Player/PollutionConcern';
import Rule from '@civ-clone/core-rule/Rule';
import ScienceBias from '@civ-clone/base-leader-personality/Rules/Player/ScienceBias';
import Trait from '@civ-clone/core-civilization/Trait';
import TraitRegistry from '@civ-clone/core-civilization/TraitRegistry';
import WantedAdvances from '@civ-clone/base-leader-personality/Rules/Player/WantedAdvances';
import Unit from '@civ-clone/core-unit/Unit';
import Wonder from '@civ-clone/core-wonder/Wonder';
import Worker from '@civ-clone/base-unit-type-worker/Worker';
import advanceGrades from './AdvanceGrades';
import leaderHas from '@civ-clone/base-leader-personality/lib/leaderHas';

const isImprovement = (item: object): boolean =>
  Object.prototype.isPrototypeOf.call(CityImprovement, item) &&
  !Object.prototype.isPrototypeOf.call(Wonder, item);

// A unit built to fight: not Settlers or another worker, and not a Diplomat or Caravan.
const isMilitary = (item: object): boolean =>
  Object.prototype.isPrototypeOf.call(Unit, item) &&
  !Object.prototype.isPrototypeOf.call(Worker, item) &&
  !Object.prototype.isPrototypeOf.call(Diplomatic, item);

const gradesByAdvance = new Map<typeof Advance, [number, number]>(
  advanceGrades.map(([AdvanceType, base, ideology]) => [
    AdvanceType,
    [base, ideology],
  ])
);

// Ideology: 1 for a Civilized leader, −1 for a Militaristic one, 0 for the rest, who have no rule.
const ideologies: [typeof Trait, number][] = [
  [Civilized, 1],
  [Militaristic, -1],
];

const productiveAndClean = [Recycling, NuclearPower] as (typeof Advance)[];

export const personalityRules = (traitRegistry: TraitRegistry): Rule[] => {
  const has = <C extends [Player, ...any[]]>(TraitType: typeof Trait) =>
    leaderHas<C>(traitRegistry, TraitType);

  return [
    // Rates: science is Ideology + (10 − luxuries) / 2, and starts at Ideology + 3 (`Segment_1ade.cs` `F0_1ade_0006`,
    //  `StartGameMenu.cs` ~L555).
    ...ideologies.map(
      ([TraitType, ideology]) =>
        new ScienceBias(has(TraitType), new Effect(() => ideology))
    ),

    // The Republic: each attacking unit away from its city counts 7 − Ideology against it, 5 − Ideology with a
    //  Marketplace (`CityWorker.cs` ~L1978).
    ...ideologies.map(
      ([TraitType, ideology]) =>
        new MilitaryUnhappinessTolerance(
          has(TraitType),
          new Effect(() => ideology)
        )
    ),

    // When science stops. v474.05 stops every AI's science at Robotics. Here Robotics is only where the shortest list
    //  ends (civ-clone/web-renderer#155):
    //  - Militaristic leaders want nothing beyond it. Genghis Khan stops at Robotics, as in Civ1;
    //  - normal militarism adds Recycling and Nuclear Power, which keep cities productive and clean. Gandhi carries on
    //    until he has both;
    //  - Civilized leaders add the advances behind the late Wonders and the spaceship;
    //  - a Friendly mood adds Recycling and Nuclear Power, even to a Militaristic leader;
    //  - an Aggressive mood, and a leader's policy, add nothing.
    // Future Technology (civ-clone/web-renderer#128) is never wanted.
    new WantedAdvances(new Effect(() => [Robotics] as (typeof Advance)[])),
    new WantedAdvances(
      has(NormalMilitarism),
      new Effect(() => productiveAndClean)
    ),
    new WantedAdvances(
      has(Civilized),
      new Effect(
        () =>
          [
            Computers,
            GeneticEngineering,
            SpaceFlight,
            Plastics,
            Superconductor,
            FusionPower,
          ] as (typeof Advance)[]
      )
    ),
    new WantedAdvances(has(Friendly), new Effect(() => productiveAndClean)),

    // Expansion. v474.05 keeps a settler looking for a city site while (Policy + 1) × the sites on its continent >
    //  the player's cities there × 16 (`AIEngine.cs` ~L1336), which a Perfectionist never passes. Continents aren't
    //  known here (civ-clone/web-renderer#35), so Policy scales how many Settlers a player keeps instead: a third as
    //  many for a Perfectionist, five thirds for an Expansionist, which puts the fewest kept at 1, 3 or 5.
    //  Ideology scales them as v474.05's production menu does, where Settlers score 6 − Ideology against 16 for
    //  other units and the lowest score is built (`Segment_1ade.cs` `F0_1ade_0421`): 6/5 for a Civilized leader,
    //  6/7 for a Militaristic one.
    new Expansion(has(Perfectionist), new Effect(() => 1 / 3)),
    new Expansion(has(Expansionist), new Effect(() => 5 / 3)),
    ...ideologies.map(
      ([TraitType, ideology]) =>
        new Expansion(has(TraitType), new Effect(() => 6 / (6 - ideology)))
    ),

    // Improvements. v474.05's production menu multiplies an improvement's score by 3 / (Ideology + 3), and builds
    //  the lowest, so a Civilized leader favours them by 4/3 and a Militaristic one by 2/3. Wonders aren't scaled.
    //  Military units are weighed the other way, (3 − Ideology) / 3, which v474.05 doesn't do: its scores sit close
    //  together, but here a unit a computer player needs outscores any improvement it doesn't by far more than 4/3,
    //  so the lean only showed once units leant too (civ-clone/web-renderer#378). Settlers (`Expansion`), Diplomats
    //  and Caravans aren't scaled.
    ...ideologies.map(
      ([TraitType, ideology]) =>
        new BuildWeight(
          has(TraitType),
          new Effect((player: Player, item: object): number =>
            isImprovement(item)
              ? (ideology + 3) / 3
              : isMilitary(item)
              ? (3 - ideology) / 3
              : 1
          )
        )
    ),

    // Research: v474.05 grades each advance `base` + Ideology × `ideology` (`AdvanceGrades`).
    new AdvanceGrade(
      new Effect(
        (player: Player, AdvanceType: typeof Advance): number =>
          gradesByAdvance.get(AdvanceType)?.[0] ?? 0
      )
    ),
    ...ideologies.map(
      ([TraitType, ideology]) =>
        new AdvanceGrade(
          has(TraitType),
          new Effect(
            (player: Player, AdvanceType: typeof Advance): number =>
              ideology * (gradesByAdvance.get(AdvanceType)?.[1] ?? 0)
          )
        )
    ),

    // Attacking. v474.05 reads Mood where it weighs up war and peace in a parley (`MeetWithKing.cs` ~L567,
    //  `Segment_2517.cs` ~L1197), where an Aggressive leader feels the stronger and a Friendly one the weaker. Here
    //  the same comparison of strength decides both attacks and parleys (`shouldAttack`), so Mood scales a leader's
    //  view of its own: by 1.25 if Aggressive, 0.9 if Friendly.
    new AttackConfidence(has(Aggressive), new Effect(() => 1.25)),
    new AttackConfidence(has(Friendly), new Effect(() => 0.9)),

    // Pollution. v474.05's AI cleans up pollution it finds under a worker (`AIEngine.cs` ~L1330), whatever the leader.
    //  Here the leader decides how keen it is (civ-clone/web-renderer#366): Civilized leaders by 1.5 and Friendly ones
    //  by 1.25, Militaristic and Aggressive ones by 0.75.
    new PollutionConcern(has(Civilized), new Effect(() => 1.5)),
    new PollutionConcern(has(Friendly), new Effect(() => 1.25)),
    new PollutionConcern(has(Militaristic), new Effect(() => 0.75)),
    new PollutionConcern(has(Aggressive), new Effect(() => 0.75)),
  ];
};

export const register = (game: Game): void =>
  game.rules.register(...personalityRules(game.traits));

export default register;

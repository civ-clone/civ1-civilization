"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.personalityRules = void 0;
// Civ1: what each leader's personality makes a computer player do (civ-clone/web-renderer#157), as the
//  `base-leader-personality` rules for the traits `registerTraits` gives the leaders.
//
// v474.05 keeps a leader's personality as three numbers, each −1, 0 or 1 (OpenCivOne `NationDefinition.cs`): Mood
//  (Friendly to Aggressive), Policy (Perfectionist to Expansionist) and Ideology (Militaristic to Civilized). Every
//  rule here comes from one place its AI reads them, or from a decision taken where it departs from them.
const Traits_1 = require("./Traits");
const Advances_1 = require("@civ-clone/civ1-science/Advances");
const AdvanceGrade_1 = require("@civ-clone/base-leader-personality/Rules/Player/AdvanceGrade");
const AttackConfidence_1 = require("@civ-clone/base-leader-personality/Rules/Player/AttackConfidence");
const BuildWeight_1 = require("@civ-clone/base-leader-personality/Rules/Player/BuildWeight");
const CityImprovement_1 = require("@civ-clone/core-city-improvement/CityImprovement");
const Diplomatic_1 = require("@civ-clone/base-unit-type-diplomatic/Diplomatic");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Expansion_1 = require("@civ-clone/base-leader-personality/Rules/Player/Expansion");
const MilitaryUnhappinessTolerance_1 = require("@civ-clone/base-leader-personality/Rules/Player/MilitaryUnhappinessTolerance");
const ScienceBias_1 = require("@civ-clone/base-leader-personality/Rules/Player/ScienceBias");
const WantedAdvances_1 = require("@civ-clone/base-leader-personality/Rules/Player/WantedAdvances");
const Unit_1 = require("@civ-clone/core-unit/Unit");
const Wonder_1 = require("@civ-clone/core-wonder/Wonder");
const Worker_1 = require("@civ-clone/base-unit-type-worker/Worker");
const AdvanceGrades_1 = require("./AdvanceGrades");
const leaderHas_1 = require("@civ-clone/base-leader-personality/lib/leaderHas");
const isImprovement = (item) => Object.prototype.isPrototypeOf.call(CityImprovement_1.default, item) &&
    !Object.prototype.isPrototypeOf.call(Wonder_1.default, item);
// A unit built to fight: not Settlers or another worker, and not a Diplomat or Caravan.
const isMilitary = (item) => Object.prototype.isPrototypeOf.call(Unit_1.default, item) &&
    !Object.prototype.isPrototypeOf.call(Worker_1.default, item) &&
    !Object.prototype.isPrototypeOf.call(Diplomatic_1.default, item);
const gradesByAdvance = new Map(AdvanceGrades_1.default.map(([AdvanceType, base, ideology]) => [
    AdvanceType,
    [base, ideology],
]));
// Ideology: 1 for a Civilized leader, −1 for a Militaristic one, 0 for the rest, who have no rule.
const ideologies = [
    [Traits_1.Civilized, 1],
    [Traits_1.Militaristic, -1],
];
const productiveAndClean = [Advances_1.Recycling, Advances_1.NuclearPower];
const personalityRules = (traitRegistry) => {
    const has = (TraitType) => (0, leaderHas_1.default)(traitRegistry, TraitType);
    return [
        // Rates: science is Ideology + (10 − luxuries) / 2, and starts at Ideology + 3 (`Segment_1ade.cs` `F0_1ade_0006`,
        //  `StartGameMenu.cs` ~L555).
        ...ideologies.map(([TraitType, ideology]) => new ScienceBias_1.default(has(TraitType), new Effect_1.default(() => ideology))),
        // The Republic: each attacking unit away from its city counts 7 − Ideology against it, 5 − Ideology with a
        //  Marketplace (`CityWorker.cs` ~L1978).
        ...ideologies.map(([TraitType, ideology]) => new MilitaryUnhappinessTolerance_1.default(has(TraitType), new Effect_1.default(() => ideology))),
        // When science stops. v474.05 stops every AI's science at Robotics. Here Robotics is only where the shortest list
        //  ends (civ-clone/web-renderer#155):
        //  - Militaristic leaders want nothing beyond it. Genghis Khan stops at Robotics, as in Civ1;
        //  - normal militarism adds Recycling and Nuclear Power, which keep cities productive and clean. Gandhi carries on
        //    until he has both;
        //  - Civilized leaders add the advances behind the late Wonders and the spaceship;
        //  - a Friendly mood adds Recycling and Nuclear Power, even to a Militaristic leader;
        //  - an Aggressive mood, and a leader's policy, add nothing.
        // Future Technology (civ-clone/web-renderer#128) is never wanted.
        new WantedAdvances_1.default(new Effect_1.default(() => [Advances_1.Robotics])),
        new WantedAdvances_1.default(has(Traits_1.NormalMilitarism), new Effect_1.default(() => productiveAndClean)),
        new WantedAdvances_1.default(has(Traits_1.Civilized), new Effect_1.default(() => [
            Advances_1.Computers,
            Advances_1.GeneticEngineering,
            Advances_1.SpaceFlight,
            Advances_1.Plastics,
            Advances_1.Superconductor,
            Advances_1.FusionPower,
        ])),
        new WantedAdvances_1.default(has(Traits_1.Friendly), new Effect_1.default(() => productiveAndClean)),
        // Expansion. v474.05 keeps a settler looking for a city site while (Policy + 1) × the sites on its continent >
        //  the player's cities there × 16 (`AIEngine.cs` ~L1336), which a Perfectionist never passes. Continents aren't
        //  known here (civ-clone/web-renderer#35), so Policy scales how many Settlers a player keeps instead: a third as
        //  many for a Perfectionist, five thirds for an Expansionist, which puts the fewest kept at 1, 3 or 5.
        //  Ideology scales them as v474.05's production menu does, where Settlers score 6 − Ideology against 16 for
        //  other units and the lowest score is built (`Segment_1ade.cs` `F0_1ade_0421`): 6/5 for a Civilized leader,
        //  6/7 for a Militaristic one.
        new Expansion_1.default(has(Traits_1.Perfectionist), new Effect_1.default(() => 1 / 3)),
        new Expansion_1.default(has(Traits_1.Expansionist), new Effect_1.default(() => 5 / 3)),
        ...ideologies.map(([TraitType, ideology]) => new Expansion_1.default(has(TraitType), new Effect_1.default(() => 6 / (6 - ideology)))),
        // Improvements. v474.05's production menu multiplies an improvement's score by 3 / (Ideology + 3), and builds
        //  the lowest, so a Civilized leader favours them by 4/3 and a Militaristic one by 2/3. Wonders aren't scaled.
        //  Military units are weighed the other way, (3 − Ideology) / 3, which v474.05 doesn't do: its scores sit close
        //  together, but here a unit a computer player needs outscores any improvement it doesn't by far more than 4/3,
        //  so the lean only showed once units leant too (civ-clone/web-renderer#378). Settlers (`Expansion`), Diplomats
        //  and Caravans aren't scaled.
        ...ideologies.map(([TraitType, ideology]) => new BuildWeight_1.default(has(TraitType), new Effect_1.default((player, item) => isImprovement(item)
            ? (ideology + 3) / 3
            : isMilitary(item)
                ? (3 - ideology) / 3
                : 1))),
        // Research: v474.05 grades each advance `base` + Ideology × `ideology` (`AdvanceGrades`).
        new AdvanceGrade_1.default(new Effect_1.default((player, AdvanceType) => { var _a, _b; return (_b = (_a = gradesByAdvance.get(AdvanceType)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 0; })),
        ...ideologies.map(([TraitType, ideology]) => new AdvanceGrade_1.default(has(TraitType), new Effect_1.default((player, AdvanceType) => { var _a, _b; return ideology * ((_b = (_a = gradesByAdvance.get(AdvanceType)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : 0); }))),
        // Attacking. v474.05 reads Mood where it weighs up war and peace in a parley (`MeetWithKing.cs` ~L567,
        //  `Segment_2517.cs` ~L1197), where an Aggressive leader feels the stronger and a Friendly one the weaker. Here
        //  the same comparison of strength decides both attacks and parleys (`shouldAttack`), so Mood scales a leader's
        //  view of its own: by 1.25 if Aggressive, 0.9 if Friendly.
        new AttackConfidence_1.default(has(Traits_1.Aggressive), new Effect_1.default(() => 1.25)),
        new AttackConfidence_1.default(has(Traits_1.Friendly), new Effect_1.default(() => 0.9)),
    ];
};
exports.personalityRules = personalityRules;
const register = (game) => game.rules.register(...(0, exports.personalityRules)(game.traits));
exports.register = register;
exports.default = exports.register;
//# sourceMappingURL=registerPersonality.js.map
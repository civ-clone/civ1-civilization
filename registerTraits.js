"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTraits = void 0;
const Leaders_1 = require("./Leaders");
const TraitRegistry_1 = require("@civ-clone/core-civilization/TraitRegistry");
const Aggressive_1 = require("@civ-clone/base-leader-trait-aggression/Aggression/Aggressive");
const Civilized_1 = require("@civ-clone/base-leader-trait-militarism/Militarism/Civilized");
const Expansionist_1 = require("@civ-clone/base-leader-trait-development/Development/Expansionist");
const Friendly_1 = require("@civ-clone/base-leader-trait-aggression/Aggression/Friendly");
const Militaristic_1 = require("@civ-clone/base-leader-trait-militarism/Militarism/Militaristic");
const Normal_1 = require("@civ-clone/base-leader-trait-aggression/Aggression/Normal");
const Normal_2 = require("@civ-clone/base-leader-trait-development/Development/Normal");
const Normal_3 = require("@civ-clone/base-leader-trait-militarism/Militarism/Normal");
const Perfectionist_1 = require("@civ-clone/base-leader-trait-development/Development/Perfectionist");
const registerTraits = (traitRegistry = TraitRegistry_1.instance) => {
    // @see https://www.civfanatics.com/civ1/cia/allcivs.htm
    [
        [Leaders_1.AbrahamLincoln, Friendly_1.default, Normal_2.default, Civilized_1.default],
        [Leaders_1.MoctezumaII, Normal_1.default, Perfectionist_1.default, Civilized_1.default],
        [Leaders_1.Hammurabi, Friendly_1.default, Perfectionist_1.default, Civilized_1.default],
        [Leaders_1.MaoZedong, Normal_1.default, Normal_2.default, Civilized_1.default],
        [Leaders_1.RamessesII, Normal_1.default, Normal_2.default, Civilized_1.default],
        [Leaders_1.ElizabethI, Normal_1.default, Expansionist_1.default, Normal_3.default],
        [Leaders_1.NapoleonI, Aggressive_1.default, Expansionist_1.default, Civilized_1.default],
        [Leaders_1.FrederickTheGreat, Aggressive_1.default, Perfectionist_1.default, Civilized_1.default],
        [Leaders_1.AlexanderTheGreat, Normal_1.default, Expansionist_1.default, Militaristic_1.default],
        [Leaders_1.MahatmaGandhi, Friendly_1.default, Perfectionist_1.default, Normal_3.default],
        [Leaders_1.GenghisKhan, Aggressive_1.default, Expansionist_1.default, Militaristic_1.default],
        [Leaders_1.JuliusCaesar, Normal_1.default, Expansionist_1.default, Civilized_1.default],
        [Leaders_1.JosephStalin, Aggressive_1.default, Normal_2.default, Militaristic_1.default],
        [Leaders_1.Shaka, Aggressive_1.default, Normal_2.default, Normal_3.default],
    ].forEach(([LeaderType, ...traits]) => traits.forEach((TraitType) => traitRegistry.register(new TraitType(LeaderType))));
};
exports.registerTraits = registerTraits;
exports.default = exports.registerTraits;
//# sourceMappingURL=registerTraits.js.map
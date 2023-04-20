"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTraits = void 0;
const Leaders_1 = require("./Leaders");
const Traits_1 = require("./Traits");
const TraitRegistry_1 = require("@civ-clone/core-civilization/TraitRegistry");
const registerTraits = (traitRegistry = TraitRegistry_1.instance) => {
    // @see https://www.civfanatics.com/civ1/cia/allcivs.htm
    [
        [Leaders_1.AbrahamLincoln, Traits_1.Friendly, Traits_1.NormalDevelopment, Traits_1.Civilized],
        [Leaders_1.MoctezumaII, Traits_1.NormalAggression, Traits_1.Perfectionist, Traits_1.Civilized],
        [Leaders_1.Hammurabi, Traits_1.Friendly, Traits_1.Perfectionist, Traits_1.Civilized],
        [Leaders_1.MaoZedong, Traits_1.NormalAggression, Traits_1.NormalDevelopment, Traits_1.Civilized],
        [Leaders_1.RamessesII, Traits_1.NormalAggression, Traits_1.NormalDevelopment, Traits_1.Civilized],
        [Leaders_1.ElizabethI, Traits_1.NormalAggression, Traits_1.Expansionist, Traits_1.NormalMilitarism],
        [Leaders_1.NapoleonI, Traits_1.Aggressive, Traits_1.Expansionist, Traits_1.Civilized],
        [Leaders_1.FrederickTheGreat, Traits_1.Aggressive, Traits_1.Perfectionist, Traits_1.Civilized],
        [Leaders_1.AlexanderTheGreat, Traits_1.NormalAggression, Traits_1.Expansionist, Traits_1.Militaristic],
        [Leaders_1.MahatmaGandhi, Traits_1.Friendly, Traits_1.Perfectionist, Traits_1.NormalMilitarism],
        [Leaders_1.GenghisKhan, Traits_1.Aggressive, Traits_1.Expansionist, Traits_1.Militaristic],
        [Leaders_1.JuliusCaesar, Traits_1.NormalAggression, Traits_1.Expansionist, Traits_1.Civilized],
        [Leaders_1.JosephStalin, Traits_1.Aggressive, Traits_1.NormalDevelopment, Traits_1.Militaristic],
        [Leaders_1.Shaka, Traits_1.Aggressive, Traits_1.NormalDevelopment, Traits_1.NormalMilitarism],
    ].forEach(([LeaderType, ...traits]) => traits.forEach((TraitType) => traitRegistry.register(new TraitType(LeaderType))));
};
exports.registerTraits = registerTraits;
exports.default = exports.registerTraits;
//# sourceMappingURL=registerTraits.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLeaders = void 0;
const Leaders_1 = require("./Leaders");
const LeaderRegistry_1 = require("@civ-clone/core-civilization/LeaderRegistry");
const registerLeaders = (leaderRegistry = LeaderRegistry_1.instance) => {
    leaderRegistry.register(Leaders_1.AbrahamLincoln, Leaders_1.MoctezumaII, Leaders_1.Hammurabi, Leaders_1.MaoZedong, Leaders_1.RamessesII, Leaders_1.ElizabethI, Leaders_1.NapoleonI, Leaders_1.FrederickTheGreat, Leaders_1.AlexanderTheGreat, Leaders_1.MahatmaGandhi, Leaders_1.GenghisKhan, Leaders_1.JuliusCaesar, Leaders_1.JosephStalin, Leaders_1.Shaka);
};
exports.registerLeaders = registerLeaders;
exports.default = exports.registerLeaders;
//# sourceMappingURL=registerLeaders.js.map
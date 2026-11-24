"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const core_game_1 = require("@civ-clone/core-game");
const registerCityNames_1 = require("./registerCityNames");
const registerCivilizations_1 = require("./registerCivilizations");
const registerLeaders_1 = require("./registerLeaders");
const registerNationalThemes_1 = require("./registerNationalThemes");
const registerPersonality_1 = require("./registerPersonality");
const registerTraits_1 = require("./registerTraits");
/**
 * Civ1's civilizations, leaders, traits, city names and national themes, and the leaders' personality rules, into
 *  `game`'s own registries, so a game built with its own gets them (civ-clone/web-renderer#370).
 */
const register = (game) => {
    (0, registerCityNames_1.default)(game.cityNames);
    (0, registerCivilizations_1.default)(game.civilizations);
    (0, registerLeaders_1.default)(game.leaders);
    (0, registerNationalThemes_1.default)(game.attributes);
    (0, registerTraits_1.default)(game.traits);
    (0, registerPersonality_1.default)(game);
};
exports.register = register;
// The plugin loader imports this for its side effects. Until it passes a `Game` of its own, everything goes into the
//  default game's, as the rest of Civ1's rules do.
(0, exports.register)(core_game_1.defaultGame);
exports.default = exports.register;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_game_1 = require("@civ-clone/core-game");
const registerCityNames_1 = require("./registerCityNames");
const registerCivilizations_1 = require("./registerCivilizations");
const registerLeaders_1 = require("./registerLeaders");
const registerPersonality_1 = require("./registerPersonality");
const registerTraits_1 = require("./registerTraits");
(0, registerCityNames_1.default)();
(0, registerCivilizations_1.default)();
(0, registerLeaders_1.default)();
(0, registerTraits_1.default)();
// The plugin loader imports this for its side effects. Until it passes a `Game` of its own, the personality rules go
//  into the default game's, as the rest of Civ1's rules do.
(0, registerPersonality_1.default)(core_game_1.defaultGame);
//# sourceMappingURL=index.js.map
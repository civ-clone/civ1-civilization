"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNationalThemes = exports.nationalThemes = void 0;
const Civilizations_1 = require("./Civilizations");
const AttributeRegistry_1 = require("@civ-clone/core-civilization/AttributeRegistry");
const Attribute_1 = require("@civ-clone/core-civilization/Attribute");
/** Each civilization's own themes, as the original's data has them. */
exports.nationalThemes = new Map([
    [Civilizations_1.American, { long: 5, short: 19 }],
    [Civilizations_1.Aztec, { long: 6, short: 20 }],
    [Civilizations_1.Egyptian, { long: 7, short: 21 }],
    [Civilizations_1.Zulu, { long: 8, short: 22 }],
    [Civilizations_1.French, { long: 9, short: 23 }],
    [Civilizations_1.Roman, { long: 10, short: 24 }],
    [Civilizations_1.Russian, { long: 11, short: 25 }],
    [Civilizations_1.Greek, { long: 12, short: 26 }],
    [Civilizations_1.English, { long: 13, short: 27 }],
    [Civilizations_1.Babylonian, { long: 14, short: 28 }],
    [Civilizations_1.Chinese, { long: 15, short: 29 }],
    [Civilizations_1.Mongol, { long: 16, short: 30 }],
    [Civilizations_1.Indian, { long: 17, short: 31 }],
    [Civilizations_1.German, { long: 18, short: 32 }],
]);
const registerNationalThemes = (attributeRegistry = AttributeRegistry_1.instance) => exports.nationalThemes.forEach((theme, CivilizationType) => attributeRegistry.register(new Attribute_1.default(CivilizationType, 'nationalTheme', theme)));
exports.registerNationalThemes = registerNationalThemes;
exports.default = exports.registerNationalThemes;
//# sourceMappingURL=registerNationalThemes.js.map
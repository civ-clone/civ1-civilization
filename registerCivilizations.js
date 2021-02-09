"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Civilizations_1 = require("./Civilizations");
const CivilizationRegistry_1 = require("@civ-clone/core-civilization/CivilizationRegistry");
[Civilizations_1.American].forEach((CivilizationType) => CivilizationRegistry_1.instance.register(CivilizationType));
//# sourceMappingURL=registerCivilizations.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCityNames = void 0;
const CityName_1 = require("@civ-clone/core-civilization/CityName");
const CityNameRegistry_1 = require("@civ-clone/core-civilization/CityNameRegistry");
const registerCityNames = (cityNameRegistry = CityNameRegistry_1.instance) => {
    // List taken from Civ 1 and Civ 2 city names combined and sorted
    [
        'Bergen',
        'Cannae',
        'Capua',
        'Cordoba',
        'Cremona',
        'Crete',
        'Cunaxa',
        'Damascus',
        'Dublin',
        'Genoa',
        'Ghent',
        'Issus',
        'Lisbon',
        'Mecca',
        'Melbourne',
        'Milan',
        'Naples',
        'Pisa',
        'Prague',
        'Salamis',
        'Salzburg',
        'Seville',
        'Sidon',
        'Sydney',
        'Tarsus',
        'Toronto',
        'Turin',
        'Tyre',
        'Utica',
        'Venice',
        'Verona',
    ].forEach((name) => cityNameRegistry.register(new CityName_1.default(name, null)));
};
exports.registerCityNames = registerCityNames;
exports.default = exports.registerCityNames;
//# sourceMappingURL=registerCityNames.js.map
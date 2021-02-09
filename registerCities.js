"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CityName_1 = require("@civ-clone/core-civilization/CityName");
const CityNameRegistry_1 = require("@civ-clone/core-civilization/CityNameRegistry");
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
].forEach((name) => CityNameRegistry_1.instance.register(new CityName_1.default(name, null)));
//# sourceMappingURL=registerCities.js.map
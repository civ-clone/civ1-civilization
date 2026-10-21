import CityName from '@civ-clone/core-civilization/CityName';
import CityNameRegistry, {
  instance as cityNameRegistryInstance,
} from '@civ-clone/core-civilization/CityNameRegistry';

export const registerCityNames: (
  cityNameRegistry?: CityNameRegistry
) => void = (
  cityNameRegistry: CityNameRegistry = cityNameRegistryInstance
): void => {
  // List taken from Civ 1 and Civ 2 city names combined and sorted
  (
    [
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
      'Milan',
      'Naples',
      'Pisa',
      'Prague',
      'Salamis',
      'Salzburg',
      'Seville',
      'Sidon',
      'Tarsus',
      'Toronto',
      'Turin',
      'Tyre',
      'Utica',
      'Venice',
      'Verona',
    ] as string[]
  ).forEach((name): void =>
    cityNameRegistry.register(new CityName(name, null))
  );
};

export default registerCityNames;

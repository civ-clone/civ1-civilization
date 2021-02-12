import {
  American,
  Aztec,
  Babylonian,
  Chinese,
  Egyptian,
  English,
  French,
  German,
  Greek,
  Indian,
  Mongol,
  Roman,
  Russian,
  Zulu,
} from './Civilizations';
import {
  CivilizationRegistry,
  instance as civilizationRegistryInstance,
} from '@civ-clone/core-civilization/CivilizationRegistry';

export const registerCivilizations: (
  civilizationRegistry?: CivilizationRegistry
) => void = (
  civilizationRegistry: CivilizationRegistry = civilizationRegistryInstance
): void => {
  civilizationRegistry.register(
    American,
    Aztec,
    Babylonian,
    Chinese,
    Egyptian,
    English,
    French,
    German,
    Greek,
    Indian,
    Mongol,
    Roman,
    Russian,
    Zulu
  );
};

export default registerCivilizations;

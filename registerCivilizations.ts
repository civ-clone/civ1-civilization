import { American } from './Civilizations';
import Civilization from '@civ-clone/core-civilization/Civilization';
import { instance as civilizationRegistryInstance } from '@civ-clone/core-civilization/CivilizationRegistry';

[American].forEach((CivilizationType: typeof Civilization) =>
  civilizationRegistryInstance.register(CivilizationType)
);

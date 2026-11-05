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
  AttributeRegistry,
  instance as attributeRegistryInstance,
} from '@civ-clone/core-civilization/AttributeRegistry';
import Attribute from '@civ-clone/core-civilization/Attribute';
import Civilization from '@civ-clone/core-civilization/Civilization';

/**
 * A civilization's national theme in Civ1's music: the long version (the new game, the diplomacy screen) and the
 *  short one (a city captured, a Wonder built, an advance learned, an audience), as tune IDs in Civ1's sound driver.
 */
export type NationalTheme = { long: number; short: number };

/** Each civilization's own themes, as the original's data has them. */
export const nationalThemes: Map<typeof Civilization, NationalTheme> = new Map<
  typeof Civilization,
  NationalTheme
>([
  [American, { long: 5, short: 19 }],
  [Aztec, { long: 6, short: 20 }],
  [Egyptian, { long: 7, short: 21 }],
  [Zulu, { long: 8, short: 22 }],
  [French, { long: 9, short: 23 }],
  [Roman, { long: 10, short: 24 }],
  [Russian, { long: 11, short: 25 }],
  [Greek, { long: 12, short: 26 }],
  [English, { long: 13, short: 27 }],
  [Babylonian, { long: 14, short: 28 }],
  [Chinese, { long: 15, short: 29 }],
  [Mongol, { long: 16, short: 30 }],
  [Indian, { long: 17, short: 31 }],
  [German, { long: 18, short: 32 }],
]);

export const registerNationalThemes: (
  attributeRegistry?: AttributeRegistry
) => void = (
  attributeRegistry: AttributeRegistry = attributeRegistryInstance
): void =>
  nationalThemes.forEach((theme, CivilizationType) =>
    attributeRegistry.register(
      new Attribute(CivilizationType, 'nationalTheme', theme)
    )
  );

export default registerNationalThemes;

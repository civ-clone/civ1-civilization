import { AttributeRegistry } from '@civ-clone/core-civilization/AttributeRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
/**
 * A civilization's national theme in Civ1's music: the long version (the new game, the diplomacy screen) and the
 *  short one (a city captured, a Wonder built, an advance learned, an audience), as tune IDs in Civ1's sound driver.
 */
export type NationalTheme = {
  long: number;
  short: number;
};
/** Each civilization's own themes, as the original's data has them. */
export declare const nationalThemes: Map<typeof Civilization, NationalTheme>;
export declare const registerNationalThemes: (
  attributeRegistry?: AttributeRegistry
) => void;
export default registerNationalThemes;

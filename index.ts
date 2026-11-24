import { Game, defaultGame } from '@civ-clone/core-game';
import registerCityNames from './registerCityNames';
import registerCivilizations from './registerCivilizations';
import registerLeaders from './registerLeaders';
import registerNationalThemes from './registerNationalThemes';
import registerPersonality from './registerPersonality';
import registerTraits from './registerTraits';

/**
 * Civ1's civilizations, leaders, traits, city names and national themes, and the leaders' personality rules, into
 *  `game`'s own registries, so a game built with its own gets them (civ-clone/web-renderer#370).
 */
export const register = (game: Game): void => {
  registerCityNames(game.cityNames);
  registerCivilizations(game.civilizations);
  registerLeaders(game.leaders);
  registerNationalThemes(game.attributes);
  registerTraits(game.traits);
  registerPersonality(game);
};

// The plugin loader imports this for its side effects. Until it passes a `Game` of its own, everything goes into the
//  default game's, as the rest of Civ1's rules do.
register(defaultGame);

export default register;

import { Game } from '@civ-clone/core-game';
/**
 * Civ1's civilizations, leaders, traits, city names and national themes, and the leaders' personality rules, into
 *  `game`'s own registries, so a game built with its own gets them (civ-clone/web-renderer#370).
 */
export declare const register: (game: Game) => void;
export default register;

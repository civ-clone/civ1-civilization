import { Game } from '@civ-clone/core-game';
import Rule from '@civ-clone/core-rule/Rule';
import TraitRegistry from '@civ-clone/core-civilization/TraitRegistry';
export declare const personalityRules: (traitRegistry: TraitRegistry) => Rule[];
export declare const register: (game: Game) => void;
export default register;

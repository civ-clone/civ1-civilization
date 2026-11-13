import { Game } from '@civ-clone/core-game';
import Rule from '@civ-clone/core-rule/Rule';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import TraitRegistry from '@civ-clone/core-civilization/TraitRegistry';
export declare const isMilitary: (
  item: object,
  ruleRegistry?: RuleRegistry
) => boolean;
/**
 * The rules for the leaders' traits in `traitRegistry`. `ruleRegistry`, the game's rules, says which build items are
 *  military units, by their unit traits; without it, by their classes.
 */
export declare const personalityRules: (
  traitRegistry: TraitRegistry,
  ruleRegistry?: RuleRegistry
) => Rule[];
export declare const register: (game: Game) => void;
export default register;

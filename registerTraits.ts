import {
  AbrahamLincoln,
  AlexanderTheGreat,
  ElizabethI,
  FrederickTheGreat,
  GenghisKhan,
  Hammurabi,
  JosephStalin,
  JuliusCaesar,
  MahatmaGandhi,
  MaoZedong,
  MoctezumaII,
  NapoleonI,
  RamessesII,
  Shaka,
} from './Leaders';
import {
  TraitRegistry,
  instance as traitRegistryInstance,
} from '@civ-clone/core-civilization/TraitRegistry';
import Aggressive from '@civ-clone/base-leader-trait-aggression/Aggression/Aggressive';
import Civilized from '@civ-clone/base-leader-trait-militarism/Militarism/Civilized';
import Expansionist from '@civ-clone/base-leader-trait-development/Development/Expansionist';
import Friendly from '@civ-clone/base-leader-trait-aggression/Aggression/Friendly';
import Leader from '@civ-clone/core-civilization/Leader';
import Militaristic from '@civ-clone/base-leader-trait-militarism/Militarism/Militaristic';
import NormalAggression from '@civ-clone/base-leader-trait-aggression/Aggression/Normal';
import NormalDevelopment from '@civ-clone/base-leader-trait-development/Development/Normal';
import NormalMilitarism from '@civ-clone/base-leader-trait-militarism/Militarism/Normal';
import Perfectionist from '@civ-clone/base-leader-trait-development/Development/Perfectionist';

type LeaderTrait =
  | typeof Friendly
  | typeof NormalAggression
  | typeof Aggressive
  | typeof Perfectionist
  | typeof NormalDevelopment
  | typeof Expansionist
  | typeof Civilized
  | typeof NormalMilitarism
  | typeof Militaristic;

export const registerTraits: (traitRegistry?: TraitRegistry) => void = (
  traitRegistry: TraitRegistry = traitRegistryInstance
): void => {
  // @see https://www.civfanatics.com/civ1/cia/allcivs.htm
  (
    [
      [AbrahamLincoln, Friendly, NormalDevelopment, Civilized],
      [MoctezumaII, NormalAggression, Perfectionist, Civilized],
      [Hammurabi, Friendly, Perfectionist, Civilized],
      [MaoZedong, NormalAggression, NormalDevelopment, Civilized],
      [RamessesII, NormalAggression, NormalDevelopment, Civilized],
      [ElizabethI, NormalAggression, Expansionist, NormalMilitarism],
      [NapoleonI, Aggressive, Expansionist, Civilized],
      [FrederickTheGreat, Aggressive, Perfectionist, Civilized],
      [AlexanderTheGreat, NormalAggression, Expansionist, Militaristic],
      [MahatmaGandhi, Friendly, Perfectionist, NormalMilitarism],
      [GenghisKhan, Aggressive, Expansionist, Militaristic],
      [JuliusCaesar, NormalAggression, Expansionist, Civilized],
      [JosephStalin, Aggressive, NormalDevelopment, Militaristic],
      [Shaka, Aggressive, NormalDevelopment, NormalMilitarism],
    ] as [typeof Leader, ...LeaderTrait[]][]
  ).forEach(([LeaderType, ...traits]): void =>
    traits.forEach((TraitType: LeaderTrait): void =>
      traitRegistry.register(new TraitType(LeaderType))
    )
  );
};

export default registerTraits;

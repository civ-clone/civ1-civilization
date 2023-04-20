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
  Aggressive,
  Civilized,
  Expansionist,
  Friendly,
  Militaristic,
  NormalAggression,
  NormalDevelopment,
  NormalMilitarism,
  Perfectionist,
} from './Traits';
import {
  TraitRegistry,
  instance as traitRegistryInstance,
} from '@civ-clone/core-civilization/TraitRegistry';
import Leader from '@civ-clone/core-civilization/Leader';

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

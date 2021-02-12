import {
  AbrahamLincoln,
  MoctezumaII,
  Hammurabi,
  MaoZedong,
  RamessesII,
  ElizabethI,
  NapoleonI,
  FrederickTheGreat,
  AlexanderTheGreat,
  MahatmaGandhi,
  GenghisKhan,
  JuliusCaesar,
  JosephStalin,
  Shaka,
} from './Leaders';
import {
  LeaderRegistry,
  instance as leaderRegistryInstance,
} from '@civ-clone/core-civilization/LeaderRegistry';

export const registerLeaders: (leaderRegistry?: LeaderRegistry) => void = (
  leaderRegistry: LeaderRegistry = leaderRegistryInstance
): void => {
  leaderRegistry.register(
    AbrahamLincoln,
    MoctezumaII,
    Hammurabi,
    MaoZedong,
    RamessesII,
    ElizabethI,
    NapoleonI,
    FrederickTheGreat,
    AlexanderTheGreat,
    MahatmaGandhi,
    GenghisKhan,
    JuliusCaesar,
    JosephStalin,
    Shaka
  );
};

export default registerLeaders;

import { Game } from '@civ-clone/core-game';
import { expect } from 'chai';
import { instance as leaderRegistryInstance } from '@civ-clone/core-civilization/LeaderRegistry';
import register from '../index';

// A game built with its own registries gets the civilizations, leaders, traits and city names in them
//  (civ-clone/web-renderer#370).
describe('register', (): void => {
  it("fills a game's own registries", (): void => {
    const game = new Game(),
      defaultLeaders = leaderRegistryInstance.length;

    register(game);

    expect(game.civilizations.entries()).to.not.be.empty;
    expect(game.leaders.entries()).to.have.length(game.civilizations.length);
    expect(game.traits.entries()).to.not.be.empty;
    expect(game.cityNames.entries()).to.not.be.empty;
    expect(game.attributes.entries()).to.not.be.empty;
    expect(leaderRegistryInstance.length).to.equal(defaultLeaders);
  });
});

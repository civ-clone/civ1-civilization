import { defaultGame } from '@civ-clone/core-game';
import registerCityNames from './registerCityNames';
import registerCivilizations from './registerCivilizations';
import registerLeaders from './registerLeaders';
import registerPersonality from './registerPersonality';
import registerTraits from './registerTraits';

registerCityNames();
registerCivilizations();
registerLeaders();
registerTraits();
// The plugin loader imports this for its side effects. Until it passes a `Game` of its own, the personality rules go
//  into the default game's, as the rest of Civ1's rules do.
registerPersonality(defaultGame);

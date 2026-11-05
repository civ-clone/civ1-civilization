import * as Civilizations from '../Civilizations';
import AttributeRegistry from '@civ-clone/core-civilization/AttributeRegistry';
import Civilization from '@civ-clone/core-civilization/Civilization';
import { expect } from 'chai';
import registerNationalThemes from '../registerNationalThemes';

describe('registerNationalThemes', (): void => {
  const attributeRegistry = new AttributeRegistry();

  registerNationalThemes(attributeRegistry);

  const themeOf = (CivilizationType: typeof Civilization) =>
    attributeRegistry
      .getByCivilization(CivilizationType)
      .filter((attribute) => attribute.name() === 'nationalTheme')
      .map((attribute) => attribute.value());

  it('gives each of the 14 civilizations exactly one theme', (): void => {
    const civilizations = Object.values(
      Civilizations
    ) as (typeof Civilization)[];

    expect(civilizations).to.have.lengthOf(14);
    civilizations.forEach((CivilizationType) =>
      expect(themeOf(CivilizationType)).to.have.lengthOf(1)
    );
  });

  it('uses each of the original tunes once: long 5-18, short 19-32', (): void => {
    const themes = (
      Object.values(Civilizations) as (typeof Civilization)[]
    ).map((CivilizationType) => themeOf(CivilizationType)[0]);

    expect(themes.map(({ long }) => long).sort((a, b) => a - b)).to.eql([
      5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    ]);
    themes.forEach(({ long, short }) => expect(short).to.equal(long + 14));
  });

  it('has the Romans on 10 and 24', (): void => {
    expect(themeOf(Civilizations.Roman)).to.eql([{ long: 10, short: 24 }]);
  });
});

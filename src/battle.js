const getCharacters = require("./getCharacters");

async function battle(heroName, villainName) {
  const characters = await getCharacters();

  const hero = characters.items.find(e => e.name === heroName);
  const villain = characters.items.find(e => e.name === villainName);

  if (!hero || !villain) {
    throw new Error("failed to find characters");
  }

  let heroScore = hero.score;
  let villainScore = villain.score;

  if (hero.weakness === villain.name) {
    // I decided to add score rather than subtract,
    // as it will elliminate the need to check for negative scores
    villainScore += 1;
  }

  if (villain.weakness === hero.name) {
    heroScore += 1;
  }

  if (heroScore === villainScore) {
    return null;
  }

  return heroScore >= villainScore
    ? { ...hero, score: heroScore }
    : { ...villain, score: villainScore };
}

module.exports = battle;

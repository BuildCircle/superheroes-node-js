const getCharacters = require('./getCharacters')
const {NotFoundError} = require("./exceptions");

async function battle(heroName, villainName) {
  const characters = await getCharacters()
  const hero = characters.items.find(e => e.name === heroName)
  const villain = characters.items.find(e => e.name === villainName)

  if (!hero || !villain) {
    throw new NotFoundError()
  }

  return getWinner(hero, villain)
}

function getWinner(hero, villain) {
  let finalHeroScore = hero.score - (hero.weakness === villain.name ? 1 : 0)
  return finalHeroScore >= villain.score ? hero : villain
}

module.exports = battle

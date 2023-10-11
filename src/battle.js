const getCharacters = require('./getCharacters')

function battle(heroName, villainName) {
  const characters = getCharacters()

  const hero = characters.items.find(e => e.name === heroName)
  const villain = characters.items.find(e => e.name === villainName)

  return hero.score >= villain.score ? hero : villain
}

module.exports = battle
const getCharacters = require('./getCharacters')

function battle(hero, villain) {
  const heroCharacter = findCharacter(hero.name, hero.type)
  const villainCharacter = findCharacter(villain.name, villain.type)

  return heroCharacter.score >= villainCharacter.score ? heroCharacter : villainCharacter
}

function findCharacter(name, type) {
  const characters = getCharacters()

  let character
  for (let i = 0; i < characters.items.length; i++) {
    if (characters.items[i].name === name && characters.items[i].type === type) {
      character = characters.items[i]
    }
  }
  return character
}


module.exports = battle
const { HeroesApiNotAvailable } = require("./exceptions");

async function getCharacters() {
  try {
    return (await fetch('https://s3.eu-west-2.amazonaws.com/build-circle/characters.json')).json()
  } catch(error) {
    throw new HeroesApiNotAvailable()
  }
}

module.exports = getCharacters;

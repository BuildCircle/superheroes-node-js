

async function getCharacters() {
  return (await fetch('https://s3.eu-west-2.amazonaws.com/build-circle/characters.json')).json()
}

module.exports = getCharacters;

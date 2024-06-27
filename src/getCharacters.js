const axios = require("axios");

const charactersUrl =
  "https://s3.eu-west-2.amazonaws.com/build-circle/characters.json";

async function getCharacters() {
  try {
    const res = await axios.get(charactersUrl);
    // No need to check for status code, axios will throw an error if it's not 200

    return res.data.items;
  } catch (error) {
    throw new Error("failed to fetch characters");
  }
}

module.exports = getCharacters;

const getCharacters = require("./getCharacters");
const nock = require("nock");

const testCaracter = {
  name: "Batman",
  score: 8.3,
  type: "hero",
  weakness: "Joker"
};

describe("getCharacters", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("should return an array of characters", async () => {
    // Arrange
    nock("https://s3.eu-west-2.amazonaws.com")
      .get("/build-circle/characters.json")
      .reply(200, { items: [testCaracter] });

    // Act
    const result = await getCharacters();

    // Assert
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return an array of characters with the correct properties", async () => {
    // Arrange
    nock("https://s3.eu-west-2.amazonaws.com")
      .get("/build-circle/characters.json")
      .reply(200, { items: [testCaracter] });

    // Act
    const result = await getCharacters();

    // Assert
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          score: expect.any(Number),
          type: expect.any(String),
          weakness: expect.any(String)
        })
      ])
    );
  });

  it("should handle 500 http errors", async () => {
    // Arrange
    nock("https://s3.eu-west-2.amazonaws.com")
      .get("/build-circle/characters.json")
      .reply(500);

    // Act
    const result = getCharacters();

    // Assert
    await expect(result).rejects.toThrow("failed to fetch characters");
  });

  it("should handle 404 http errors", async () => {
    // Arrange
    nock("https://s3.eu-west-2.amazonaws.com")
      .get("/build-circle/characters.json")
      .reply(404);

    // Act
    const result = getCharacters();

    // Assert
    await expect(result).rejects.toThrow("failed to fetch characters");
  });
});

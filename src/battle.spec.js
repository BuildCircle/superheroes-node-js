const battle = require("./battle");
const getCharacters = require("./getCharacters");

jest.mock("./getCharacters");

describe("battle", () => {
  it("battle should return the hero if they have a higher score", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Winner", score: 9.0, type: "hero" },
        { name: "Loser", score: 8.0, type: "villain" }
      ]
    });

    // Act
    const result = await battle("Winner", "Loser");

    // Assert
    expect(result).toHaveProperty("name", "Winner");
    expect(result).toHaveProperty("type", "hero");
  });

  it("battle should return the villain if they have a higher score", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Loser", score: 8.0, type: "hero" },
        { name: "Winner", score: 9.0, type: "villain" }
      ]
    });

    // Act
    const result = await battle("Loser", "Winner");

    // Assert
    expect(result).toHaveProperty("name", "Winner");
    expect(result).toHaveProperty("type", "villain");
  });

  it("battle should return null if they have the same score", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Foo", score: 9.0, type: "hero" },
        { name: "Bar", score: 9.0, type: "villain" }
      ]
    });

    // Act
    const result = await battle("Foo", "Bar");

    // Assert
    expect(result).toBeNull();
  });

  it("battle should return a winner if two heroes are fighting", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Superman", score: 8.0, type: "hero" },
        { name: "Batman", score: 9.0, type: "hero" }
      ]
    });

    // Act
    const result = await battle("Superman", "Batman");

    // Assert
    expect(result).toHaveProperty("name", "Batman");
  });

  it("battle should return a winner if two villains are fighting", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Joker", score: 8.0, type: "villain" },
        { name: "Penguin", score: 9.0, type: "villain" }
      ]
    });

    // Act
    const result = await battle("Joker", "Penguin");

    // Assert
    expect(result).toHaveProperty("name", "Penguin");
  });

  it("should throw an error if the hero does not exist", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Superman", score: 8.0, type: "hero" },
        { name: "Batman", score: 9.0, type: "hero" }
      ]
    });

    // Act
    const result = battle("Spiderman", "Batman");

    // Assert
    await expect(result).rejects.toThrow("failed to find characters");
  });

  it("should compare score float values", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Superman", score: 8.0, type: "hero" },
        { name: "Batman", score: 8.1, type: "hero" }
      ]
    });

    // Act
    const result = await battle("Superman", "Batman");

    // Assert
    expect(result).toHaveProperty("name", "Batman");
  });

  // I decided to add score rather than subtract,
  // as it will elliminate the need to check for negative scores
  it("should strengthen the villain if they are fighting their nemesis", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Superman", score: 8, type: "hero", weakness: "Lex Luthor" },
        { name: "Lex Luthor", score: 8, type: "villain" }
      ]
    });

    // Act
    const result = await battle("Superman", "Lex Luthor");

    // Assert
    expect(result).toHaveProperty("name", "Lex Luthor");
    expect(result).toHaveProperty("score", 9.0);
  });

  it("should strengthen the hero if they are fighting their nemesis", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Batman", score: 8, type: "hero", weakness: "Joker" },
        { name: "Joker", score: 8, type: "villain" }
      ]
    });

    // Act
    const result = await battle("Batman", "Joker");

    // Assert
    expect(result).toHaveProperty("name", "Joker");
    expect(result).toHaveProperty("score", 9.0);
  });

  it("should have names registry sensitive", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Loser", score: 8.0, type: "hero" },
        { name: "Winner", score: 9.0, type: "villain" }
      ]
    });

    // Act/Assert
    await expect(battle("loser", "Winner")).rejects.toThrow(
      "failed to find characters"
    );
    await expect(battle("Loser", "winner")).rejects.toThrow(
      "failed to find characters"
    );
  });
});

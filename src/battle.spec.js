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
    expect(result).toEqual({ name: "Winner", score: 9.0, type: "hero" });
  });
});

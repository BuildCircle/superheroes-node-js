const request = require("supertest");
const app = require("./index");
const getCharacters = require("./getCharacters");

jest.mock("./getCharacters");

describe("GET /battle", () => {
  it("should return 200", async () => {
    // Arrange
    getCharacters.mockResolvedValue({
      items: [
        { name: "Batman", score: 9.0, type: "hero" },
        { name: "Joker", score: 8.0, type: "villain" }
      ]
    });

    // Act
    const response = await request(app).get(
      "/battle?hero=Batman&villain=Joker"
    );

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: "Batman", score: 9.0, type: "hero" });
  });
});

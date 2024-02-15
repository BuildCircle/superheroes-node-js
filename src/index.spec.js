const request = require("supertest")
const app = require("./index")

describe("GET /battle", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/battle?hero=Batman&villain=Joker");

    expect(response.statusCode).toBe(200);
  });
});
const request = require("supertest")
const app = require("./index")

describe("GET /battle", () => {
  it("should return 200", async () => {
    const response = await request(app).get("/battle?hero=Batman&villain=Joker");

    expect(response.statusCode).toBe(200);
  });

  it("should return 404", async () => {
    const response = await request(app).get("/battle?hero=Batman&villain=HERO_NOT_EXISTING");
    expect(response.statusCode).toBe(404);
  });

  it("should return 400", async () => {
    const response = await request(app).get("/battle?hero=Batman");
    expect(response.statusCode).toBe(400);
  });
});

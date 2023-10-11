const request = require("supertest")
const app = require("./index")
const baseURL = "http://localhost:8080"

app.listen(8080, () => {
  console.log(`[server]: Server is running`);
});

describe("GET /battle", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/battle?hero=Batman&villain=Joker");

    expect(response.statusCode).toBe(200);
  });
});
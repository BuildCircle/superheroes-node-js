const request = require("supertest")
const app = require("./index")
const battle = require('./battle');

describe("GET /battle", () => {



  describe('Happy path + 4xx', () => {
    it("should return 200", async () => {
      const response = await request(app).get("/battle?hero=Batman&villain=Joker");

      expect(response.statusCode).toBe(200);
    });

    it("should return 404 if one character at least not found", async () => {
      const response = await request(app).get("/battle?hero=Batman&villain=HERO_NOT_EXISTING");
      expect(response.statusCode).toBe(404);
    });

    it("should return 400 if bad request", async () => {
      const response = await request(app).get("/battle?hero=Batman");
      expect(response.statusCode).toBe(400);
    });
  })

  describe('5xx', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return 502 if upstream server unavailable', async () => {
      jest
        .spyOn(global, 'fetch')
        .mockImplementation(() =>
          Promise.reject('unknown error')
        )

      const response = await request(app).get("/battle?hero=Batman&villain=Joker");

      expect(response.statusCode).toBe(502);
    })

    // This test is disabled : will fail as we need a jest.mock('./battle') to be above the describe blocks.
    // We don't want that as the other tests would fail.
    // We could find a way ( but long and convoluted ) by disabling and reactivating in beforeAll and afterAll blocks
    // It can live in its own file if we want this part to be covered, or we can find another indirect way to test 500s
    xit('should return 500 i finternal error', async () => {
      battle.mockImplementation(() =>
        Promise.reject('abc')
      )

      const response = await request(app).get("/battle?hero=Batman&villain=Joker");

      expect(response.statusCode).toBe(500);
    })
  })


});

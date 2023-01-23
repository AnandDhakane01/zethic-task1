import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe("POST on the Home route /", () => {
  const input = {
    insects: {
      _0: { position: "1 2 N", path: "LFLFLFLFF" },
      _1: { position: "3 3 E", path: "FFRFFRFRRF" },
    },
    roomSize: "5 5",
  };

  it("should return correct result", async () => {
    await supertest(app)
      .post("/")
      .send(input)
      .expect({
        result: ["1 3 N", "5 1 E"],
      });
  });
});

import supertest from "supertest";
import app from "./app";

describe("Check server runs", () => {
  const request = supertest(app);

  it("GET /", () => {
    return request.get("/").expect(200);
  });
});

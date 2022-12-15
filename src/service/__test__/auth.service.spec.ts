import { AuthService } from "../auth.service";
jest.mock("axios");
import axios from "axios";
describe("AuthService", function () {
  let authService: AuthService;
  beforeEach(() => {
    authService = new AuthService(axios);
  });
  describe("sendGoogleToken()", function () {
    it("should expect return jwt token", async function () {
      const token: string = "XXXXXXXX";
      jest.spyOn(axios, "post").mockImplementation(async () => {
        return { data: token };
      });
      await expect(authService.sendGoogleToken("XXXX")).resolves.toBe(token);
    });
    it("should throw error", async function () {
      jest.spyOn(axios, "post").mockImplementation(() => {
        throw new Error("time out");
      });
      await expect(authService.sendGoogleToken("XXXX")).rejects.toThrowError(
        "time out"
      );
    });
  });
});

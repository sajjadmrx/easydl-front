import { CookieUtil } from "../utils/cookie.util";
import { ApiService } from "./api.service";

export class UserService {
  constructor(private apiService: ApiService) {}

  async getProfile() {
    const token = CookieUtil.get("token");
    this.apiService.setToken(token);
    return this.apiService.get("users/@me/profile", {});
  }
  async getDownloads() {
    this.apiService.setToken(CookieUtil.get("token"));
    const result = await this.apiService.get("users/@me/downloads", {});
    return result.data;
  }
}

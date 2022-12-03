import { CookieUtil } from "../utils/cookie.util";
import { ApiService } from "./api.service";
import { User } from "../shared/interfaces/user.interface";
import { Response } from "../shared/interfaces/response.interface";

export class UserService {
  constructor(private apiService: ApiService) {}

  async getProfile(): Promise<Response<User>> {
    const token = CookieUtil.get("token");
    this.apiService.setToken(token);
    return this.apiService.get("users/@me/profile", {});
  }
}

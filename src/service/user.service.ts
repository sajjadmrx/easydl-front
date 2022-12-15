import { ApiService } from "./api.service";
import { User } from "../shared/interfaces/user.interface";
import { Response } from "../shared/interfaces/response.interface";

export class UserService extends ApiService {
  static PREFIX: string = "/users/@me";
  async getProfile(): Promise<Response<User>> {
    return this.get("/profile", {});
  }

  protected getPrefix(): string {
    return UserService.PREFIX;
  }
}

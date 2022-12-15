import { ApiService } from "./api.service";
import { Response } from "../shared/interfaces/response.interface";

export class AuthService extends ApiService {
  static PREFIX: string = "/auth";

  protected getPrefix(): string {
    return AuthService.PREFIX;
  }

  async sendGoogleToken(token: string): Promise<Response<string>> {
    try {
      return this.post<Response<string>>("/google", {
        token,
      });
    } catch (error) {
      throw error;
    }
  }
}

import { ApiService } from "./api.service";
import { Response } from "../shared/interfaces/response.interface";

export class AuthService {
  constructor(private apiService: ApiService) {}

  async sendGoogleToken(token: string): Promise<Response<string>> {
    try {
      return this.apiService.postWithAxios<Response<string>>("/auth/google", {
        token,
      });
    } catch (error) {
      throw error;
    }
  }
}

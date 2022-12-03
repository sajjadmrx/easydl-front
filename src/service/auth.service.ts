import { ApiService } from "./api.service";

export class AuthService {
  constructor(private apiService: ApiService) {}

  async sendGoogleToken(token: string) {
    try {
      return await this.apiService.postWithAxios("/auth/google", { token });
    } catch (error) {
      throw error;
    }
  }
}

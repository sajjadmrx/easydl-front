import { ApiService } from "./api.service";

export class ConnectionsService extends ApiService {
  static PREFIX: string = "/connections";

  protected getPrefix(): string {
    return ConnectionsService.PREFIX;
  }

  async getAuth(): Promise<string> {
    const result = await this.get<any>("/spotify", {});
    return result.data;
  }

  async handleCallback(code: string, state: string) {
    return await this.put("/spotify/back", { code, state });
  }

  async getSpotifyMe() {
    return await this.get<any>("/spotify/me", {});
  }
}

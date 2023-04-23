import { ApiService } from "./api.service";
import { SpotifyConnectionInfo } from "../shared/interfaces/connection.interface";

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

  async getSpotifyMe(): Promise<SpotifyConnectionInfo> {
    const data = await this.get<SpotifyConnectionInfo>("/spotify/me", {});
    return data.data;
  }
}

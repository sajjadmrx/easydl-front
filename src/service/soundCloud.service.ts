import { ApiService } from "./api.service";
import { SoundCloudPlayListResponse } from "../components/soundCloud/interfaces/response.interface";
import { Response } from "../shared/interfaces/response.interface";

export class SoundCloudService extends ApiService {
  static PREFIX: string = "/soundcloud";
  protected getPrefix(): string {
    return SoundCloudService.PREFIX;
  }

  async downloadTrack(url: string, cbProgress: any) {
    try {
      await this.download(
        `/tracks`,
        {
          url: url,
        },
        cbProgress
      );
    } catch (error) {
      throw error;
    }
  }
  async playlist(url: string): Promise<string> {
    try {
      const response = await this.post<Response<SoundCloudPlayListResponse>>(
        "/playlists",
        {
          url,
        }
      );
      return response.data.playlistName;
    } catch (e) {
      throw e;
    }
  }
}

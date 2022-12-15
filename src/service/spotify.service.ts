import { ApiService } from "./api.service";
import {
  SpotifyAlbum,
  SpotifyPlaylist,
} from "../shared/interfaces/spotify.interface";
import { Response } from "../shared/interfaces/response.interface";
import { AxiosResponse } from "axios";

export class SpotifyService extends ApiService {
  static PREFIX: string = "/spotify";

  protected getPrefix(): string {
    return SpotifyService.PREFIX;
  }

  async downloadTrack(trackId: string, cbProgress: any): Promise<void> {
    try {
      await this.download(
        "/tracks",
        {
          trackId,
        },
        cbProgress
      );
    } catch (e) {
      throw e;
    }
  }

  async album(albumUrl: string): Promise<Response<SpotifyAlbum>> {
    try {
      const result = await this.post<Response<SpotifyAlbum>>("/albums", {
        url: albumUrl,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async playlist(playlist: string): Promise<Response<SpotifyPlaylist>> {
    try {
      return await this.post("/playlists", { url: playlist });
    } catch (e) {
      throw e;
    }
  }
}

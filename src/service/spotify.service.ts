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
      const result: AxiosResponse<Response<SpotifyAlbum>> = await this.post(
        "/albums",
        { url: albumUrl }
      );
      return result.data;
    } catch (e) {
      throw e;
    }
  }

  async playlist(playlist: string): Promise<Response<SpotifyPlaylist>> {
    try {
      const result: AxiosResponse<Response<SpotifyPlaylist>> = await this.post(
        "/playlists",
        { url: playlist }
      );
      return result.data;
    } catch (e) {
      throw e;
    }
  }
}

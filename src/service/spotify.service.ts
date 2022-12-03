import { hostStore } from "../store/host.store";
import myAxios from "../utils/axios.util";
import { ApiService } from "./api.service";
export class SpotifyService {
  constructor(private apiService: ApiService) {}

  async searchTrack(trackId: string) {
    try {
      const data = await this.apiService.get(`spotify/tracks/${trackId}`, {});
      const items = await Promise.all(
        data.map((item: any) => {
          return {
            name: item.title,
            description: item.description,
            title: item.title,
            id: item.videoId,
            photo: `${hostStore.url}/download/photo?url=${item.thumbnail}`,
            artist: item.author.name,
            platforms: ["spotify", "youtube"],
          };
        })
      );
      return items;
    } catch (error) {
      throw error;
    }
  }

  download({ id, spotifyUrl }: any, cbProgress: any) {
    return this.apiService.download(
      "spotify/tracks",
      {
        id,
        spotifyUrl,
      },
      cbProgress
    );
  }

  album(albumUrl: string) {
    return myAxios.post("/spotify/albums", { url: albumUrl });
  }
  playlist(playlist: string) {
    return myAxios.post("/spotify/playlists", { url: playlist });
  }
}

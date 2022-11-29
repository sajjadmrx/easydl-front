import { hostStore } from "../store/host.store";
import myAxios from "../utils/axios.util";
export class SpotifyService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  async searchTrack(trackId) {
    try {
      const data = await this.apiService.get(`spotify/tracks/${trackId}`);
      const items = await Promise.all(
        data.map((item) => {
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

  download({ id, spotifyUrl }, cbProgress) {
    return this.apiService.download(
      "spotify/tracks",
      {
        id,
        spotifyUrl,
      },
      cbProgress
    );
  }

  album(albumUrl) {
    return myAxios.post("/spotify/albums", { url: albumUrl });
  }
  playlist(playlist) {
    return myAxios.post("/spotify/playlists", { url: playlist });
  }
}

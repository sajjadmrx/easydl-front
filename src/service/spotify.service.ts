import {hostStore} from "../store/host.store";
import myAxios from "../utils/axios.util";
import {ApiService} from "./api.service";
import {SpotifyAlbum, SpotifyPlaylist, SpotifySearchItem,} from "../shared/interfaces/spotify.interface";
import {Response} from "../shared/interfaces/response.interface";
import {AxiosResponse} from "axios";

export class SpotifyService {
    constructor(private apiService: ApiService) {
    }

    async searchTrack(trackId: string): Promise<SpotifySearchItem[]> {
        try {
            const data = await this.apiService.get<any>(
                `spotify/tracks/${trackId}`,
                {}
            );
            return data.data.map((item: any): SpotifySearchItem => {
                return {
                    name: item.title,
                    description: item.description,
                    title: item.title,
                    id: item.videoId,
                    photo: `${hostStore.url}/download/photo?url=${item.thumbnail}`,
                    artist: item.author.name,
                    platforms: ["spotify", "youtube"],
                    thumbnail: item.thumbnail,
                    author: item.author,
                    timestamp: item.timestamp,
                };
            });
        } catch (error) {
            throw error;
        }
    }

    async download(
        trackId: string, cbProgress: any
    ): Promise<void> {
        try {
            await this.apiService.download(
                "spotify/tracks",
                {
                    trackId
                },
                cbProgress
            );
        } catch (e) {
            throw e;
        }
    }

    async album(albumUrl: string): Promise<Response<SpotifyAlbum>> {
        try {
            const result: AxiosResponse<Response<SpotifyAlbum>> = await myAxios.post(
                "/spotify/albums",
                {url: albumUrl}
            );
            return result.data;
        } catch (e) {
            throw e;
        }
    }

    async playlist(playlist: string): Promise<Response<SpotifyPlaylist>> {
        try {
            const result: AxiosResponse<Response<SpotifyPlaylist>> =
                await myAxios.post("/spotify/playlists", {url: playlist});
            return result.data;
        } catch (e) {
            throw e;
        }
    }
}

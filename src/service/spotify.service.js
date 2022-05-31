import { hostStore } from "../store/host.store";

export class SpotifyService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async search(url) {
        try {
            const data = await this.apiService.searchSpotify(url)
            const items = await Promise.all(data.map(async (item) => {
                return {
                    name: item.title,
                    description: item.description,
                    title: item.title,
                    id: item.videoId,
                    photo: `${hostStore.url}/download/photo?url=${item.thumbnail}`,
                    artist: item.author.name,
                    platforms: ['spotify', 'youtube'],
                }
            }))
            return items
        } catch (error) {
            throw error;
        }
    }
    download(url, cbProgress) {
        return this.apiService.download(url, cbProgress)
    }
}
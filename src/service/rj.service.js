
export class RadioJavanService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    async downloadMp3(url, cbProgress) {
        try {
            await this.apiService.download('download/rj/mp3', {
                url: url
            }, cbProgress)
        } catch (error) {
            throw error
        }
    }

    async downloadPodCast(url, cbProgress) {
        try {
            await this.apiService.download('download/rj/podcast', {
                url: url
            }, cbProgress)
        } catch (error) {
            throw error
        }
    }
}
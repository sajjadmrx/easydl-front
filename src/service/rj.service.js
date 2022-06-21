
export class RadioJavanService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    downloadMp3(url, cbProgress) {
        return this.apiService.download('download/rj/mp3', {
            url: url
        }, cbProgress)
    }

    downloadPodCast(url, cbProgress) {
        return this.apiService.download('download/rj/podcast', {
            url: url
        }, cbProgress)
    }
}

export class RadioJavanService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    download(url, cbProgress) {
        return this.apiService.download('download/rj', {
            url: url
        }, cbProgress)
    }
}
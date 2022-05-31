
export class SoundCloudService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    download(url, cbProgress) {
        return this.apiService.download(`download/soundcloud?url=${url}`, cbProgress)
    }
}
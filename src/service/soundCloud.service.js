export class SoundCloudService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  async download(url, cbProgress) {
    try {
      await this.apiService.download(
        `soundcloud/tracks`,
        {
          url: url,
        },
        cbProgress
      );
    } catch (error) {
      throw error;
    }
  }
}

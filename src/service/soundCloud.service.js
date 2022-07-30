export class SoundCloudService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  async download(url, cbProgress) {
    try {
      await this.apiService.download(
        `download/soundcloud`,
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

export class RadioJavanService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  async downloadMp3(url, cbProgress) {
    try {
      await this.apiService.download(
        "rj/track",
        {
          url: url,
        },
        cbProgress
      );
    } catch (error) {
      throw error;
    }
  }

  async downloadPodCast(url, cbProgress) {
    try {
      await this.apiService.download(
        "rj/podcast",
        {
          url: url,
        },
        cbProgress
      );
    } catch (error) {
      throw error;
    }
  }
  async downloadMusicVideo(url, cbProgress) {
    try {
      await this.apiService.download(
        "rj/music-video",
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

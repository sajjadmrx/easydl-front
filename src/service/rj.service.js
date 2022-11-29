export class RadioJavanService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  async downloadMp3(url, cbProgress) {
    try {
      await this.apiService.download(
        "rj/tracks",
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
        "rj/podcasts",
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
        "rj/music-videos",
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

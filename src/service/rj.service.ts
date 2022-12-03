import { ApiService } from "./api.service";

export class RadioJavanService {
  constructor(private apiService: ApiService) {}

  async downloadMp3(url: string, cbProgress: any): Promise<void> {
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

  async downloadPodCast(url: string, cbProgress: any): Promise<void> {
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
  async downloadMusicVideo(url: string, cbProgress: any): Promise<void> {
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

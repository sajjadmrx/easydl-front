import { ApiService } from "./api.service";

export class RadioJavanService extends ApiService {
  static PREFIX: string = "/rj";

  protected getPrefix(): string {
    return RadioJavanService.PREFIX;
  }

  async downloadMp3(url: string, cbProgress: any): Promise<void> {
    try {
      await this.download(
        "/tracks",
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
      await this.download(
        "/podcasts",
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
      await this.download(
        "/music-videos",
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

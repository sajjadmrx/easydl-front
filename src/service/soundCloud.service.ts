import { ApiService } from "./api.service";

export class SoundCloudService extends ApiService {
  static PREFIX: string = "/soundcloud";
  protected getPrefix(): string {
    return SoundCloudService.PREFIX;
  }

  async downloadTrack(url: string, cbProgress: any) {
    try {
      await this.download(
        `/tracks`,
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

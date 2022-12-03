import { ApiService } from "./api.service";

export class SoundCloudService {
  constructor(private apiService: ApiService) {}

  async download(url: string, cbProgress: any) {
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

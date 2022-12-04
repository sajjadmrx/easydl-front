import { ApiService } from "./api.service";
import {
  YoutubeDlSelector,
  YoutubeVideoDetails,
} from "../shared/interfaces/youtube.interface";

export class YoutubeService {
  constructor(private apiService: ApiService) {}

  async getDetails(videoId: string) {
    try {
      const result = await this.apiService.get<YoutubeVideoDetails>(
        `/youtube/${videoId}`,
        {}
      );
      result.data.details.id = videoId;
      return result.data;
    } catch (e) {
      throw e;
    }
  }
  async downloadVideo(
    { videoId, items }: { videoId: string; items: YoutubeDlSelector },
    cbProgress: any
  ): Promise<void> {
    try {
      await this.apiService.download(
        `youtube/${videoId}`,
        {
          ...items,
        },
        cbProgress
      );
    } catch (e) {
      throw e;
    }
  }
}

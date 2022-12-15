import { ApiService } from "./api.service";
import {
  YoutubeDlSelector,
  YoutubeVideoDetails,
} from "../shared/interfaces/youtube.interface";
import { Response } from "../shared/interfaces/response.interface";

export class YoutubeService extends ApiService {
  static PREFIX: string = "/youtube";

  protected getPrefix(): string {
    return YoutubeService.PREFIX;
  }

  async getDetails(videoId: string): Promise<YoutubeVideoDetails> {
    try {
      const result: Response<YoutubeVideoDetails> =
        await this.get<YoutubeVideoDetails>(`/${videoId}`, {});
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
      await this.download(
        `/${videoId}`,
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

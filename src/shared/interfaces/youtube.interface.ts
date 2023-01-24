import { mediaTypeConstant } from "../constants/media.constant";

export interface YoutubeDlSelector {
  readonly qualityLabel: string;
  readonly container: string;
  readonly size: string;
  readonly mediaType: keyof typeof mediaTypeConstant;
}

export interface YoutubeDlSelectorWithId extends YoutubeDlSelector {
  id: string;
}

export interface YoutubeThumbnails {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeVideoDetails {
  details: {
    id?: string;
    title: string;
    description: string;
    thumbnails: Array<YoutubeThumbnails>;
    author: {
      id: string;
      name: string;
      user: string;
      channel_url: string;
      external_channel_url: string;
      user_url: string;
      thumbnails: Array<YoutubeThumbnails>;
      verified: boolean;
      subscriber_count: boolean;
    };
    viewCount: string;
  };
  canDownload: boolean;
  dlSelector: Array<YoutubeDlSelector>;
}

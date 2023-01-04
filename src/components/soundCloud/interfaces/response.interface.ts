export interface SoundCloudPlayListResponse {
  playlistName: string;
  trackCount: number;
  author: {
    name: string;
    profile: string;
    urn: number;
    username: string;
    verified: boolean;
  };
}

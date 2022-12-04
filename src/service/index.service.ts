import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { RadioJavanService } from "./rj.service";
import { UserService } from "./user.service";
import { SpotifyService } from "./spotify.service";
import { SoundCloudService } from "./soundCloud.service";
import { YoutubeService } from "./youtube.service";
const apiService = new ApiService();

export const authService: AuthService = new AuthService(apiService);
export const userService: UserService = new UserService(new ApiService());
export const radioJavanService: RadioJavanService = new RadioJavanService(
  apiService
);
export const spotifyService: SpotifyService = new SpotifyService(apiService);
export const soundcloudService: SoundCloudService = new SoundCloudService(
  apiService
);
export const youtubeService: YoutubeService = new YoutubeService(apiService);

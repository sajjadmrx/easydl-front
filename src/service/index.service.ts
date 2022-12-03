import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { RadioJavanService } from "./rj.service";
import { UserService } from "./user.service";
import { SpotifyService } from './spotify.service'
import { SoundCloudService } from './soundCloud.service'
const apiService = new ApiService()


export const authService = new AuthService(apiService)
export const userService = new UserService(new ApiService())
export const radioJavanService = new RadioJavanService(apiService)
export const spotifyService = new SpotifyService(apiService)
export const soundcloudService = new SoundCloudService(apiService)

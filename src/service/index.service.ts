import { AuthService } from "./auth.service";
import { RadioJavanService } from "./rj.service";
import { UserService } from "./user.service";
import { SpotifyService } from "./spotify.service";
import { SoundCloudService } from "./soundCloud.service";
import { YoutubeService } from "./youtube.service";
import myAxios from "../utils/axios.util";
import { ReportService } from "./report.service";
import { PaymentService } from "./payment.service";
import { ConnectionsService } from "./connection.service";

export const authService: AuthService = new AuthService(myAxios);
export const userService: UserService = new UserService(myAxios);
export const radioJavanService: RadioJavanService = new RadioJavanService(
  myAxios
);
export const spotifyService: SpotifyService = new SpotifyService(myAxios);
export const soundcloudService: SoundCloudService = new SoundCloudService(
  myAxios
);
export const youtubeService: YoutubeService = new YoutubeService(myAxios);
export const reportService: ReportService = new ReportService(myAxios);
export const paymentService: PaymentService = new PaymentService(myAxios);
export const connectionsService: ConnectionsService = new ConnectionsService(
  myAxios
);

import { FormContext } from "../../shared/interfaces/FormContext.interface";
import { AuthContext } from "../../shared/interfaces/authContext.interface";
import { toast } from "react-toastify";
import { spotifyService } from "../../service/index.service";
// @ts-ignore
import GetAudioId from "get-audio-id";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  SpotifyAlbum,
  SpotifyPlaylist,
} from "../../shared/interfaces/spotify.interface";
import { Response } from "../../shared/interfaces/response.interface";
import { axiosError } from "../../handlers/error.handler";
import ms from "ms";
const MySwal = withReactContent(Swal);

export class SpotifyFormHandler {
  constructor(
    private formContext: FormContext,
    private authContext: AuthContext,
    private setWaiting: any
  ) {}
  async track(value: string, setProgressValue: any) {
    try {
      this.setWaiting(true);
      this.formContext.setLoading(true);
      let trackId = getId(value);
      await downloadTrack(trackId, setProgressValue);
    } catch (e) {
      throw e;
    }
  }
  async playlist(value: string) {
    try {
      if (!this.authContext.isAuthenticated) {
        return toast.error("برای این کار لازم است وارد حساب کاربری بشید.");
      }

      this.setWaiting(true);
      this.formContext.setLoading(true);
      const result: Response<SpotifyPlaylist> = await spotifyService.playlist(
        value
      );
      const response = result.data;
      const playlist_name = response.playlist_name;
      toast.success(
        `پلی لیست "${playlist_name}" به صف پردازش اضافه شد, بعد از اتمام پردازش برای شما ایمیل خواهد شد. 📩`
      );
    } catch (e) {
      throw e;
    }
  }
  async album(value: string) {
    try {
      if (!this.authContext.isAuthenticated) {
        return toast.error("برای این کار لازم است وارد حساب کاربری بشید.");
      }

      this.setWaiting(true);
      this.formContext.setLoading(true);

      const result: Response<SpotifyAlbum> = await spotifyService.album(value);
      const album_name = result.data.album_name;
      if (result.statusCode == 201) {
        toast.success(
          ` آلبوم "${album_name}" به صف پردازش اضافه شد, بعد از اتمام پردازش برای شما ایمیل خواهد شد. 📩`
        );
      } else if (result.statusCode == 200) {
        okyRequest(album_name, "لینک دانلود برای  شما ایمیل شد", 3000);
      }
    } catch (e) {
      throw e;
    }
  }
}

function getId(value: string) {
  return new GetAudioId(value).getId().id;
}

async function downloadTrack(trackId: string, setProgressValue: any) {
  return new Promise(async (resolve, reject) => {
    try {
      await spotifyService.downloadTrack(trackId, (value: number) => {
        if (value == 100) {
          resolve(true);
        } else {
          setProgressValue(value);
        }
      });
    } catch (e) {
      axiosError(e, toast.error);
      reject(e);
    }
  });
}

function okyRequest(title: any, text: any, timer = 0) {
  MySwal.fire({
    icon: "success",
    title: title || null,
    text: text,
    confirmButtonText: "باشه",
    confirmButtonColor: "#4ade80",
    showConfirmButton: timer == 0,
    timerProgressBar: timer > 0,
    timer: timer,
  });
}

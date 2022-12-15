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
const MySwal = withReactContent(Swal);

export class SpotifyFormHandler {
  constructor(
    private formContext: FormContext,
    private authContext: AuthContext,
    private setWaiting: any
  ) {}
  async track(value: string, setProgressValue: any, button: any) {
    try {
      this.setWaiting(true);
      this.formContext.setLoading(true);
      let trackId = getId(value);
      await downloadTrack(trackId, setProgressValue, button);
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
      okyRequest(
        playlist_name,
        "پلی لیست به صف پردازش اضافه شد, بعد از اتمام پردازش برای شما ایمیل خواهد شد."
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
        okyRequest(
          album_name,
          "دانلود البوم به صف پردازش اضافه شد و بعد از اتمام پردازش برای شما ایمیل خواهد شد"
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

async function downloadTrack(
  trackId: string,
  setProgressValue: any,
  button: Element
) {
  return new Promise(async (resolve, reject) => {
    try {
      await spotifyService.downloadTrack(trackId, (value: number) => {
        button.classList.remove("loading");
        if (value == 100) {
          resolve(true);
        } else {
          setProgressValue(value);
        }
      });
    } catch (e) {
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

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { spotifyService } from "../../service/index.service";
import { axiosError } from "../../handlers/error.handler";
import {
  getFileName,
  isLink,
  isSpotifyAlbumLink,
  isSpotifyLink,
  isSpotifyPlaylistLink,
} from "../../utils/regex.util";
import { useEffect } from "react";
import { formContext } from "../../contexts/formContext";
import { spotifyResultContext } from "../../contexts/spotifyResultContext";
import { toast } from "react-toastify";
import { ClearButtonComponent } from "../clearInput.component";
import { authContext } from "../../contexts/authContext";
import { Badge } from "react-daisyui";

// @ts-ignore
import GetAudioId from "get-audio-id";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../../shared/interfaces/authContext.interface";
import { SpotifySearchItem } from "../../shared/interfaces/spotify.interface";
import { FormContext } from "../../shared/interfaces/FormContext.interface";

const MySwal = withReactContent(Swal);
interface Props {}
export function SpotifyFormComponent(props: Props) {
  const [errorState, setErrorState] = React.useState<boolean>(false);
  const [buttonText, setButtonText] = React.useState<string | undefined>("");
  const [waiting, setWaiting] = React.useState<boolean>(false);
  const fromContext = React.useContext(formContext);
  const authContextData: AuthContext = React.useContext(authContext);
  const spotifyResultContextData = React.useContext(spotifyResultContext);
  const [localInput, setLocalInput] = React.useState<string>("");
  useEffect(() => {
    if (!buttonText) {
      setButtonText("دانلود");
      fromContext.setLoading(false);
      setWaiting(false);
    }
  }, [buttonText]);
  useEffect(() => {
    if (errorState) {
      toast.error(errorState);
    }
  }, [errorState]);

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) =>
        submitHandler(
          e,
          spotifyResultContextData.setSongs,
          setErrorState,
          setButtonText,
          setWaiting,
          fromContext,
          authContextData
        )
      }
    >
      <div className="relative w-full max-w-xs">
        <div className={""}>
          <input
            type="text"
            placeholder="لینک مورد نظر خود را وارد کنید..."
            id={"spotfiy"}
            value={localInput}
            className="input input-bordered  w-full max-w-xs mb-2"
            onChange={(e) => setLocalInput(e.target.value)}
          />
          {localInput != "" ? (
            <ClearButtonComponent setInput={setLocalInput} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={"mb-2"}>
        <span>پشتیبانی از</span>
        <div className={"flex mt-2"}>
          <Badge color={"ghost"} className={"mr-2"} responsive={true}>
            موزیک
          </Badge>
          <Badge color={"ghost"} className={"mr-2"} responsive={true}>
            پلی لیست
          </Badge>
          <Badge color={"ghost"} className={"mr-2"} responsive={true}>
            آلبوم
          </Badge>
        </div>
      </div>
      <button className="btn btn-wide ">
        {!waiting && (
          <FontAwesomeIcon icon={["fas", "download"]} className={"ml-2.5"} />
        )}
        {buttonText}
      </button>
    </form>
  );
}
async function submitHandler(
  e: any,
  setSongs: any,
  setErrorState: any,
  setButtonText: any,
  setWaiting: any,
  formContext: FormContext,
  authContext: AuthContext
) {
  e.preventDefault();

  setSongs([]);
  setErrorState(false);
  if (formContext.loading) return alert("تا پایان دانلود صبر کنید...");
  let value = e.target.querySelector("input").value;
  const button = e.target.querySelector("button");
  if (!value || !isLink(value)) {
    toast.error("لطفا یک لینک معتبر وارد کنید");
    return;
  }
  let targetUrl = "";
  switch (true) {
    case isSpotifyLink(value):
      targetUrl = "track";
      break;
    case isSpotifyAlbumLink(value):
      targetUrl = "album";
      break;
    case isSpotifyPlaylistLink(value):
      targetUrl = "playlist";
      break;
    default:
      targetUrl = "unknown";
  }

  if (targetUrl == "unknown") {
    toast.warning("لطفا یک لینک معتبر وارد کنید");
    return;
  }
  try {
    if (targetUrl == "track") {
      setWaiting(true);
      formContext.setLoading(true);
      let trackId = getId(value);
      const indexOf = value.indexOf("&");
      if (indexOf > 0) {
        value = value.substring(0, indexOf);
      }
      button.classList.add("loading");
      setButtonText("لطفا صبر کنید...");
      const data: Array<SpotifySearchItem> = await spotifyService.searchTrack(
        trackId
      );

      if (data.length > 0) {
        setSongs(data);
        formContext.setInputValue(value);
      } else {
        toast.error("چیزی یافت نشد");
      }
    } else if (targetUrl == "album") {
      if (!authContext.isAuthenticated) {
        return toast.error("برای این کار لازم است وارد حساب کاربری بشید.");
      }

      setButtonText("لطفا صبر کنید");
      setWaiting(true);
      formContext.setLoading(true);

      const result = await spotifyService.album(value);
      const album_name = result.data.album_name;
      if (result.statusCode == 201) {
        okyRequest(
          album_name,
          "دانلود البوم به صف پردازش اضافه شد و بعد از اتمام پردازش برای شما ایمیل خواهد شد"
        );
      } else if (result.statusCode == 200) {
        okyRequest(album_name, "لینک دانلود برای  شما ایمیل شد", 3000);
      }
    } else if (targetUrl == "playlist") {
      if (!authContext.isAuthenticated) {
        return toast.error("برای این کار لازم است وارد حساب کاربری بشید.");
      }

      setButtonText("لطفا صبر کنید");
      setWaiting(true);
      formContext.setLoading(true);
      const result = await spotifyService.playlist(value);
      const response = result.data;
      const playlist_name = response.playlist_name;
      okyRequest(
        playlist_name,
        "پلی لیست به صف پردازش اضافه شد, بعد از اتمام پردازش برای شما ایمیل خواهد شد."
      );
    } else {
      setWaiting(false);
      toast.error("لطفا یک لینک معتبر وارد کنید");
    }
  } catch (error) {
    axiosError(error, (err: any) => toast.error(err));
  } finally {
    button.classList.remove("loading");
    setButtonText(null);
    setWaiting(false);
    formContext.setLoading(false);
  }
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

function getId(value: string) {
  return new GetAudioId(value).getId().id;
}

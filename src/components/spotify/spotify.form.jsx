import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { spotifyService } from "../../service/index.service";
import { axiosError } from "../../handlers/error.handler";
import {
  getFileName,
  isLink,
  isSpotifyAlbumLink,
  isSpotifyLink,
} from "../../utils/regex.util";
import { useEffect } from "react";
import { FormContext } from "../../contexts/form.context";
import { SpotifyResultContext } from "../../contexts/spotifyResult.context";
import { toast } from "react-toastify";
import { ClearButtonComponent } from "../clearInput.component";
import FileSaver from "file-saver";
import AuthContext from "../../contexts/auth.context";
import { Badge } from "react-daisyui";
export function SpotifyFormComponent() {
  const [errorState, setErrorState] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("");
  const [waiting, setWaiting] = React.useState(false);
  const fromContext = React.useContext(FormContext);
  const authContext = React.useContext(AuthContext);
  const spotifyResultContext = React.useContext(SpotifyResultContext);
  const [localInput, setLocalInput] = React.useState("");
  useEffect(() => {
    if (!buttonText) {
      setButtonText("دانلود");
      fromContext.setLoading(false);
      setWaiting(false);
    }
  }, [buttonText]);
  useEffect(() => {
    if (errorState && errorState != "") {
      toast.error(errorState);
    }
  }, [errorState]);

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) =>
        submitHandler(
          e,
          spotifyResultContext.setSongs,
          setErrorState,
          setButtonText,
          setWaiting,
          fromContext,
          authContext
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
            <ClearButtonComponent setLocalInput={setLocalInput} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={"mb-2"}>
        <span>پشتیبانی از</span>
        <Badge color={"ghost"} responsive={true}>
          موزیک
        </Badge>
        <Badge color={"ghost"} responsive={true}>
          پلی لیست
        </Badge>
        <Badge color={"ghost"} responsive={true}>
          آلبوم
        </Badge>
      </div>
      <button className="btn btn-wide ">
        {!waiting && (
          <FontAwesomeIcon icon={["fas", "download"]} className="mr-2" />
        )}
        {buttonText}
      </button>
    </form>
  );
}

async function submitHandler(
  e,
  setSongs,
  setErrorState,
  setButtonText,
  setWaiting,
  fromContext,
  authContext
) {
  e.preventDefault();
  setSongs([]);
  setErrorState(false);
  if (fromContext.loading) return alert("تا پایان دانلود صبر کنید...");
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
      fromContext.setLoading(true);

      const indexOf = value.indexOf("&");
      if (indexOf > 0) {
        value = value.substring(0, indexOf);
      }
      button.classList.add("loading");
      setButtonText("لطفا صبر کنید...");
      const data = await spotifyService.search(value);

      if (data.length > 0) {
        setSongs(data);
        fromContext.setinputValue(value);
      } else {
        toast.error("چیزی یافت نشد");
      }
    } else if (targetUrl == "album") {
      if (!authContext.isAuthenticated) {
        return toast.error("برای این کار لازم است وارد حساب کاربری بشید.");
      }
      setButtonText("لطفا صبر کنید");
      setWaiting(true);
      fromContext.setLoading(true);
      const result = await spotifyService.album(value);
      if (result.status == 201) {
        toast.success(
          "دانلود البوم به صف پردازش اضافه شد و بعد از اتمام پردازش برای شما ایمیل ارسال خواهد شد"
        );
      } else if (result.status == 200) {
        toast.success("لینک دانلود برای  شما ایمیل شد");
      }
    } else {
      setWaiting(false);
      toast.error("لطفا یک لینک معتبر وارد کنید");
    }
  } catch (error) {
    axiosError(error, (err) => toast.error(err));
  } finally {
    button.classList.remove("loading");
    setButtonText(null);
    setWaiting(false);
    fromContext.setLoading(false);
  }
}

function downloadAlbumHandler() {}

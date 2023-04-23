import React, { useEffect } from "react";
import { axiosError } from "../../handlers/error.handler";
import {
  isLink,
  isSpotifyAlbumLink,
  isSpotifyLink,
  isSpotifyPlaylistLink,
} from "../../utils/regex.util";
import { formContext } from "../../contexts/formContext";
import { toast } from "react-toastify";
import { ClearButtonComponent } from "../clearInput.component";
import { authContext } from "../../contexts/authContext";

import { AuthContext } from "../../shared/interfaces/authContext.interface";
import { FormContext } from "../../shared/interfaces/FormContext.interface";
import { SupportMediaComponent } from "../support-media.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressDownload } from "../progressDownload.component";
import { SpotifyFormHandler } from "./spotify.formHandler";

interface Props {
  url: string;
}

export function SpotifyFormComponent(props: Props) {
  const [errorState, setErrorState] = React.useState<boolean>(false);
  const [buttonText, setButtonText] = React.useState<string | undefined>("");
  const [localInput, setLocalInput] = React.useState<string | null>(props.url);
  const [waiting, setWaiting] = React.useState<boolean>(false);
  const [progressValue, setProgressValue] = React.useState<number>(0);
  const fromContextData = React.useContext(formContext);
  const authContextData: AuthContext = React.useContext(authContext);
  useEffect(() => {
    if (!buttonText) {
      setButtonText("دانلود");
      fromContextData.setLoading(false);
      setWaiting(false);
    }
  }, [buttonText]);
  useEffect(() => {
    if (errorState) {
      toast.error(errorState);
    }
  }, [errorState]);

  useEffect(() => {
    if (props.url) {
      setLocalInput(props.url);
      setTimeout(() => {
        document.getElementById("btn-f")?.click();
      }, 100);
    }
  }, [props.url]);

  async function submitHandler(e: any) {
    e.preventDefault();

    setErrorState(false);
    if (fromContextData.loading) return alert("تا پایان دانلود صبر کنید...");
    let value = localInput;
    const button = e.target.querySelector("button");

    if (!value || !isLink(value)) {
      toast.error("لطفا یک لینک معتبر وارد کنید");
      return;
    }

    button.classList.add("loading");
    try {
      button.classList.remove("loading");
      const spotifyFormHandler: SpotifyFormHandler = new SpotifyFormHandler(
        fromContextData,
        authContextData,
        () => {}
      );

      await spotifyDownloader(value, spotifyFormHandler, setProgressValue);
    } catch (error) {
      axiosError(error, (err: any) => toast.error(err));
    } finally {
      button.classList.remove("loading");
      setButtonText("");
      setWaiting(false);
      fromContextData.setLoading(false);
      setProgressValue(0);
    }
  }

  return (
    <form
      className="flex flex-col items-center"
      id={"spotify-form"}
      onSubmit={(e) => submitHandler(e)}
    >
      <div className="relative w-full max-w-xs">
        <div className={""}>
          <input
            type="text"
            placeholder="https://open.spotify.com/...."
            id={"spotify"}
            value={localInput || ""}
            className="input input-bordered  w-full max-w-xs mb-2"
            onChange={(e) => setLocalInput(e.target.value)}
            dir={"auto"}
          />
          {localInput != "" ? (
            <ClearButtonComponent setInput={setLocalInput} />
          ) : (
            ""
          )}
        </div>
      </div>
      <SupportMediaComponent media={["music", "playlist", "album"]} />
      <button
        className="btn btn-wide "
        id={"btn-f"}
        disabled={fromContextData.loading}
      >
        <div hidden={progressValue > 0}>
          {!waiting && (
            <FontAwesomeIcon icon={["fas", "download"]} className={"ml-2.5"} />
          )}
          {buttonText}
        </div>
        <div hidden={progressValue === 0} dir={"auto"}>
          <ProgressDownload
            valueProgress={progressValue}
            className={""}
            hideText={false}
          />
        </div>
      </button>
    </form>
  );
}

export async function spotifyDownloader(
  value: string,
  spotifyFormHandler: SpotifyFormHandler,
  cbProgress: (num: number) => void
) {
  switch (true) {
    case isSpotifyLink(value):
      await spotifyFormHandler.track(value, cbProgress);
      break;
    case isSpotifyAlbumLink(value):
      await spotifyFormHandler.album(value);
      break;
    case isSpotifyPlaylistLink(value):
      await spotifyFormHandler.playlist(value);
      break;
    default:
      toast.warning("لطفا یک لینک معتبر وارد کنید");
  }
}

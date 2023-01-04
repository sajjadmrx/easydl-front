import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { formContext } from "../../contexts/formContext";
import { soundcloudService } from "../../service/index.service";
import {
  isLink,
  isSoundcloudLink,
  isSoundCloudPlaylist,
} from "../../utils/regex.util";
import { toast } from "react-toastify";
import { ClearButtonComponent } from "../clearInput.component";
import React from "react";
import { axiosError } from "../../handlers/error.handler";
import { SupportMediaComponent } from "../support-media.component";
import { FormContext } from "../../shared/interfaces/FormContext.interface";
import { authContext } from "../../contexts/authContext";
import { AuthContext } from "../../shared/interfaces/authContext.interface";

export function SoundCloudFormComponent(props: any) {
  const [buttonText, setButtonText] = useState("دانلود");
  const [waiting, setWaiting] = useState(false);
  const formContextData = useContext(formContext);
  const authContextData = useContext(authContext);
  const [localInput, setLocalInput] = useState("");
  useEffect(() => {
    if (!buttonText) {
      setButtonText("دانلود");
      formContextData.setLoading(false);
    }
  }, [buttonText]);
  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) =>
        downloadHandler(
          e,
          setWaiting,
          setButtonText,
          formContextData,
          authContextData
        )
      }
      id={"soundCloudForm"}
    >
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="https://soundcloud.com/...."
          value={localInput}
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
      <SupportMediaComponent media={["music", "playlist"]} />

      <button className={`btn btn-wide ${waiting && "loading"}`}>
        {!waiting && (
          <FontAwesomeIcon icon={["fas", "download"]} className={"ml-2.5"} />
        )}
        {buttonText}
      </button>
    </form>
  );
}

async function downloadHandler(
  e: any,
  setWaiting: any,
  setButtonText: any,
  formContext: FormContext,
  authContext: AuthContext
) {
  try {
    e.preventDefault();
    if (formContext.loading)
      return toast.warning("لطفا تا پایان دانلود صبر کنید...");

    let value = e.target.querySelector("input").value;

    if (!value || !isLink(value) || !isSoundcloudLink(value))
      return toast.error("یک لینک معتبر وارد کنید");

    setWaiting(true);
    setButtonText("لطفا صبر کنید...");
    formContext.setLoading(true);
    if (isSoundCloudPlaylist(value)) {
      if (authContext.isAuthenticated) {
        const playlistName: string = await soundcloudService.playlist(value);
        toast.success(
          `پلی لیست "${playlistName}" به صف پردازش اضافه شد, بعد از اتمام پردازش برای شما ایمیل خواهد شد. 📩`
        );
      } else {
        return toast.error("برای این کار لازم است وارد حساب کاربری بشید.");
      }
    } else {
      await soundcloudService.downloadTrack(value, (prog: any) => {
        if (prog == 100) {
          setWaiting(false);
          setButtonText(null);
        }
      });
    }
  } catch (error: any) {
    axiosError(error, (er: any) => toast.error(er));
  } finally {
    setWaiting(false);
    setButtonText(null);
  }
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { formContext } from "../../contexts/formContext";
import {
  radioJavanService,
  soundcloudService,
} from "../../service/index.service";
import {
  isLink,
  isRjLinkMp3,
  isRjLinkMusicVideo,
  isRjLinkPodCast,
} from "../../utils/regex.util";
import { toast } from "react-toastify";
import { axiosError } from "../../handlers/error.handler";
import { ClearButtonComponent } from "../clearInput.component";
import { Badge } from "react-daisyui";
import React from "react";

const supports = ["موزیک", "موزیک ویدیو", "پادکست"];

export function RadioJavanFormComponent(props: any) {
  const [buttonText, setButtonText] = useState("دانلود");
  const [waiting, setWaiting] = useState(false);
  const formContextData = useContext(formContext);
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
        downloadHandler(e, setWaiting, setButtonText, formContextData)
      }
    >
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          placeholder="لینک مورد نظر خود را وارد کنید..."
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
      <div className={"mb-2"}>
        <span>پشتیبانی از</span>
        <div className={"flex mt-2"}>
          {supports.map((sup, index) => {
            return (
              <Badge
                color={"ghost"}
                className={"mr-2"}
                responsive={true}
                id={String(index + 1)}
              >
                {sup}
              </Badge>
            );
          })}
        </div>
      </div>
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
  formContext: any
) {
  try {
    e.preventDefault();
    if (formContext.loading)
      return toast.warning("لطفا تا پایان دانلود صبر کنید");
    let value = e.target.querySelector("input").value;
    if (!value || !isLink(value))
      return toast.error("لطفا یک لینک معتبر وارد کنید");

    let targetUrl = "unknown";
    switch (true) {
      case isRjLinkMp3(value):
        targetUrl = "rj";
        break;
      case isRjLinkPodCast(value):
        targetUrl = "rj-podcast";
        break;
      case isRjLinkMusicVideo(value):
        targetUrl = "music-video";
        break;

      default:
        targetUrl = "unknown";
        break;
    }

    if (targetUrl == "unknown") {
      toast.error("لطفا یک لینک معتبر وارد کنید");
      return;
    }

    setWaiting(true);
    formContext.setLoading(true);
    setButtonText("لطفا صبر کنید...");
    if (targetUrl == "rj") {
      await radioJavanService.downloadMp3(value, (progress: any) => {
        setButtonText(`${progress}% در حال دانلود ...`);
        if (progress == 100) {
          setButtonText(null);
          setWaiting(false);
        }
      });
    }
    if (targetUrl == "rj-podcast") {
      await radioJavanService.downloadPodCast(value, (progress: any) => {
        setButtonText(`${progress}% در حال دانلود ...`);
        if (progress == 100) {
          setButtonText(null);
          setWaiting(false);
        }
      });
    }
    if (targetUrl == "music-video") {
      await radioJavanService.downloadMusicVideo(value, (progress: any) => {
        setButtonText(`${progress}% در حال دانلود ...`);
        if (progress == 100) {
          setButtonText(null);
          setWaiting(false);
        }
      });
    }
  } catch (error) {
    setWaiting(false);
    setButtonText(null);
    axiosError(error, (er: any) => toast.error(er));
  } finally {
  }
}

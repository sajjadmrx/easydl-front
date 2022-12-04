import React, { FormEvent, useEffect } from "react";
import { ClearButtonComponent } from "../clearInput.component";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SupportMediaComponent } from "../support-media.component";
import { youtubeService } from "../../service/index.service";
import { YoutubeVideoDetails } from "../../shared/interfaces/youtube.interface";
import "@fortawesome/fontawesome-svg-core";
import { axiosError } from "../../handlers/error.handler";
import { toast } from "react-toastify";
import { YoutubeSelectorComponent } from "./youtube.selector";
import { Badge } from "react-daisyui";

export function YoutubeForm() {
  const [errorState, setErrorState] = React.useState<boolean>(false);
  const [buttonText, setButtonText] = React.useState<string | undefined>("");
  const [localInput, setLocalInput] = React.useState<string>("");
  const [waiting, setWaiting] = React.useState<boolean>(false);
  const [details, setDetails] = React.useState<YoutubeVideoDetails>({} as any);

  useEffect(() => {
    if (waiting) setButtonText("در حال دریافت دیتا...");
    else setButtonText("دانلود");
  }, [waiting]);
  useEffect(() => {
    if (!localInput) {
      setDetails({} as any);
    }
  }, [localInput]);
  return (
    <div>
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => submitHandle(e, localInput, setWaiting, setDetails)}
      >
        <div className="relative w-full max-w-xs">
          <div className={""}>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=...."
              className="input input-bordered  w-full max-w-xs mb-2"
              dir={"auto"}
              id={"youtube"}
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
            />
            {localInput != "" ? (
              <ClearButtonComponent setInput={setLocalInput} />
            ) : (
              ""
            )}
          </div>
        </div>
        <SupportMediaComponent media={["video", "short_video"]}>
          <Badge color={"warning"} variant={"outline"} className={"h-[20px]"}>
            آزمایشی
          </Badge>
        </SupportMediaComponent>
        <button
          className={`btn btn-wide ${waiting && "loading"}`}
          disabled={details.details && true}
        >
          {!waiting && (
            <FontAwesomeIcon icon={["fas", "download"]} className={"ml-2.5"} />
          )}
          {buttonText}
        </button>
      </form>
      <div
        className={"mt-2"}
        style={{ display: details.details ? "block" : "none" }}
      >
        {details.details && <YoutubeSelectorComponent details={details} />}
      </div>
    </div>
  );
}

async function submitHandle(
  e: FormEvent<HTMLFormElement>,
  input: string,
  setWaiting: any,
  setDetails: (details: YoutubeVideoDetails) => any
) {
  e.preventDefault();
  const value = getQueryString(String(input));
  if (!value) return toast.error("یک لینک معتبر وارد کنید");
  setWaiting(true);
  try {
    const details: YoutubeVideoDetails = await youtubeService.getDetails(value);

    setDetails(details);
  } catch (e) {
    axiosError(e, toast.error);
  } finally {
    setWaiting(false);
  }
}

function getQueryString(url: string) {
  let rx =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const result: any = url.match(rx);
  if (!result) return null;
  return result[1];
}

import React from "react";
import { ClearButtonComponent } from "../clearInput.component";
import { Badge } from "react-daisyui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SupportMediaComponent } from "../support-media.component";

export function YoutubeForm() {
  const [errorState, setErrorState] = React.useState<boolean>(false);
  const [buttonText, setButtonText] = React.useState<string | undefined>("");
  const [localInput, setLocalInput] = React.useState<string>("");
  const [waiting, setWaiting] = React.useState<boolean>(false);
  return (
    <div>
      <form className="flex flex-col items-center">
        <div className="relative w-full max-w-xs">
          <div className={""}>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=...."
              className="input input-bordered  w-full max-w-xs mb-2"
              dir={"auto"}
            />
            {localInput != "" ? (
              <ClearButtonComponent setInput={setLocalInput} />
            ) : (
              ""
            )}
          </div>
        </div>
        <SupportMediaComponent media={["video"]} />
        <button className="btn btn-wide ">دانلود</button>
      </form>
    </div>
  );
}

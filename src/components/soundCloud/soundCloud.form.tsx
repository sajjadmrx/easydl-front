import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { formContext } from "../../contexts/formContext";
import { soundcloudService } from "../../service/index.service";
import { isLink } from "../../utils/regex.util";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ClearButtonComponent } from "../clearInput.component";
import { Badge } from "react-daisyui";
import React from "react";
import { axiosError } from "../../handlers/error.handler";

export function SoundCloudFormComponent(props: any) {
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
      id={"soundCloudForm"}
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
          <ClearButtonComponent setLocalInput={setLocalInput} />
        ) : (
          ""
        )}
      </div>
      <div className={"mb-2"}>
        <span>پشتیبانی از</span>
        <div className={"flex mt-2"}>
          <Badge color={"ghost"} responsive={true}>
            موزیک
          </Badge>
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
      return toast.warning("لطفا تا پایان دانلود صبر کنید...");
    let value = e.target.querySelector("input").value;
    if (!value || !isLink(value)) return toast.error("یک لینک معتبر وارد کنید");
    setWaiting(true);
    setButtonText("لطفا صبر کنید...");
    formContext.setLoading(true);
    await soundcloudService.download(value, (prog: any) => {
      if (prog == 100) {
        setWaiting(false);
        setButtonText(null);
      }
    });
  } catch (error: any) {
    setWaiting(false);
    setButtonText(null);
    axiosError(error, (er: any) => toast.error(er));
  } finally {
    // formContext.setLoading(false)
  }
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { FormContext } from "../../contexts/form.context";
import {
  radioJavanService,
  soundcloudService,
} from "../../service/index.service";
import { isLink, isRjLinkMp3, isRjLinkPodCast } from "../../utils/regex.util";
import { toast } from "react-toastify";
import { axiosError } from "../../handlers/error.handler";
import { ClearButtonComponent } from "../clearInput.component";
import { Badge } from "react-daisyui";

export function RadioJavanFormComponent(props) {
  const [buttonText, setButtonText] = useState("دانلود");
  const [waiting, setWaiting] = useState(false);
  const formContext = useContext(FormContext);
  const [localInput, setLocalInput] = useState("");
  useEffect(() => {
    if (!buttonText) {
      setButtonText("دانلود");
      formContext.setLoading(false);
    }
  }, [buttonText]);
  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) =>
        downloadHandler(e, setWaiting, setButtonText, formContext)
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
          <ClearButtonComponent setLocalInput={setLocalInput} />
        ) : (
          ""
        )}
      </div>
      <div className={"mb-2"}>
        <span>پشتیبانی از</span>
        <Badge color={"ghost"} responsive={true}>
          موزیک
        </Badge>
        <Badge color={"ghost"} responsive={true}>
          پادکست
        </Badge>
      </div>
      <button className={`btn btn-wide ${waiting && "loading"}`}>
        {!waiting && (
          <FontAwesomeIcon icon={["fas", "download"]} className="mr-2" />
        )}
        {buttonText}
      </button>
    </form>
  );
}

async function downloadHandler(e, setWaiting, setButtonText, formContext) {
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
      await radioJavanService.downloadMp3(value, (progress) => {
        setButtonText(`${progress}% در حال دانلود ...`);
        if (progress == 100) {
          setButtonText(null);
          setWaiting(false);
        }
      });
    }
    if (targetUrl == "rj-podcast") {
      await radioJavanService.downloadPodCast(value, (progress) => {
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
    axiosError(error, (er) => toast.error(er));
  } finally {
  }
}

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { spotifyService } from "../../service/index.service";
import { axiosError } from "../../handlers/error.handler";
import { isLink, isSpotifyLink } from "../../utils/regex.util";
import { useEffect } from "react";
import { FormContext } from "../../contexts/form.context";
import { SpotifyResultContext } from "../../contexts/spotifyResult.context";
import { toast } from "react-toastify";

export function SpotifyFormComponent() {
  const [errorState, setErrorState] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("");
  const [waiting, setWaiting] = React.useState(false);
  const fromContext = React.useContext(FormContext);
  const spotifyResultContext = React.useContext(SpotifyResultContext);
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
          fromContext
        )
      }
    >
      <input
        type="text"
        placeholder="لینک موزیک خود را وارد کنید..."
        className="input input-bordered  w-full max-w-xs mb-2"
      />
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
  fromContext
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
      targetUrl = "spotify";
      break;
    default:
      targetUrl = "unknown";
  }

  if (targetUrl == "unknown") {
    toast.warning("لطفا یک لینک معتبر وارد کنید");
    return;
  }
  try {
    if (targetUrl == "spotify") {
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

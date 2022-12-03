import React, { useState, useEffect, useContext } from "react";
import { WarningAlertComponent } from "../alerts.component";
import { SpotifySongComponent } from "./spotify.song";
import { toast } from "react-toastify";
import { axiosError } from "../../handlers/error.handler";
import { spotifyResultContext } from "../../contexts/spotifyResultContext";
import { spotifyService } from "../../service/index.service";
import { formContext } from "../../contexts/formContext";
import { SpotifyResultContext } from "../../shared/interfaces/spotifyResultContext.interface";

export function SpotifySongsComponent(props: any) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const spotifyResultContextData: SpotifyResultContext =
    useContext(spotifyResultContext);
  const formContextData = useContext(formContext);
  useEffect(() => {
    // @ts-ignore
    if (errorState && errorState != "") {
      alert(errorState);
    }
  }, [errorState]);
  return (
    <div className={props.className}>
      {/*<div className={'text-center'}>*/}
      {/*{spotifyResultContext.songs.length > 0 ? <span className="mb-4">نتیجه جستوجو : {spotifyResultContext.songs.length} مورد یافت شد.</span> : <span></span>}*/}
      {/*</div>*/}
      <div
        className={`grid grid-flow-row-dense grid-cols-1 grid-rows-1 md:grid-cols-3`}
      >
        {spotifyResultContextData.songs.map((song, index) => {
          return (
            <SpotifySongComponent
              song={song}
              key={index + 1}
              index={index + 1}
              downloadHandler={(setValueProgress: any, setWaiting: any) => {
                downloadHandler(
                  song.id,
                  song.platforms,
                  setValueProgress,
                  setWaiting,
                  formContext
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

async function downloadHandler(
  id: any,
  platform: any,
  setValueProgress: any,
  setWaiting: any,
  formContext: any
) {
  try {
    if (formContext.loading) {
      return toast.info("لطفا تا پایان دانلود صبر کنید");
    }
    setWaiting(true);

    await spotifyService.download(
      { id, spotifyUrl: formContext.inputValue },
      (res: any) => {
        if (res == 100) {
          setValueProgress(0);
          formContext.setLoading(false);
        }
        if (res > 0) {
          setValueProgress(res);
        }
        if (res == 1) {
          setWaiting(false);
        }
      }
    );
  } catch (error) {
    setValueProgress(0);
    setWaiting(false);
    axiosError(error, (err: any) => toast.error(err));
    formContext.setLoading(false);
  }
}

import React, { useState, useEffect, useContext } from "react";
import { SpotifySongComponent } from "./spotify.song";
import { toast } from "react-toastify";
import { axiosError } from "../../handlers/error.handler";
import { spotifyResultContext } from "../../contexts/spotifyResultContext";
import { spotifyService } from "../../service/index.service";
import { formContext } from "../../contexts/formContext";
import { SpotifyResultContext } from "../../shared/interfaces/spotify.interface";
import { FormContext } from "../../shared/interfaces/FormContext.interface";

interface Props {
  className?: string;
}

export function SpotifySongsComponent(props: Props): JSX.Element {
  const spotifyResultContextData: SpotifyResultContext =
    useContext(spotifyResultContext);
  const formContextData = useContext<FormContext>(formContext);
  return (
    <div className={props.className}>
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
                  formContextData
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
  id: string,
  platforms: string[],
  setValueProgress: any,
  setWaiting: any,
  formContext: FormContext
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

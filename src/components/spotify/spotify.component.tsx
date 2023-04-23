import React, { useContext, useEffect, useState } from "react";
import { spotifyDownloader, SpotifyFormComponent } from "./spotify.form";
import { spotifyConnectionContext } from "../../contexts/spotify-con.context";
import { SpotifyConnectionContext } from "../../shared/interfaces/spotify.interface";
import { connectionsService } from "../../service/index.service";
import ms from "ms";
import { SpotifyCurrentPlaying } from "../../shared/interfaces/connection.interface";
import { RiRadioButtonLine } from "react-icons/ri";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Avatar, Button } from "react-daisyui";
import { formContext } from "../../contexts/formContext";
import { SpotifyFormHandler } from "./spotify.formHandler";
import { authContext } from "../../contexts/authContext";
import { toast } from "react-toastify";

export function SpotifyComponent() {
  const spotifyConnectionContextData = useContext<SpotifyConnectionContext>(
    spotifyConnectionContext
  );
  const formContextData = useContext(formContext);
  const authContextData = useContext(authContext);
  const [currentPlaying, setCurrentPlaying] =
    useState<SpotifyCurrentPlaying | null>(null);

  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    async function fetchMe() {
      try {
        const info = await connectionsService.getSpotifyMe();
        spotifyConnectionContextData.setIsConnect(true);
        spotifyConnectionContextData.setInfo(info);
      } catch (e) {
        spotifyConnectionContextData.setIsConnect(false);
      }
    }
    fetchMe();
  }, []);

  useEffect(() => {
    let interval: any = null;
    let time = ms("10s");
    if (spotifyConnectionContextData.isConnect) {
      async function fetchCurrentPlaying() {
        try {
          const data: SpotifyCurrentPlaying =
            await connectionsService.getSpotifyCurrentPlaying();
          setCurrentPlaying(data);
        } catch (e) {}
      }
      fetchCurrentPlaying();
      interval = setInterval(() => {
        fetchCurrentPlaying();
      }, time);
    }
    return () => clearInterval(interval);
  }, [spotifyConnectionContextData.isConnect]);

  async function downloadHandling(url: string) {
    if (formContextData.loading)
      return toast.error("لطفا تا پایان عملیات قبلی صبر کنید.");

    const spotifyFormHandler: SpotifyFormHandler = new SpotifyFormHandler(
      formContextData,
      authContextData,
      () => {}
    );

    try {
      await spotifyDownloader(url, spotifyFormHandler, console.log);
    } catch {
    } finally {
      formContextData.setLoading(false);
    }
  }
  return (
    <div>
      <SpotifyFormComponent url={url} />
      <>
        {currentPlaying && (
          <div className="shadow-lg rounded-lg p-2 flex items-center mt-4">
            <Avatar
              src={currentPlaying.item.album.images[0].url}
              shape={"square"}
              size={"sm"}
              className="s mr-4"
            />
            <div className="flex flex-col flex-1 w-auto">
              <div className="flex justify-center items-center mt-2 mb-2">
                <p className="text-sm text-green-600 flex gap-2">
                  <RiRadioButtonLine className={"mt-1 animate-ping"} /> در حال
                  گوش دادن:{" "}
                </p>
              </div>
              <h2 className="text-base font-bold truncate">
                {currentPlaying.item.name}
              </h2>
              <p className="text-sm  truncate w-40 md:w-auto">
                {currentPlaying.item.artists.map((ar) => ar.name).join(", ")}
              </p>
              <p className="text-sm  truncate w-40 md:w-auto">
                <Button
                  className=" gap-2 "
                  color={"ghost"}
                  disabled={formContextData.loading}
                  onClick={() =>
                    setUrl(
                      currentPlaying?.item.external_urls.spotify +
                        `?state=${Date.now()}`
                    )
                  }
                >
                  <AiOutlineCloudDownload className={""} />
                  دانلود
                </Button>
                {}
              </p>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

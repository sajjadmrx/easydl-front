import React, { useContext, useEffect, useState } from "react";
import { BsSpotify } from "react-icons/bs";
import { connectionsService } from "../../../../service/index.service";
import { spotifyConnectionContext } from "../../../../contexts/spotify-con.context";
import { SpotifyConnectionContext } from "../../../../shared/interfaces/spotify.interface";
import { axiosError } from "../../../../handlers/error.handler";
import { toast } from "react-toastify";

export function SpotifyConnectionStat() {
  const spotifyConnectionContextData = useContext<SpotifyConnectionContext>(
    spotifyConnectionContext
  );
  const [me, setMe] = useState<any>();
  useEffect(() => {
    async function fetchMe() {
      try {
        const result = await connectionsService.getSpotifyMe();
        setMe(result.data);
        spotifyConnectionContextData.setIsConnect(true);
        spotifyConnectionContextData.setInfo(result.data);
      } catch (e) {
        setMe(null);
      }
    }
    fetchMe();
  }, []);

  return (
    <div className="stat">
      <div className="stat-figure ">
        <BsSpotify
          size={40}
          className={!me ? "text-gray-400" : "text-green-600"}
        />
      </div>
      <div className="stat-title">وضعیت اکانت اسپاتیفای</div>

      <div className={"grid items-center px-6 mt-2"}>
        {!me ? (
          <span className="bg-red-400 text-gray-50 rounded-md">غیرفعـال</span>
        ) : (
          <span className="bg-green-400 text-gray-50 rounded-md">فعال</span>
        )}
      </div>
    </div>
  );
}

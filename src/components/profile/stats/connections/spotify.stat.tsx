import React, { useContext, useEffect, useState } from "react";
import { BsSpotify } from "react-icons/bs";
import { connectionsService } from "../../../../service/index.service";
import { spotifyConnectionContext } from "../../../../contexts/spotify-con.context";
import { SpotifyConnectionContext } from "../../../../shared/interfaces/spotify.interface";

export function SpotifyConnectionStat() {
  const spotifyConnectionContextData = useContext<SpotifyConnectionContext>(
    spotifyConnectionContext
  );

  return (
    <div className="stat">
      <div className="stat-figure ">
        <BsSpotify
          size={40}
          className={
            !spotifyConnectionContextData.isConnect
              ? "text-gray-400"
              : "text-green-600"
          }
        />
      </div>
      <div className="stat-title">وضعیت اکانت اسپاتیفای</div>

      <div className={"grid items-center px-6 mt-2"}>
        {!spotifyConnectionContextData.isConnect ? (
          <span className="bg-red-400 text-gray-50 rounded-md">غیرفعـال</span>
        ) : (
          <span className="bg-green-400 text-gray-50 rounded-md">فعال</span>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useId, useState } from "react";
import { ProgressDownload } from "../progressDownload.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SpotifySongComponent(props) {
  const song = props.song;
  const photo = song.photo;
  const index = props.index;

  const [witing, setWiting] = useState(false);
  const [valueProgress, setValueProgress] = useState(0);
  const { downloadHandler } = props;
  return (
    <div
      id={useId()}
      className="shadow-xl flex flex-col items-center p-5 transition-colors duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-xl "
    >
      {index == 1 && (
        <span className="indicator-item badge badge-success mb-2">
          بیشترین دانلود
        </span>
      )}
      <img
        className="object-cover w-32 h-32 rounded-full ring-4 mask mask-hexagon"
        src={photo}
        alt={song.artist}
      />

      <h1 className="mt-4 text-2xl font-semibold  capitalize dark:text-white group-hover:text-white">
        {song.artist}
      </h1>

      <p className="mt-2 text-gray-500 capitalize dark:text-gray-100 group-hover:text-gray-300">
        {song.name.slice(0, 40)}
      </p>

      <div className="flex mt-3 -mx-2">
        <div>
          {witing && valueProgress != 100 ? (
            <div>
              <button
                aria-label="loading button"
                className="btn btn-ghost loading btn-sm btn-circle"
              ></button>
            </div>
          ) : (
            <button
              onClick={() => downloadHandler(setValueProgress, setWiting)}
              className="btn btn-ghost mx-2 text-gray-500 dark:text-gray-300 group-hover:text-gray-300"
              style={{ display: valueProgress > 0 ? "none" : "block" }}
            >
              <FontAwesomeIcon icon={["fas", "music"]} className={"mr-2"} />
              <span>دانلود</span>
            </button>
          )}
        </div>
        <ProgressDownload valueProgress={valueProgress} />
      </div>
    </div>
  );
}

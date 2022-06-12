import React, { useEffect, useId, useState } from "react"
import { ProgressDownload } from "./progressDownload.component";






export function MusicComponent(props) {
    const song = props.song;
    const photo = song.photo;
    const [witing, setWiting] = useState(false);
    const [valueProgress, setValueProgress] = useState(0);
    const { downloadHandler } = props
    return (
        <div id={useId()} className="shadow-xl flex flex-col items-center p-5 transition-colors duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-xl ">
            <img className="object-cover w-32 h-32 rounded-full ring-4 mask mask-hexagon" src={photo} alt="" />

            <h1 className="mt-4 text-2xl font-semibold  capitalize dark:text-white group-hover:text-white">
                {song.artist}
            </h1>

            <p className="mt-2 text-gray-500 capitalize dark:text-gray-100 group-hover:text-gray-300">
                {song.name.slice(0, 19)}
            </p>

            <div className="flex mt-3 -mx-2">
                <div>
                    {witing ? <div>
                        <button aria-label="loading button" className="btn btn-ghost loading btn-sm btn-circle"></button>
                    </div> : <a href="javascript: void(0)" onClick={() => downloadHandler(setValueProgress, setWiting)} className="mx-2 text-gray-500 dark:text-gray-300 group-hover:text-gray-300" style={{ display: valueProgress > 0 ? 'none' : 'block' }}>
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </a>}
                </div>
                <ProgressDownload valueProgress={valueProgress} />
            </div>
        </div>
    )
}



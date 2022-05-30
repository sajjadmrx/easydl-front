import React, { useState, useEffect } from "react";
import { WarningAlertComponent } from "./alerts.component";
import { MusicComponent } from "./music.component";
import { ApiService } from "../service/api.service";
import { SpotifyService } from "../service/spotify.service";
import { toast } from "react-toastify";

const apiService = new ApiService();
const spotifyService = new SpotifyService(apiService);
export function SongsComponent(props) {
    const songs = props.songs;
    const [isDownloading, setIsDownloading] = useState(false);

    return (
        <div>
            {songs.length > 0 ? <WarningAlertComponent className='mb-2' text="لطفا جهت حمایت از آرتیس و پلتفرم یک بار در پلتفرم مورد نظر گوش بدید" /> : ""}
            <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
                {songs.map((song, index) => {
                    return <MusicComponent key={createUniqueId(index)} song={song} downloadHandler={(setValueProgress, setWiting) => {
                        downloadHandler(song.id, song.platforms, isDownloading, setIsDownloading, setValueProgress, setWiting)
                    }} />
                })}
            </div>
        </div>

    )
}
async function downloadHandler(id, platform, isDownloading, setIsDownloading, setValueProgress, setWiting) {
    try {
        if (isDownloading) {
            return toast.info("لطفا تا پایان دانلود صبر کنید")
        }
        setWiting(true);
        setIsDownloading(true)
        await spotifyService.download(`download/spotify?id=${id}`, (res) => {
            console.log(res)
            if (res == 100) {
                setValueProgress(0)
                setIsDownloading(false)
            }
            if (res > 0) {
                setValueProgress(res)
            }
            if (res == 1)
                setWiting(false)
        })
    } catch (error) {
        console.log(error)
        setIsDownloading(false)
        //reset states
        setValueProgress(0)
        setWiting(false)
    }
}
function createUniqueId(id) {
    return `${id}-${Math.random() * 100 + new Date().getTime()}`
}
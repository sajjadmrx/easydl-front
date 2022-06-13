import React, { useState, useEffect, } from "react";
import { WarningAlertComponent } from "./alerts.component";
import { MusicComponent } from "./music.component";
import { ApiService } from "../service/api.service";
import { toast } from "react-toastify";
import { axiosError } from "../handlers/error.handler";
import { spotifyService } from "../service/index.service";


export function SongsComponent(props) {
    const songs = props.songs;
    const [isDownloading, setIsDownloading] = useState(false);
    const [errorState, setErrorState] = useState(false);
    useEffect(() => {
        if (errorState && errorState != '') {
            toast.error(errorState)
        }
    }, [errorState])
    return (
        <div>
            {songs.length > 0 ? <WarningAlertComponent className='mb-2' text="لطفا جهت حمایت از آرتیست و پلتفرم یک بار در پلتفرم مورد نظر گوش بدید" /> : ""}
            <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-3 md:grid-cols-3">
                {songs.map((song, index) => {

                    return <MusicComponent song={song} key={index + 1} downloadHandler={(setValueProgress, setWiting) => {
                        downloadHandler(song.id, song.platforms, isDownloading, setIsDownloading, setValueProgress, setWiting, setErrorState)
                    }} />
                })}
            </div>
        </div>

    )
}
async function downloadHandler(id, platform, isDownloading, setIsDownloading, setValueProgress, setWiting, setErrorState) {
    try {
        if (isDownloading) {
            return toast.info("لطفا تا پایان دانلود صبر کنید")
        }
        setWiting(true);

        setIsDownloading(true)
        await spotifyService.download(id, (res) => {
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
        setIsDownloading(false)
        setValueProgress(0)
        setWiting(false)
        axiosError(error, setErrorState)
    }
}

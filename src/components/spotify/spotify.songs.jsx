import React, { useState, useEffect, } from "react";
import { WarningAlertComponent } from "../alerts.component";
import { SpotifySongComponent } from "./spotify.song";
import { toast } from "react-toastify";
import { axiosError } from "../../handlers/error.handler";


export function SpotifySongsComponent(props) {
    const songs = props.songs;
    const [isDownloading, setIsDownloading] = useState(false);
    const [errorState, setErrorState] = useState(false);
    // const { inputSearchValue, setinputSearchValue } = React.useContext(InputSearchValueContext)

    useEffect(() => {
        if (errorState && errorState != '') {
            alert(errorState)
        }
    }, [errorState])
    return (
        <div className={props.className}>
            {songs.length > 0 ? <span className="mb-4">نتیجه جستوجو : {songs.length} مورد یافت شد.</span> : <span></span>}
            <div className={`grid grid-flow-row-dense grid-cols-1 grid-rows-1 md:grid-cols-2`}>
                {songs.map((song, index) => {

                    return <SpotifySongComponent song={song} key={index + 1} downloadHandler={(setValueProgress, setWiting) => {
                        downloadHandler(song.id, song.platforms, isDownloading, setIsDownloading, setValueProgress, setWiting, setErrorState)
                    }} />
                })}
            </div>
        </div>



    )
}
async function downloadHandler(id, platform, isDownloading, setIsDownloading, setValueProgress, setWiting, setErrorState, inputSearchValue) {
    try {
        if (isDownloading) {
            return toast.info("لطفا تا پایان دانلود صبر کنید")
        }
        setWiting(true);

        setIsDownloading(true)
        // await spotifyService.download({ id, spotifyUrl: inputSearchValue }, (res) => {
        //     if (res == 100) {
        //         setValueProgress(0)
        //         setIsDownloading(false)
        //     }
        //     if (res > 0) {
        //         setValueProgress(res)
        //     }
        //     if (res == 1)
        //         setWiting(false)
        // })
    } catch (error) {
        setIsDownloading(false)
        setValueProgress(0)
        setWiting(false)
        axiosError(error, setErrorState)
    }
}

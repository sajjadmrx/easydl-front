import React, {useState, useEffect, useContext,} from "react";
import {WarningAlertComponent} from "../alerts.component";
import {SpotifySongComponent} from "./spotify.song";
import {toast} from "react-toastify";
import {axiosError} from "../../handlers/error.handler";
import {SpotifyResultContext} from "../../contexts/spotifyResult.context";
import {spotifyService} from "../../service/index.service";
import {FormContext} from "../../contexts/form.context";


export function SpotifySongsComponent(props) {

    const [isDownloading, setIsDownloading] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const spotifyResultContext = useContext(SpotifyResultContext)
    const formContext = useContext(FormContext)
    useEffect(() => {
        if (errorState && errorState != '') {
            alert(errorState)
        }
    }, [errorState])
    return (
        <div className={props.className}>
            {/*<div className={'text-center'}>*/}
            {/*{spotifyResultContext.songs.length > 0 ? <span className="mb-4">نتیجه جستوجو : {spotifyResultContext.songs.length} مورد یافت شد.</span> : <span></span>}*/}
            {/*</div>*/}
            <div className={`grid grid-flow-row-dense grid-cols-1 grid-rows-1 md:grid-cols-3`}>
                {spotifyResultContext.songs.map((song, index) => {

                    return <SpotifySongComponent song={song} key={index + 1}
                                                 downloadHandler={(setValueProgress, setWiting) => {
                                                     downloadHandler(song.id, song.platforms, setValueProgress, setWiting, formContext)
                                                 }}/>
                })}
            </div>
        </div>


    )
}

async function downloadHandler(id, platform, setValueProgress, setWiting, formContext) {
    try {
        if (formContext.loading) {
            return toast.info("لطفا تا پایان دانلود صبر کنید")
        }
        setWiting(true);

        await spotifyService.download({id, spotifyUrl: formContext.inputValue}, (res) => {
            if (res == 100) {
                setValueProgress(0)
                formContext.setLoading(false)
            }
            if (res > 0) {
                setValueProgress(res)
            }
            if (res == 1) {
                setWiting(false)
            }
        })
    } catch (error) {
        setValueProgress(0)
        setWiting(false)
        axiosError(error, (err) => alert(err))
        formContext.setLoading(false)

    }
}

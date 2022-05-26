import React, { useContext } from "react";
import { SongsContext } from "../contexts/songs.context";
import { WarningAlertComponent } from "./alerts.component";
import { MusicComponent } from "./music.component";


export function SongsComponent(props) {
    const songs = props.songs;


    return (
        <div>
            {songs.length > 0 ? <WarningAlertComponent className='mb-2' text="لطفا جهت حمایت از آرتیس و پلتفرم یک بار در پلتفرم مورد نظر گوش بدید" /> : ""}
            <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
                {songs.map((song, index) => {
                    return <MusicComponent key={index} song={song} />
                })}
            </div>
        </div>

    )
}
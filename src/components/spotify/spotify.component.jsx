import { useState } from "react";
import { SpotifyFormComponent } from "./spotify.form";
import { SpotifySongsComponent } from "./spotify.songs";

export function SpotifyComponent() {
    const [songs, setSongs] = useState([])
    return (
        <div>
            <SpotifyFormComponent setSongs={setSongs} />

            <SpotifySongsComponent songs={songs} className="mt-2 py-5" />
        </div>
    )
}
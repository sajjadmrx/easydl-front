import React from "react";
import { useState } from "react";
import { SpotifyFormComponent } from "./spotify.form";
import { SpotifySongsComponent } from "./spotify.songs";

export function SpotifyComponent() {
  const [songs, setSongs] = useState([]);
  return (
    <div>
      <SpotifyFormComponent setSongs={setSongs} />
    </div>
  );
}

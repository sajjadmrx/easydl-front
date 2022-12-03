import { createContext } from "react";
import { SpotifyResultContext } from "../shared/interfaces/spotify.interface";

export const spotifyResultContext = createContext<SpotifyResultContext>({
  songs: [],
  setSongs: () => {},
});

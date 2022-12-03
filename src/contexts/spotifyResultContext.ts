import { createContext } from "react";
import { SpotifyResultContext } from "../shared/interfaces/spotifyResultContext.interface";

export const spotifyResultContext = createContext<SpotifyResultContext>({
  songs: [],
  setSongs: () => {},
});

import { createContext } from "react";

export const SpotifyResultContext = createContext({
  songs: [],
  setSongs: () => {},
});

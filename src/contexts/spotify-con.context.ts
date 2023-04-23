import { createContext } from "react";
import { SpotifyConnectionContext } from "../shared/interfaces/spotify.interface";

export const spotifyConnectionContext = createContext<SpotifyConnectionContext>(
  {
    isConnect: false,
    setIsConnect: () => {},
    info: {},
    setInfo: () => {},
  }
);

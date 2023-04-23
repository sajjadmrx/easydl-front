export interface SpotifySearchItem {
  name: string;
  description: string;
  title: string;
  id: string;
  photo: string;
  artist: string;
  platforms: Array<string>;
  thumbnail: string;
  timestamp: string;
  author: {
    name: string;
    url: string;
  };
}

export interface SpotifyAlbum {
  readonly album_name: string;
}

export interface SpotifyPlaylist {
  playlist_name: string;
}
export interface SpotifyConnectionContext {
  isConnect: boolean;
  setIsConnect: any;
  info: any;
  setInfo: any;
}

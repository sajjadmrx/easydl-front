export interface SpotifyResultContext {
  songs: SpotifySearchItem[];
  setSongs: any;
}

export interface SpotifySearchItem {
  name: string;
  description: string;
  title: string;
  id: string;
  photo: string;
  artist: string;
  platforms: Array<string>;
}

export interface SpotifyAlbum {
  readonly album_name: string;
}

export interface SpotifyPlaylist {
  playlist_name: string;
}

export interface SpotifyConnectionInfo {
  display_name: string;
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyFollowers {
  href: null;
  total: number;
}

export interface Image {
  height: null;
  url: string;
  width: null;
}

export interface SpotifyCurrentPlaying {
  progress_ms: number;
  is_playing: boolean;
  item: SpotifyItem;
}

export interface SpotifyItem {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface SpotifyArtist {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface SpotifyAlbum {
  album_group: string;
  album_type: string;
  artists: SpotifyArtist[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

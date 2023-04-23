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

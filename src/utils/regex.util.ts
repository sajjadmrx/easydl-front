export function isLink(value: string) {
  const regex = /^(http|https):\/\/[^ "]+$/;
  return regex.test(value);
}
export function isRjLinkMp3(value: string) {
  const links = ["https://rj.app/m/", "https://www.radiojavan.com/mp3s/mp3/"];
  return links.some((link) => value.startsWith(link));
}
export function isRjLinkPodCast(value: string) {
  const links = ["https://rj.app/p/", "https://www.radiojavan.com/podcasts/"];
  return links.some((link) => value.startsWith(link));
}
export function isRjLinkMusicVideo(value: string) {
  const links = [
    "https://rj.app/v/",
    "https://www.radiojavan.com/videos/video",
  ];
  return links.some((link) => value.startsWith(link));
}
export function isSpotifyLink(value: string) {
  const regex = /^(http|https):\/\/open\.spotify\.com\/track\/[^ "]+$/;
  return regex.test(value);
}
export function isSpotifyAlbumLink(value: string) {
  const regex = /^(http|https):\/\/open\.spotify\.com\/album\/[^ "]+$/;
  return regex.test(value);
}
export function isSpotifyPlaylistLink(value: string) {
  const regex = /^(http|https):\/\/open\.spotify\.com\/playlist\/[^ "]+$/;
  return regex.test(value);
}
export function isSoundcloudLink(value: string) {
  const regex = /^(http|https):\/\/soundcloud\.com\/[^ "]+$/;
  return regex.test(value);
}
export function removeScript(value: string) {
  if (!value) return value;
  return value.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
}

export function getFileName(disposition: any) {
  const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)(?:; ?|$)/i;
  const asciiFilenameRegex = /^filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i;

  let fileName = null;
  if (utf8FilenameRegex.test(disposition)) {
    // @ts-ignore
    fileName = decodeURIComponent(utf8FilenameRegex.exec(disposition)[1]);
  } else {
    // prevent ReDos attacks by anchoring the ascii regex to string start and
    //  slicing off everything before 'filename='
    const filenameStart = disposition.toLowerCase().indexOf("filename=");
    if (filenameStart >= 0) {
      const partialDisposition = disposition.slice(filenameStart);
      const matches = asciiFilenameRegex.exec(partialDisposition);
      if (matches != null && matches[2]) {
        fileName = matches[2];
      }
    }
  }
  return fileName;
}

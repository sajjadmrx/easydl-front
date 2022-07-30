export function isLink(value) {
  const regex = /^(http|https):\/\/[^ "]+$/;
  return regex.test(value);
}
export function isRjLinkMp3(value) {
  const links = ["https://rj.app/m/", "https://www.radiojavan.com/mp3s/mp3/"];
  return links.some((link) => value.startsWith(link));
}
export function isRjLinkPodCast(value) {
  const links = ["https://rj.app/p/", "https://www.radiojavan.com/podcasts/"];
  return links.some((link) => value.startsWith(link));
}
export function isSpotifyLink(value) {
  const regex = /^(http|https):\/\/open\.spotify\.com\/track\/[^ "]+$/;
  return regex.test(value);
}
export function isSoundcloudLink(value) {
  const regex = /^(http|https):\/\/soundcloud\.com\/[^ "]+$/;
  return regex.test(value);
}
export function removeScript(value) {
  if (!value) return value;
  return value.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
}

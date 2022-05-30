export function isLink(value) {
    const regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(value);
}
export function isRjLink(value) {
    const links = ['https://rj.app/m/', 'https://www.radiojavan.com/mp3s/mp3/']
    return links.some(link => value.startsWith(link));
}
export function isSpotifyLink(value) {
    const regex = /^(http|https):\/\/open\.spotify\.com\/track\/[^ "]+$/;
    return regex.test(value);
}
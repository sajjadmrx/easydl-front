// const cacheName = "cache-v1";
const staticAssets = [
  "./logo.png",
  "./logo16.png",
  "./logo32.png",
  "./logo64.png",
  "./logo192.png",
  "./logo512.png",
  "./brands/rj.png",
  "./brands/soundcloud.png",
  "./brands/spotify.png",
  "./amozesh/install.mp4",
  "./amozesh/spotify.mp4",
];

const PRECACHE = "v1.4";
const RUNTIME = "runtime2";

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing Service Worker ...");
});

self.addEventListener("activate", (event) => {});

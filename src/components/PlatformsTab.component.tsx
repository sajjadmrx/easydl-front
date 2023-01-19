import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, Tab } from "./tab.component";
import { SpotifyComponent } from "./spotify/spotify.component";
import { RadioJavanComponent } from "./radioJavan/radioJavan.component";
import { SoundCloudComponent } from "./soundCloud/soundCloud.component";
import { YoutubeComponent } from "./youtube/youtube.component";
import { toast } from "react-toastify";
import { Alert } from "react-daisyui";

interface Platform {
  name: string;
  component: JSX.Element;
  imgSrc: string;
  imgAlt: string;
  isWorked: boolean;
}
const platforms: Platform[] = [
  {
    name: "اسپاتیفای",
    component: <SpotifyComponent />,
    imgSrc: "/brands/spotify.png",
    imgAlt: " ایزی دنلود,لوگو اسپاتیفای",
    isWorked: true,
  },
  {
    name: "رادیوجوان",
    component: <RadioJavanComponent />,
    imgSrc: "/brands/rj.png",
    imgAlt: "ایزی دنلود,لوگو رادیوجوان",
    isWorked: false,
  },
  {
    name: "ساندکلود",
    component: <SoundCloudComponent />,
    imgSrc: "/brands/soundcloud.png",
    imgAlt: "دانلود از ساندکلود",
    isWorked: true,
  },
  {
    name: "یوتیوب",
    component: <YoutubeComponent />,
    imgSrc: "/brands/youtube.png",
    imgAlt: "دانلود از یوتیوب",
    isWorked: true,
  },
];

export const PlatformsTab = () => {
  const sorted = platforms.sort(
    (a, b) => Number(b.isWorked) - Number(a.isWorked)
  );
  return (
    <Tabs>
      {sorted.map((platform: Platform) => {
        return (
          <Tab
            component={
              platform.isWorked ? (
                platform.component
              ) : (
                <Alert status={"warning"} icon={"⚒️"}>
                  درحال بروزرسانی...
                </Alert>
              )
            }
          >
            <div
              className="avatar"
              style={{ filter: platform.isWorked ? "none" : "sepia(1)" }}
            >
              {platform.isWorked}
              <div className="w-10 rounded-full">
                <img
                  src={platform.imgSrc}
                  className={"w-auto text-center"}
                  alt={platform.imgAlt}
                />
              </div>
            </div>
            {platform.name}
          </Tab>
        );
      })}
    </Tabs>
  );
};

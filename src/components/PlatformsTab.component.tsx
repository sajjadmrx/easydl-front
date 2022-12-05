import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, Tab } from "./tab.component";
import { SpotifyComponent } from "./spotify/spotify.component";
import { RadioJavanComponent } from "./radioJavan/radioJavan.component";
import { SoundCloudComponent } from "./soundCloud/soundCloud.component";
import { YoutubeComponent } from "./youtube/youtube.component";

interface Platform {
  name: string;
  component: JSX.Element;
  imgSrc: string;
  imgAlt: string;
}
const platforms: Platform[] = [
  {
    name: "اسپاتیفای",
    component: <SpotifyComponent />,
    imgSrc: "/brands/spotify.png",
    imgAlt: " ایزی دنلود,لوگو اسپاتیفای",
  },
  {
    name: "رادیوجوان",
    component: <RadioJavanComponent />,
    imgSrc: "/brands/rj.png",
    imgAlt: "ایزی دنلود,لوگو رادیوجوان",
  },
  {
    name: "ساندکلود",
    component: <SoundCloudComponent />,
    imgSrc: "/brands/soundcloud.png",
    imgAlt: "دانلود از ساندکلود",
  },
  {
    name: "یوتیوب",
    component: <YoutubeComponent />,
    imgSrc: "/brands/youtube.png",
    imgAlt: "دانلود از یوتیوب",
  },
];

export const PlatformsTab = () => {
  return (
    <Tabs>
      {platforms.map((platform: Platform) => {
        return (
          <Tab component={platform.component}>
            <div className="avatar">
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

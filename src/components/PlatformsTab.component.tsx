import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Tabs, Tab } from "./tab.component";
import { SpotifyComponent } from "./spotify/spotify.component";
import { RadioJavanComponent } from "./radioJavan/radioJavan.component";
import { SoundCloudComponent } from "./soundCloud/soundCloud.component";
import { YoutubeComponent } from "./youtube/youtube.component";

export const PlatformsTab = () => {
  return (
    <Tabs>
      <Tab component={<SpotifyComponent />} active>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={"/brands/spotify.png"}
              className={"w-auto text-center"}
              alt={" ایزی دنلود,لوگو اسپاتیفای"}
            />
          </div>
        </div>
        اسپاتیفای
      </Tab>
      <Tab component={<RadioJavanComponent />}>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={"/brands/rj.png"}
              className={"w-auto text-center"}
              alt={"ایزی دنلود,لوگو رادیوجوان"}
            />
          </div>
        </div>
        رادیوجوان
      </Tab>
      <Tab component={<SoundCloudComponent />}>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={"/brands/soundcloud.png"}
              className={"w-auto text-center"}
              alt={"دانلود از ساندکلود"}
            />
          </div>
        </div>
        ساندکلود
      </Tab>
      <Tab component={<YoutubeComponent />}>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={"/brands/youtube.png"}
              className={"w-auto text-center"}
              alt={"دانلود از یوتیوب"}
            />
          </div>
        </div>
        <span>یوتیوب </span>
      </Tab>
    </Tabs>
  );
};

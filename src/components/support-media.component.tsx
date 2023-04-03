import { Badge } from "react-daisyui";
import React from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { MdMusicVideo, MdVideoLibrary } from "react-icons/md";
import { FaPodcast, FaPhotoVideo } from "react-icons/fa";
import { IoIosAlbums } from "react-icons/io";
const mediaSupport = {
  music: {
    name: "موزیک",
    icon: <BsMusicNoteBeamed />,
  },
  playlist: {
    name: "پلی لیست",
    icon: <RiPlayListLine />,
  },
  album: {
    name: "آلبوم",
    icon: <IoIosAlbums />,
  },
  music_video: {
    name: "موزیک ویدیو",
    icon: <MdMusicVideo />,
  },
  video: {
    name: "ویدیو",
    icon: <MdVideoLibrary />,
  },
  short_video: {
    name: "ویدیو کوتاه",
    icon: <FaPhotoVideo />,
  },
  podcast: {
    name: "پادکست",
    icon: <FaPodcast />,
  },
};
interface Props {
  media: Array<keyof typeof mediaSupport>;
  classname?: string;
  children?: JSX.Element;
}

export function SupportMediaComponent(props: Props) {
  return (
    <div className={"mb-2 " + props.classname}>
      <span>پشتیبانی از</span>
      <div className={"flex mt-2"}>
        {props.media.map((mediaKey) => {
          const media = mediaSupport[mediaKey];
          return (
            <div>
              <Badge
                color={"ghost"}
                className={"mr-2  h-[25px] gap-1"}
                responsive={true}
              >
                {media.icon}
                {media.name}
              </Badge>
            </div>
          );
        })}
        {props.children}
      </div>
    </div>
  );
}

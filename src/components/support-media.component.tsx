import { Badge } from "react-daisyui";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const mediaSupport = {
  music: {
    name: "موزیک",
    icon: "music",
  },
  playlist: {
    name: "پلی لیست",
    icon: "fa-compact-disc",
  },
  album: {
    name: "آلبوم",
    icon: "fa-compact-disc",
  },
  music_video: {
    name: "موزیک ویدیو",
    icon: "fas fa-film",
  },
  video: {
    name: "ویدیو",
    icon: "video",
  },
};
interface Props {
  media: Array<keyof typeof mediaSupport>;
  classname?: string;
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
                className={"mr-2  h-[25px] "}
                responsive={true}
              >
                <FontAwesomeIcon
                  icon={media.icon as IconProp}
                  className={"mr-1 p-1"}
                />
                {media.name}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

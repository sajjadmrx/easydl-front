import React from "react";

export function VideoPlayerComponent(prop: any) {
  const url = prop.url;
  return (
    <div>
      <video className="w-full" controls>
        <source src={url} type="video/mp4" />
      </video>
    </div>
  );
}

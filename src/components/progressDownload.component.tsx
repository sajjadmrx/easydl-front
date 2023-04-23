import React from "react";
import { Progress } from "react-daisyui";

interface Props {
  valueProgress: number;
  className?: string;
  hideText?: boolean;
}

export function ProgressDownload(props: Props) {
  const valueState = props.valueProgress;
  const className: string = `flex items-center justify-center w-full h-full ${
    props.className || ""
  }`;
  return (
    <div
      className={className}
      style={{ display: valueState > 0 ? "block" : "none" }}
    >
      <p>{props.hideText ? "" : valueState + "%"}</p>
      <Progress
        className="progress progress-success w-56"
        value={valueState}
        max="100"
      ></Progress>
    </div>
  );
}

import React from "react";

interface Props {
    valueProgress: number;
    className?: string
    hideText?: boolean
}

export function ProgressDownload(props: Props) {
    const valueState = props.valueProgress;
    const className: string = `flex items-center justify-center w-full h-full ${props.className || ""}`
    return (
        <div
            className={className}
            style={{display: valueState > 0 ? "block" : "none"}}
        >
            {props.hideText ? "" : valueState + "%"}
            <progress
                className="progress progress-success w-56"
                value={valueState}
                max="100"
            ></progress>
        </div>
    );
}

import React from "react";
import {
  YoutubeDlSelector,
  YoutubeDlSelectorWithId,
  YoutubeVideoDetails,
} from "../../shared/interfaces/youtube.interface";

import { YtSelectorItemComponent } from "./selector.item";
import { toast } from "react-toastify";
import { FormContext } from "../../shared/interfaces/FormContext.interface";
import react from "react";
import { formContext } from "../../contexts/formContext";
import { Alert, Avatar, Button } from "react-daisyui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface Props {
  details: YoutubeVideoDetails;
}

export function YoutubeSelectorComponent(props: Props) {
  const { details, dlSelector, canDownload } = props.details;
  const filter = canDownload ? "none" : `blur(32px);`;
  const selectors: YoutubeDlSelectorWithId[] = dlSelector.map(
    (selector, index: number) => {
      index++;
      return {
        ...selector,
        id: String(index),
      };
    }
  );
  const formContextData: FormContext =
    react.useContext<FormContext>(formContext);
  return (
    <div>
      <div>
        <div className={"mt-2 mb-2"}>
          {/*<Avatar src={details.thumbnails[2].url} shape={"square"}></Avatar>*/}
          <br />
          <label className={"label-text"}>{details.title}</label>
        </div>
        {!canDownload && (
          <Alert
            className={"border border-red-500 rounded"}
            icon={<FontAwesomeIcon icon={"bell"} />}
          >
            برای حمایت از کاربران ' تولید محتوا ' امکان دانلود ویدیو یا موزیک
            دارای بازدید کم نیست.
          </Alert>
        )}
        {canDownload && (
          <div className={"relative border border-gray-700 rounded shadow-2xl"}>
            <div className={"bg-gray-900 p-3"}>
              <span className={"label-text text-gray-50"}>
                نوع و کیفیت مورد نظر خود را انتخاب کنید:
              </span>
            </div>
            <div className={"card items-center"}>
              <div className={"overflow-x-auto card-body"} dir={"auto"}>
                <div className={"grid h-[300px] w-[350px] "}>
                  {selectors.map(
                    (selector: YoutubeDlSelectorWithId, index: number) => {
                      return (
                        <YtSelectorItemComponent
                          selector={selector}
                          details={props.details}
                          key={"ikjoeigj:" + index}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

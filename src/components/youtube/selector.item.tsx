import React, { useEffect } from "react";
import {
  Badge,
  Button,
  Progress,
  RadialProgress,
  Tooltip,
} from "react-daisyui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  mediaQualityContent,
  mediaTypeConstant,
} from "../../shared/constants/media.constant";
import {
  YoutubeDlSelector,
  YoutubeDlSelectorWithId,
  YoutubeVideoDetails,
} from "../../shared/interfaces/youtube.interface";
import { FormContext } from "../../shared/interfaces/FormContext.interface";
import react from "react";
import { formContext } from "../../contexts/formContext";
import { toast } from "react-toastify";
import { youtubeService } from "../../service/index.service";
import { axiosError } from "../../handlers/error.handler";
interface Props {
  selector: YoutubeDlSelectorWithId;
  details: YoutubeVideoDetails;
}
export function YtSelectorItemComponent(props: Props) {
  const selector = props.selector;

  const mediaType = mediaTypeConstant[selector.mediaType];

  const q = selector.qualityLabel;
  const quality = mediaQualityContent[q] || selector.qualityLabel;

  const message = mediaType.label == "video" ? "ویدیو و صدا" : "فقط صدا";

  const formContextData: FormContext =
    react.useContext<FormContext>(formContext);

  const [progressValue, setProgressValue] = React.useState<number>(0);
  const [buttonIcon, setButtonIcon] = react.useState<any>("");

  useEffect(() => {
    if (!buttonIcon) setButtonIcon("download");
  }, [buttonIcon]);

  return (
    <div hidden={!mediaType.isSupported}>
      <div className="grid gap-x-6 gap-y-3 grid-cols-1 md:grid-cols-3 py-2">
        <div>
          <Tooltip message={message}>
            <Badge color={"ghost"} className={"py-4 mt-2"}>
              <FontAwesomeIcon
                icon={mediaType.icon}
                className={"text-green-600"}
              />
            </Badge>
          </Tooltip>
        </div>
        <div>
          <strong className="text-sm font-medium ">
            {quality} - {selector.container} - {selector.size}
          </strong>
        </div>
        <div className={""}>
          {progressValue == 0 ? (
            <Button
              color={"ghost"}
              className={"border-gray-700 shadow-2xl"}
              onClick={() =>
                DownloadHandle(
                  props.details,
                  selector,
                  formContextData,
                  setProgressValue,
                  setButtonIcon
                )
              }
              disabled={formContextData.loading}
            >
              <FontAwesomeIcon
                icon={["fas", buttonIcon]}
                className={buttonIcon == "cog" ? " fa-spin" : ""}
              />
            </Button>
          ) : (
            <RadialProgress
              value={progressValue}
              size="3rem"
              thickness="2px"
              color={"success"}
            >
              {progressValue}%
            </RadialProgress>
          )}
        </div>
      </div>
      <hr
        className={
          "my-4 mx-auto w-48 h-0.5 bg-gray-300 rounded border-0 md:my-10"
        }
      />
    </div>
  );
}

async function DownloadHandle(
  details: YoutubeVideoDetails,
  selector: YoutubeDlSelector,
  formContextData: FormContext,
  setProgressValue: any,
  setButtonIcon: any
) {
  if (formContextData.loading) return toast.error("تا پایان دانلود صبر کنید..");

  try {
    formContextData.setLoading(true);
    setButtonIcon("cog");
    await wait(1000);
    const videoId: string | undefined = details.details.id;
    if (!videoId) return toast.error("ایدی ناشناخته است");

    await youtubeService.downloadVideo(
      {
        videoId: videoId,
        items: selector,
      },
      setProgressValue
    );
  } catch (e: any) {
    axiosError(e, toast.error);
  } finally {
    setButtonIcon("");
    formContextData.setLoading(false);
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

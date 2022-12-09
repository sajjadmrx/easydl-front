import React, {useContext} from "react";
import {spotifyResultContext} from "../../contexts/spotifyResultContext";
import {formContext} from "../../contexts/formContext";
import {SpotifyResultContext, SpotifySearchItem,} from "../../shared/interfaces/spotify.interface";
import {FormContext} from "../../shared/interfaces/FormContext.interface";
import {Alert, Avatar, Button, RadialProgress,} from "react-daisyui";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    className?: string;
}

export function SpotifySongsComponent(props: Props): JSX.Element {
    const spotifyResultContextData: SpotifyResultContext =
        useContext(spotifyResultContext);
    const formContextData = useContext<FormContext>(formContext);
    return (
        <div>
            <div>
                <div className={"mt-2 mb-2"}>
                    <label className={"label-text"}>
                        <Alert status={"info"}>
                            نتیجه جستوجو زیر بر اساس جستوجو در یوتیوب با موضوع موزیک و ارتیست
                            ها
                        </Alert>
                    </label>
                </div>
                <div className={"relative border border-gray-700 rounded shadow-2xl"}>
                    <div className={"bg-gray-900 p-3"}>
                        <span className={"label-text text-gray-50"}>نتیجه جستوجو:</span>
                    </div>
                    <div className={"card items-center"}>
                        <div className={"overflow-x-auto card-body"} dir={"auto"}>
                            <div className={"grid h-[300px] w-[350px] "}>
                                {spotifyResultContextData.songs.map(
                                    (song: SpotifySearchItem, index: number) => {
                                        return (
                                            <div>
                                                <div className="grid gap-x-6 gap-y-3 grid-cols-1 md:grid-cols-1 py-2">
                                                    <div>
                                                        <Avatar
                                                            shape={"square"}
                                                            src={song.photo}
                                                            size={"sm"}
                                                            className={"avatar"}
                                                        />
                                                    </div>
                                                    <div>
                                                        <strong className="text-sm font-medium ">
                                                            {song.title}
                                                        </strong>
                                                    </div>
                                                    <div>
                            <span className="text-sm font-medium ">
                              {song.timestamp}
                            </span>
                                                    </div>
                                                    <div className={""}>
                                                        {song.name != "0" ? (
                                                            <Button
                                                                color={"ghost"}
                                                                className={"border-gray-700 shadow-2xl"}
                                                                disabled={formContextData.loading}
                                                            >
                                                                <FontAwesomeIcon icon={["fas", "download"]}/>
                                                            </Button>
                                                        ) : (
                                                            <RadialProgress
                                                                value={40}
                                                                size="3rem"
                                                                thickness="2px"
                                                                color={"success"}
                                                            >
                                                                40%
                                                            </RadialProgress>
                                                        )}
                                                    </div>
                                                </div>
                                                <hr
                                                    className={
                                                        "my-4 mx-auto w-48 h-0.5 bg-gray-600 rounded border-0 md:my-10 dark:bg-gray-700"
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//  function YoutubeSelectorComponent(props: Props) {
//     const { details, dlSelector } = props.details;
//     const selectors: YoutubeDlSelectorWithId[] = dlSelector.map(
//         (selector, index: number) => {
//             index++;
//             return {
//                 ...selector,
//                 id: String(index),
//             };
//         }
//     );
//     const formContextData: FormContext =
//         react.useContext<FormContext>(formContext);
//     return (
//         <div>
//             <div>
//                 <div className={"mt-2 mb-2"}>
//                     <label className={"label-text"}> {details.title}</label>
//                 </div>
//                 <div className={"relative border border-gray-700 rounded shadow-2xl"}>
//                     <div className={"bg-gray-900 p-3"}>
//             <span className={"label-text text-gray-50"}>
//               نوع و کیفیت مورد نظر خود را انتخاب کنید:
//             </span>
//                     </div>
//                     <div className={"card items-center"}>
//                         <div className={"overflow-x-auto card-body"} dir={"auto"}>
//                             <div className={"grid h-[300px] w-[350px] "}>
//                                 {selectors.map(
//                                     (selector: YoutubeDlSelectorWithId, index: number) => {
//                                         return (
//                                             <YtSelectorItemComponent
//                                                 selector={selector}
//                                                 details={props.details}
//                                                 key={"ikjoeigj:" + index}
//                                             />
//                                         );
//                                     }
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


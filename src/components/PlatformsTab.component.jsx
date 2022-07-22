import React,{useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Tabs,Tab} from "./tab.component";
import {SpotifyFormComponent} from "./spotify/spotify.form";
import {RadioJavanFormComponent} from "./radioJavan/radioJavan.form";
import {SoundCloudFormComponent} from "./soundCloud/soundCloud.form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



 export const PlatformsTab= ()=> {



    return (
        <Tabs>
            <Tab component={<SpotifyFormComponent/>} active>
                {/*<FontAwesomeIcon icon={["fab","spotify"]}  className={"mr-2"}/>*/}

                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/spotify.png"} className={'w-auto text-center'}/>
                    </div>
                </div>
                اسپاتیفای
            </Tab>
            <Tab component={<RadioJavanFormComponent/>} >
                {/*<FontAwesomeIcon icon={['fas','music']} className={"mr-2"}/>*/}

                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/rj.png"} className={'w-auto text-center'}/>
                    </div>
                </div>
                رادیوجوان

            </Tab>
            <Tab component={<SoundCloudFormComponent/>} >
                {/*<FontAwesomeIcon icon={['fab','soundcloud']} className={"mr-2"}/>*/}

                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/soundcloud.png"} className={'w-auto text-center'}/>
                    </div>
                </div>
                ساندکلود

            </Tab>

        </Tabs>
    )
}


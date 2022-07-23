import React,{useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Tabs,Tab} from "./tab.component";
import {SpotifyFormComponent} from "./spotify/spotify.form";
import {RadioJavanFormComponent} from "./radioJavan/radioJavan.form";
import {SoundCloudFormComponent} from "./soundCloud/soundCloud.form";



 export const PlatformsTab= ()=> {
    return (
        <Tabs>
            <Tab component={<SpotifyFormComponent/>} active>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/spotify.png"} className={'w-auto text-center'}/>
                    </div>
                </div>
                اسپاتیفای
            </Tab>
            <Tab component={<RadioJavanFormComponent/>} >
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/rj.png"} className={'w-auto text-center'}/>
                    </div>
                </div>
                رادیوجوان

            </Tab>
            <Tab component={<SoundCloudFormComponent/>} >
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


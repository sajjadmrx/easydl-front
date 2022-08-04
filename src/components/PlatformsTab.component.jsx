import React, {useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {Tabs, Tab} from "./tab.component";
import {SpotifyComponent} from "./spotify/spotify.component";
import {RadioJavanComponent} from "./radioJavan/radioJavan.component";
import {SoundCloudComponent} from "./soundCloud/soundCloud.component";


export const PlatformsTab = () => {
    return (
        <Tabs>
            <Tab component={<SpotifyComponent/>} active>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/spotify.png"} className={'w-auto text-center'} alt={"لوگو اسپاتیفای"}/>
                    </div>
                </div>
                اسپاتیفای
            </Tab>
            <Tab component={<SpotifyComponent/>} active>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/spotify.png"} className={'w-auto text-center'} alt={"لوگو اسپاتیفای"}/>
                    </div>
                </div>
                اسپاتیفای
            </Tab>
            <Tab component={<RadioJavanComponent/>}>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/rj.png"} className={'w-auto text-center'} alt={"لوگو رادیوجوان"}/>
                    </div>
                </div>
                رادیوجوان

            </Tab>
            <Tab component={<SoundCloudComponent/>}>
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={"/brands/soundcloud.png"} className={'w-auto text-center'} alt={"لوگو ساندکلود"}/>
                    </div>
                </div>
                ساندکلود

            </Tab>
    
        </Tabs>
    )
}


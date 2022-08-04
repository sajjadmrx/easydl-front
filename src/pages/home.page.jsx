import React from "react";
import {PlatformsTab, SearchForm} from "../components/PlatformsTab.component";
import react, {useEffect, useState, useContext} from 'react'

import {LoadingContext} from "react-router-loading";
import {DiscordModal} from "../components/modals/discord.modal";
import ms from 'ms'
import {infoStore} from "../store/info.store";
import {PageWrapper} from "../Wrappers/pages.wrapper";
import {FormContext} from "../contexts/form.context";
import {UpdatesModalComponent} from "../components/modals/updates.modal";
import AuthContext from "../contexts/auth.context";
import {SpotifySongsComponent} from "../components/spotify/spotify.songs";
import {SpotifyResultContext} from "../contexts/spotifyResult.context";
import {DarkAlertComponent, WarningAlertComponent} from "../components/alerts.component";
import CookieConsent, {Cookies} from "react-cookie-consent";


export function HomePage() {
    const loadingContext = useContext(LoadingContext);
    const authContext = useContext(AuthContext)
    const [showState, setShowState] = useState(false);
    const [inputValue, setinputValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [spotifySongs, setSpotifySongs] = useState([])
    useEffect(() => {
        document.title = infoStore.brandName.fa
        loadingContext.done()
    }, [])


    useEffect(() => {
        loadingContext.done()
        if (spotifySongs.length > 0)
            window.scrollTo(0, 650);
    }, [spotifySongs]);
    return (
        <PageWrapper>
            <div className=" lg:flex-row dark:bg-zinc-900/95">

                <main className=" rounded-3xl dark:bg-zinc-900/95">
                    <FormContext.Provider value={{inputValue, setinputValue, setLoading, loading}}>
                        <SpotifyResultContext.Provider value={{songs: spotifySongs, setSongs: setSpotifySongs}}>
                            <div className="hero min-h-screen">
                                <div
                                    className="px-0 sm:p-4 hero-content text-center border-[4px] border-gray-600 rounded-[18px] max-w-[350px] md:max-w-[450px] md:min-w-[720px] mt-10   shadow-lg mb-1 ">
                                    <div className="max-w-full sm:pt-[100px] sm:pb-[100px] sm:pr-[30px] sm:pl-[30px] p-1">
                                        <div className={'flex justify-center mb-5'}>

                                            <h1 className="text-5xl font-bold">ایزی دانلود</h1>
                                        </div>

                                        <p className="py-6">
                                            با ایزی دانلود به صورت رایگان با بهترین کیفیت دانلود کنیـد.
                                        </p>
                                        <PlatformsTab/>
                                        <CookieConsent
                                            location="bottom"
                                            buttonText="باشه"
                                            cookieName="supportArtist"
                                            style={{background: "#2B373B"}}
                                            buttonStyle={{color: "#4e503b", fontSize: "13px"}}
                                            expires={1}
                                        >
                                            لطفا جهت حمایت از ارتیست و یا پلتفرم یک بار موزیک/ویدیو رو در پلتفرم گوش
                                            کنید.

                                        </CookieConsent>
                                     
                                    </div>

                                    {showState &&
                                        <DiscordModal show={showState} setShow={setShowState} timeout={ms('3s')}/>}
                                </div>
                            </div>
                            <div className="mb-4 mt-2 md:mt-0" hidden={spotifySongs.length > 0 ? false : true}>
                                <div className="flex items-center  mb-4 dark:text-gray-300 pl-3 ">
                                    <svg className="icon dark:text-gray-200" xmlns="http://www.w3.org/2000/svg"
                                         width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                                    </svg>
                                    <h2 className="mx-2 text-2xl font-semibold dark:text-gray-300 ">
                                        نتیجه جستجو ({spotifySongs.length} مورد یافت شد.)
                                    </h2>
                                </div>
                                <SpotifySongsComponent/>
                            </div>
                        </SpotifyResultContext.Provider>
                    </FormContext.Provider>
                    <UpdatesModalComponent/>
                </main>


            </div>

        </PageWrapper>
    )
}
import React from "react";
import { SearchForm } from "../components/search-form.component";
import react, { useEffect, useState, useContext } from 'react'
import { SongsComponent } from "../components/songs.component";
import { SongsContext } from "../contexts/songs.context";
import { FooterComponent } from "../components/footer.component";
import { LoadingContext } from "react-router-loading";
import { DiscordModal } from "../components/modals/discord.modal";
import { CookieUtil } from "../utils/cookie.util";
import ms from 'ms'
import { infoStore } from "../store/info.store";
import { PageWrapper } from "../Wrappers/pages.wrapper";
import { PlatFormsComponent } from "../components/platforms.component";
import { InputSearchValueContext } from "../contexts/inputSearchValue.context";
import { UpdatesModalComponent } from "../components/modals/updates.modal";

export function HomePage() {
    const loadingContext = useContext(LoadingContext);
    const [songs, setSongs] = useState([]);
    const [showState, setShowState] = useState(false);
    const [inputSearchValue, setinputSearchValue] = useState('');
    useEffect(() => {
        document.title = infoStore.brandName.fa
        loadingContext.done()
        if (songs.length > 0)
            window.scrollTo(0, 350);
    }, [songs]);
    return (
        <PageWrapper>
            <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">

                <main className="p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
                    <InputSearchValueContext.Provider value={{ inputSearchValue, setinputSearchValue }}>

                        <div className="hero min-h-screen ">
                            <div className="hero-content text-center">
                                <div className="max-w-md">
                                    <h1 className="text-5xl font-bold">ایزی دانلود</h1>
                                    <p className="py-6">
                                        با ایزی دانلود به صورت رایگان با بهترین کیفیت دانلود کنیـد
                                    </p>
                                    <SearchForm setSongs={setSongs} />

                                    <PlatFormsComponent />
                                </div>
                                {showState && <DiscordModal show={showState} setShow={setShowState} timeout={ms('3s')} />}
                            </div>
                        </div>

                        <div className="mb-4" hidden={songs.length > 0 ? false : true}>
                            <div className="flex items-center text-gray-700 mb-4 dark:text-gray-300 ">
                                <svg className="icon dark:text-gray-200 text-gray-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                                <h2 className="mx-2 text-2xl font-semibold dark:text-gray-300 text-gray-200">
                                    نتیجه جستجو
                                </h2>
                            </div>
                            <SongsComponent songs={songs} />
                        </div>
                    </InputSearchValueContext.Provider>
                    <UpdatesModalComponent />
                </main>


            </div>

        </PageWrapper>
    )
}
import React from "react";
import { PlatformsTab, SearchForm } from "../components/PlatformsTab.component";
import react, { useEffect, useState, useContext } from 'react'

import { LoadingContext } from "react-router-loading";
import { DiscordModal } from "../components/modals/discord.modal";
import ms from 'ms'
import { infoStore } from "../store/info.store";
import { PageWrapper } from "../Wrappers/pages.wrapper";
import { FormContext } from "../contexts/form.context";
import { UpdatesModalComponent } from "../components/modals/updates.modal";
import AuthContext from "../contexts/auth.context";

export function HomePage() {
    const loadingContext = useContext(LoadingContext);
    const authContext = useContext(AuthContext)
    const [showState, setShowState] = useState(false);
    const [inputValue, setinputValue] = useState('');
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        document.title = infoStore.brandName.fa
        loadingContext.done()
    }, [])

    useEffect(() => {

    })

    return (
        <PageWrapper>
            <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">

                <main className="p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
                    <FormContext.Provider value={{ inputValue, setinputValue, setLoading, loading }}>

                        <div className="hero min-h-screen ">
                            <div className="hero-content text-center">
                                <div className="max-w-md">
                                    <h1 className="text-5xl font-bold">ایزی دانلود</h1>
                                    <p className="py-6">
                                        با ایزی دانلود به صورت رایگان با بهترین کیفیت دانلود کنیـد
                                    </p>
                                    <PlatformsTab />

                                </div>
                                {showState && <DiscordModal show={showState} setShow={setShowState} timeout={ms('3s')} />}
                            </div>
                        </div>
                    </FormContext.Provider>
                    <UpdatesModalComponent />
                </main>


            </div>

        </PageWrapper>
    )
}
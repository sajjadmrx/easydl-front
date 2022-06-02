import React from "react";
import { SearchForm } from "../components/search-form.component";
import react, { useEffect, useState, useContext } from 'react'
import { SongsComponent } from "../components/songs.component";
import { SongsContext } from "../contexts/songs.context";
import { FooterComponent } from "../components/footer.component";
import { LoadingContext } from "react-router-loading";
export function HomePage() {
    const loadingContext = useContext(LoadingContext);
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        // scrol to bottom
        document.title = 'ایزی دانلود'
        loadingContext.done()
        if (songs.length > 0)
            window.scrollTo(0, 350);
    }, [songs]);
    return (
        <div>
            <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
                <main className=" p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">


                    <div className="hero min-h-screen ">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">ایزی دانلود</h1>
                                <p className="py-6">
                                    با ایزی دانلود به صورت رایگان با بهترین کیفیت دانلود کنیـد 🚀
                                </p>

                                <SearchForm setSongs={setSongs} />
                                <div className="mt-3 animate__animated  animate__rotateInDownLeft shadow-xl ">
                                    <div className="bg-gray-700 text-base-content rounded-box">
                                        <h2 className="text-lg text-center py-3 text-gray-200">
                                            پلتفرم های پشتیبانی شده
                                        </h2>
                                        <div className="grid grid-cols-3 gap-4 mb-4 py-4">
                                            <div className="grid h-25 card rounded-box place-items-center mb-2">
                                                <div className="avatar online">
                                                    <div className="w-16 rounded-xl ">
                                                        <img src="/brands/spotify.png" alt="sound" />

                                                    </div>
                                                </div>
                                                <p className="text-center text-base-content text-gray-200">
                                                    اسپاتیفای
                                                </p>
                                            </div>
                                            <div className="grid h-25 card rounded-box place-items-center mb-2">
                                                <div className="avatar online">
                                                    <div className="w-16 rounded-xl">
                                                        <img src="/brands/rj.png" alt="Rj" />
                                                    </div>
                                                </div>
                                                <p className="text-center text-base-content text-gray-200">
                                                    رادیوجوان
                                                </p>
                                            </div>
                                            <div className="grid h-25 card rounded-box place-items-center mb-2">
                                                <div className="avatar online">
                                                    <div className="w-16 rounded-xl">
                                                        <img src="/brands/soundcloud.png" alt="sound-cloud" />
                                                    </div>
                                                </div>
                                                <p className="text-center text-base-content text-gray-200">
                                                    سوند کلاود
                                                </p>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </div>
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

                </main>
            </div>

            <FooterComponent />
        </div>
    )
}
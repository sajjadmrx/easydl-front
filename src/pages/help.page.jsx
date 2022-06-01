import React from "react";
import { useEffect, useState, useContext } from 'react'
import { FooterComponent } from "../components/footer.component";
import { LoadingContext } from "react-router-loading";
import { VideoPlayerComponent } from "../components/videoPlayer.component";
export function HelpPage() {
    const loadingContext = useContext(LoadingContext);

    useEffect(() => {
        document.title = "ایزی دانلود - راهنما";
        loadingContext.done();
    }, [])
    return (
        <div>
            <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
                <main className=" p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
                    <div className="hero min-h-screen ">
                        <div className="max-w-screen-md">
                            <h1 className="text-5xl font-bold">📺 آموزش استفاده از ایزی دانلود</h1>


                            <div className="grid grid-cols-1 gap-4 mb-4 py-4 md:grid-cols-2 ml-2 mr-2 mt-3">

                                <div tabindex="0" class="grid collapse collapse-open border border-base-300 bg-base-100 rounded-box">
                                    <div class="collapse-title text-xl font-medium">
                                        🎧   دانلود از اسپاتیفای
                                    </div>
                                    <div class="collapse-content">
                                        <VideoPlayerComponent url="/amozesh/spotify.mp4" />
                                    </div>
                                </div>

                                <div tabindex="0" class="grid collapse collapse-open border border-base-300 bg-base-100 rounded-box">
                                    <div class="collapse-title text-xl font-medium">

                                        📥 نحوه نصب اپلیکیشن ایزی دانلود برای دسترسی راحتر
                                    </div>
                                    <div class="collapse-content">

                                        <VideoPlayerComponent url="/amozesh/install.mp4" />
                                    </div>
                                </div>


                            </div>

                        </div>
                    </div>
                </main>
            </div>

            <FooterComponent />
        </div>
    )
}
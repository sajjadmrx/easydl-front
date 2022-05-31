import React from "react";
import { useEffect, useState, useContext } from 'react'
import { FooterComponent } from "../components/footer.component";
import { LoadingContext } from "react-router-loading";

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
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">
                                    آموزش ها
                                </h1>
                                <p className="py-6">
                                    به زودی
                                </p>


                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <FooterComponent />
        </div>
    )
}
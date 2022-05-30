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
            <div className="bg-dark max-w-7xl mx-auto py-5">
                <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
                    <main className=" p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
                        <div className="hero min-h-screen"  >
                            <div className="hero-overlay bg-opacity-60"></div>
                            <div className="hero-content text-center text-neutral-content">
                                <h1 className="text-5xl font-bold">راهنما</h1>
                            </div>

                        </div>
                    </main>
                </div>

            </div>
            <FooterComponent />
        </div>
    )
}
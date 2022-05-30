import React from "react";
import { FooterComponent } from "../components/footer.component";
import react, { useEffect, useState, useContext } from 'react'
import { LoadingContext } from "react-router-loading";

export function AboutPage() {
    const loadingContext = useContext(LoadingContext);
    useEffect(() => {
        document.title = "ایزی دانلود - درباره ما";
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
                                <h1 className="text-5xl font-bold">درباره ما</h1>
                                <p className="py-6">
                                    ایزی دانلود  به شما این امکان را می دهد تا به سرعت به دانلود آهنگ های خود دسترسی داشته باشید. 🔥⚡
                                </p>
                            </div>

                        </div>
                    </main>
                </div>

            </div>
            <FooterComponent />
        </div>
    )
}
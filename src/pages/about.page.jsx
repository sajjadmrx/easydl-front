import React from "react";
import { FooterComponent } from "../components/footer.component";
import react, { useEffect, useState, useContext } from 'react'
import { LoadingContext } from "react-router-loading";
import { UserGithubCardComponent } from "../components/userGithubCard.component";

export function AboutPage() {
    const loadingContext = useContext(LoadingContext);
    useEffect(() => {
        document.title = "ایزی دانلود - درباره ما";
        loadingContext.done();
    }, [])
    return (
        <div>
            <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
                <main className=" p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">

                    <div className="hero min-h-screen ">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">درباره ما</h1>
                                <p className="py-6">
                                    ایزی دانلود به شما این امکان را می دهد تا به سرعت به دانلود آهنگ های خود دسترسی داشته باشید. 🔥⚡


                                </p>

                                <div className="mt-0">

                                    <UserGithubCardComponent user="sajjadmrx"></UserGithubCardComponent>

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
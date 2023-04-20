import React from "react";
import react, { useEffect, useState, useContext } from "react";
import { LoadingContext } from "react-router-loading";
import { UserGithubCardComponent } from "../components/userGithubCard.component";
import { infoStore } from "../store/info.store";
import { PageWrapper } from "../Wrappers/pages.wrapper";
export function AboutPage() {
  const loadingContext = useContext(LoadingContext);
  const users = [
    {
      username: "sajjadmrx",
      role: "Development",
    },
  ];
  useEffect(() => {
    document.title = `${infoStore.brandName.fa} - درباره`;
    loadingContext.done();
  }, []);
  return (
    <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
      <main className=" p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
        <div className="hero min-h-screen ">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">درباره ما</h1>
              <p className="py-6">
                ایزی دانلود به شما این امکان را می دهد تا به سرعت به دانلود آهنگ
                های خود دسترسی داشته باشید. 🔥⚡
              </p>

              <div className="mt-0">
                <h2 className="text-2xl font-bold mt-1 mb-3">👨‍💻 تیم ما</h2>
                <hr className="border-b-2 border-gray-800 mb-2" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
                  {users.map((user, index) => {
                    return <UserGithubCardComponent key={index} user={user} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

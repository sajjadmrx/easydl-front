import React from "react";
import { PlatformsTab } from "../components/PlatformsTab.component";
import { useEffect, useState, useContext } from "react";

import { LoadingContext } from "react-router-loading";

import { infoStore } from "../store/info.store";
import { PageWrapper } from "../Wrappers/pages.wrapper";
import { formContext } from "../contexts/formContext";
import { UpdatesModalComponent } from "../components/modals/updates.modal";
import { spotifyResultContext } from "../contexts/spotifyResultContext";

import CookieConsent from "react-cookie-consent";

export function HomePage() {
  const loadingContext = useContext(LoadingContext);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [spotifySongs, setSpotifySongs] = useState([]);
  useEffect(() => {
    document.title = infoStore.brandName.fa;
    loadingContext.done();
  }, []);

  useEffect(() => {
    loadingContext.done();
    if (spotifySongs.length > 0) window.scrollTo(0, 650);
  }, [spotifySongs]);
  return (
    <PageWrapper>
      <div className=" lg:flex-row dark:bg-zinc-900/95">
        <main className=" rounded-3xl dark:bg-zinc-900/95">
          <formContext.Provider
            value={{
              inputValue,
              setInputValue: setInputValue,
              setLoading,
              loading,
            }}
          >
            <spotifyResultContext.Provider
              value={{ songs: spotifySongs, setSongs: setSpotifySongs }}
            >
              <div className="hero min-h-screen ">
                <div className="px-0 sm:p-4 hero-content text-center border-[#5d7e9721] rounded-[18px] max-w-[350px] md:max-w-[450px] md:min-w-[720px]  border-[4px]  shadow-lg mb-1 ">
                  <div className="max-w-full sm:pt-[100px] sm:pb-[100px] sm:pr-[30px] sm:pl-[30px] p-1">
                    <div className={"flex justify-center mb-5"}>
                      <h1 className="text-5xl font-bold">ایــزی دانلود</h1>
                    </div>

                    <p className="py-6">
                      با ایزی دانلود به صورت رایگان با بهترین کیفیت دانلود
                      کنیـد.
                    </p>

                    <PlatformsTab />
                    <CookieConsent
                      location="bottom"
                      buttonText="باشه"
                      cookieName="supportArtist"
                      style={{ background: "#2B373B" }}
                      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                      expires={1}
                    >
                      لطفا جهت حمایت از ارتیست و یا پلتفرم یک بار موزیک/ویدیو رو
                      در پلتفرم موردنظر پلی کنید.
                    </CookieConsent>
                  </div>
                </div>
              </div>
            </spotifyResultContext.Provider>
          </formContext.Provider>
          <UpdatesModalComponent />
        </main>
      </div>
    </PageWrapper>
  );
}

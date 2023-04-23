import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PageWrapper } from "../Wrappers/pages.wrapper";

import { TbUnlink } from "react-icons/tb";
import { CgLink } from "react-icons/cg";
import { connectionsService, paymentService } from "../service/index.service";
import { GoGear } from "react-icons/go";
import { infoStore } from "../store/info.store";
import { LoadingContext } from "react-router-loading";
import { Button } from "react-daisyui";

export function SpotifyCallbackPage() {
  const loadingContext = useContext(LoadingContext);

  const [processing, setProcessing] = useState<boolean>(false);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const code: string | null = searchParams.get("code");
  const state = searchParams.get("state");

  const [success, setSuccess] = useState<boolean>(false);

  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    document.title = `${infoStore.brandName.fa} - در حال تایید...`;
    loadingContext.done();
  }, []);

  useEffect(() => {
    if (!processing) {
      async function sendVerifyReq() {
        try {
          if (!code || !state) return (window.location.href = "/");
          const data = await connectionsService.handleCallback(code, state);
          setSuccess(true);
          console.log(data);
        } catch (e: any) {
          if (e.response) {
            const data = e.response.data;
            if (data.data && data.data.code) {
              setErrorText(`خطا در اتصال اکانت به اسپاتیفای`);
            }
          }
          setSuccess(false);
        } finally {
          setProcessing(true);
        }
      }
      sendVerifyReq();
    }
  }, []);
  if (!processing) return <ProcessingComponent />;

  return (
    <div className="shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
      <main className="p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
        <div className="hero min-h-screen">
          <div className="max-w-screen-md">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div
                    className={`flex items-center justify-center h-20 ${
                      success ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {success ? (
                      <CgLink size={40} color={"#ffff"} />
                    ) : (
                      <TbUnlink size={40} color={"#ffff"} />
                    )}
                  </div>
                  <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4 text-gray-600">
                      {success
                        ? "اتصال شما موفقیت آمیز بود"
                        : "خطا در اتصال اکانت!"}
                    </h1>
                    <p className="text-gray-700 mb-2 ">
                      {success
                        ? "اکانت اسپاتیفای شما با موفقیـت به ایزی دانلود لینک شد."
                        : errorText ||
                          "خطا در اتصال اکانت! لطفا مجدد امتحان کنید."}
                    </p>
                  </div>
                  <div className={"grid place-items-center pb-4"}>
                    <Link to={"/"}>👈 صفحه اصلی</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProcessingComponent() {
  return (
    <div className="shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
      <main className="p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
        <div className="hero min-h-screen">
          <div className="max-w-screen-md">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-md text-center">
                <div className="flex justify-center items-center mb-4">
                  <GoGear className="animate-spin mr-2" />
                  <h1 className="text-lg font-bold">در حال پردازش...</h1>
                </div>
                <p className="text-gray-500">
                  در حال اعتبار سنجی اطلاعات دریافتی
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

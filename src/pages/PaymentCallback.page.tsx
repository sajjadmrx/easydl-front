import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageWrapper } from "../Wrappers/pages.wrapper";
import { BsFillBagCheckFill, BsFillBagXFill } from "react-icons/bs";
import { paymentService } from "../service/index.service";
import { FaSpinner } from "react-icons/fa";
import { infoStore } from "../store/info.store";
import { LoadingContext } from "react-router-loading";

export function PaymentCallbackPage() {
  const loadingContext = useContext(LoadingContext);

  const [processing, setProcessing] = useState<boolean>(false);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const authority = searchParams.get("Authority");

  const [success, setSuccess] = useState<boolean>(false);

  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    document.title = `${infoStore.brandName.fa} - نتیجه پرداخت`;
    loadingContext.done();
  }, []);

  useEffect(() => {
    if (!processing) {
      async function sendVerifyReq() {
        try {
          const data = await paymentService.verify(authority as string);
          setSuccess(true);
        } catch (e: any) {
          if (e.response) {
            const data = e.response.data;
            if (data.data && data.data.code) {
              setErrorText(
                `متاسفیم! پرداخت شما ناموفق بود یا توسط خودتان لغو شد. لطفا مجدداً تلاش کنید و اگر مشکل ادامه دارد با پشتیبانی تماس بگیرید.`
              );
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
    <PageWrapper>
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
                        <BsFillBagCheckFill size={40} color={"#ffff"} />
                      ) : (
                        <BsFillBagXFill size={40} color={"#ffff"} />
                      )}
                    </div>
                    <div className="p-4">
                      <h1 className="text-2xl font-bold mb-4 text-gray-600">
                        {success
                          ? "پرداخت با موفقیت انجام شد!"
                          : "خطا در پرداخت!"}
                      </h1>
                      <p className="text-gray-700 mb-2 ">
                        {success
                          ? "با تشکر از پرداخت شما, اشتراک شما فعال شد."
                          : errorText ||
                            "پرداخت شما با مشکل مواجه شده است. لطفا دوباره امتحان کنید."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}

function ProcessingComponent() {
  return (
    <PageWrapper>
      <div className="shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
        <main className="p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
          <div className="hero min-h-screen">
            <div className="max-w-screen-md">
              <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md text-center">
                  <div className="flex justify-center items-center mb-4">
                    <FaSpinner className="animate-spin mr-2" />
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
    </PageWrapper>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { LoadingContext } from "react-router-loading";
import { infoStore } from "../store/info.store";
import { PageWrapper } from "../Wrappers/pages.wrapper";
import { FaShoppingBasket } from "react-icons/fa";
import { paymentService } from "../service/index.service";
import { axiosError } from "../handlers/error.handler";
import { toast } from "react-toastify";
import { Plans } from "../shared/interfaces/plans.interface";
import { Button } from "react-daisyui";
import { wait } from "@testing-library/user-event/dist/utils";
import { BiCloudDownload } from "react-icons/bi";

export function SubscriptionPage() {
  const loadingContext = useContext(LoadingContext);

  useEffect(() => {
    document.title = `${infoStore.brandName.fa} - خرید اشتراک `;
    loadingContext.done();
  }, []);
  const [service, setService] = useState<Plans | null>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchServices() {
      const services = await paymentService.getPlans();
      setService(services.data[0]);
    }
    fetchServices();
  }, []);

  async function buyHandler(serviceId: number) {
    try {
      setLoading(true);
      const response = await paymentService.buy(serviceId);
      if (response.statusCode == 201) {
        toast.success("در حال انتقال به درگاه...");
        await wait(1000);
        window.location.href = response.data;
      } else throw new Error(response.data);
    } catch (e) {
      axiosError(e, toast.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
      <main className=" p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">
        <div className="hero min-h-screen ">
          <div className="max-w-screen-md">
            <div className="text-center shopping-basket-container gap-3">
              <FaShoppingBasket />
              <h1 className={"text-5xl font-bold"}> خرید اشتراک</h1>
            </div>
            {service ? (
              <div className="grid grid-cols-1 md:grid-cols-2  py-4 mt-6 gap-8">
                <div className="border-2 border-blue-400 p-4 rounded-md flex flex-col space-y-2 bg-gray-900 shadow-md">
                  <h2 className="text-lg font-bold text-gray-100">
                    پلن رایگان
                  </h2>
                  <p className="text-gray-100">
                    <span className="text-green-500">&#10003;</span> امکان
                    دانلود موزیک و ویدیو از پلتفرم ها
                  </p>
                  <p className="text-gray-100">
                    <span className="text-red-500">&#10005;</span> بدون محدودیت
                    زمانی
                  </p>
                  <p className="text-gray-100">
                    <span className="text-red-500">&#10005;</span> دانلود محتوای
                    جدید
                  </p>
                </div>
                <div className="border-2 border-green-400 p-4 rounded-md flex flex-col space-y-2 bg-gray-900 shadow-md">
                  <h2 className="text-lg font-bold text-gray-100">
                    پلن 1 ماهه
                  </h2>
                  <p className="text-gray-100">
                    <span className="text-green-500">&#10003;</span> امکان
                    دانلود موزیک و ویدیو از پلتفرم ها
                  </p>
                  <p className="text-gray-100">
                    <span className="text-green-500">&#10003;</span> بدون
                    محدودیت زمانی
                  </p>
                  <p className="text-gray-100">
                    <span className="text-green-500">&#10003;</span> دانلود
                    محتوای جدید
                  </p>

                  <div className="price text-gray-400 rounded-md mt-4 text-center">
                    <span className="price-label"> قیمت: </span>
                    <span className="price-value">
                      {(service.price / 10000).toLocaleString("fa")}
                      <span className="currency-symbol"> هزار تومان</span>
                    </span>
                  </div>
                  <Button
                    className={`bg-green-500 text-white px-4 py-2 rounded-md mt-4 ${
                      loading ? "loading" : ""
                    }`}
                    onClick={() => buyHandler(1)}
                  >
                    خرید اشتراک
                  </Button>
                </div>
              </div>
            ) : (
              <LoadingSpinner />
            )}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-2">توضیحات و نکات</h2>
              <ul className="list-disc list-inside text-lg">
                <li>
                  محدودیت زمانی برای کاربرانی که اشتراک ندارن به این صورت هستش:
                  3 دانلود در یک ساعت
                </li>
                <li className="my-2">
                  با خرید اشتراک، امکان دانلود بدون محدودیت زمانی و دسترسی به
                  جدیدترین محتواهارو خواهید داشت.
                </li>
                <li className="my-2">
                  امکان دانلود فقط برای استفاده شخصی است و استفاده تجاری ممنوع
                  می‌باشد.
                </li>
                <li className="my-2">
                  از اطلاعات(ایمیل) شما صرفاً به منظور ارائه خدمات استفاده خواهد
                  شد و به هیچ وجه با شخص یا سازمان دیگری به اشتراک گذاشته نخواهد
                  شد.
                </li>
                <li className="my-2">
                  اشتراک شما قابل تمدید است و به‌صورت خودکار بعد از پایان مدت
                  اعتبار، تمدید خواهد شد.
                </li>
                <li className="my-2">
                  در صورت بروز هر گونه مشکل فنی، پشتیبانی 24/7 در دسترس شما
                  خواهد بود.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-24">
      <BiCloudDownload size={40} className="animate-ping  text-gray-500" />
    </div>
  );
};

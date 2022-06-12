import React from "react";
import { FooterComponent } from "../components/footer.component";
import { useEffect, useState, useContext } from 'react'
import { LoadingContext } from "react-router-loading";
import { infoStore } from "../store/info.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import ms from 'ms'
import { ApiService } from "../service/api.service";
import { removeScript } from "../utils/regex.util";
import { PageWrapper } from "../Wrappers/pages.wrapper";

const apiService = new ApiService()

export function ReportPage() {
    const loadingContext = useContext(LoadingContext);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        document.title = `${infoStore.brandName.fa} - گزارش خطا`;
        loadingContext.done();
    }, [])
    return (
        <PageWrapper>
            <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
                <main className=" p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95">

                    <div className="hero min-h-screen ">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-5xl font-bold">
                                    🪰 گزارش خطا
                                </h1>
                                <p className="py-6">
                                    لطفا گزارش خود رو به صورت کامل شرح دهید.
                                </p>

                                <div className="mt-0">

                                    <hr className="border-b-2 border-gray-800 mb-2" />
                                    <form onSubmit={(e) => {
                                        submitHandler(e, isLoading, setIsLoading)
                                    }}>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
                                            <div className="flex flex-col">
                                                <label className=" text-sm font-bold mb-2">
                                                    نام شما
                                                </label>
                                                <input type="text" placeholder="اختیاری" name="name" className="input input-bordered  w-full max-w-xs" />

                                            </div>
                                            <div className="flex flex-col">
                                                <label className=" text-sm font-bold mb-2">
                                                    متن گزارش خطا
                                                </label>
                                                <textarea className="textarea textarea-bordered" name="desc" placeholder="متن گزارش خطا را بنویسید..." rows="5"></textarea>
                                            </div>

                                        </div>
                                        <div className="flex justify-center mt-6">
                                            {isLoading ? <button className="btn btn-outline btn-success loading">
                                                <span className="ml-2">
                                                    در حال ارسال
                                                </span>
                                            </button> : <button className="btn btn-outline btn-success" type="submit">
                                                <FontAwesomeIcon icon={['fas', 'paper-plane']} />
                                                <span className="ml-2">
                                                    ارسال
                                                </span>
                                            </button>}
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </PageWrapper>
    )
}

async function submitHandler(e, isLoading, setIsLoading) {
    e.preventDefault();
    if (isLoading) toast.warn("در حال ارسال...");
    const form = e.target;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    }
    )
    data.desc = removeScript(data.desc);

    if (!data.desc)
        return;

    setIsLoading(true)
    try {
        const result = await apiService.post('report', data)
        console.log(result)
        toast.success("گزارش شما با موفقیت ارسال شد.",
            { rtl: true });
        form.reset();
    } catch (error) {
        console.log(error)
    }
    finally {
        setIsLoading(false)
    }
}
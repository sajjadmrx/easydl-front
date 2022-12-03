import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/fontawesome-free-brands";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { LoadingContext } from "react-router-loading";
import { authContext } from "../contexts/authContext";
import { infoStore } from "../store/info.store";
import { PageWrapper } from "../Wrappers/pages.wrapper";
import { CookieUtil } from "../utils/cookie.util";
import React from "react";
export function ProfilePage() {
  const loadingContext = useContext(LoadingContext);
  const [downloads, setDownloads] = useState([]);
  useEffect(() => {
    document.title = `${infoStore.brandName.fa} - پروفایل`;
    loadingContext.done();
  }, []);
  const authContextData = useContext(authContext);
  if (
    !authContextData.isAuthenticated ||
    !CookieUtil.has("token") ||
    !authContextData.user.username
  ) {
    return <Redirect to="/" />;
  }

  return (
    <PageWrapper>
      <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
        <main className="p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95 min-h-screen">
          <div className="hero  ">
            <div className="hero-content text-center">
              <div className="flex items-center justify-center">
                <div className="items-center">
                  <div className="stats stats-vertical lg:stats-horizontal  shadow-lg">
                    <div className="stat">
                      <div className="stat-title">پروفایل</div>

                      <div className="stat-title">
                        {authContextData.user.username}
                      </div>
                      <div className="stat-desc ">
                        {authContextData.user.email}
                      </div>

                      <div className="stat-figure ">
                        <div className="avatar online">
                          <div className="w-14 rounded-full">
                            <img
                              src={authContextData.user.avatar}
                              alt={authContextData.user.username + " avatar"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="stat">
                      <div className="stat-figure ">
                        <FontAwesomeIcon
                          icon={["fas", "star"]}
                          size={"2x"}
                        ></FontAwesomeIcon>
                      </div>
                      <div className="stat-title">وضعیت اشتراک</div>
                      <div className="stat-value ">ندارید</div>
                    </div>
                    <div className="stat">
                      <div className="stat-figure ">
                        {/*  <FontAwesomeIcon*/}
                        {/*//    icon={faSpotify}*/}
                        {/*    size={"2x"}*/}
                        {/*  ></FontAwesomeIcon>*/}
                      </div>
                      <div className="stat-title">وضعیت اکانت اسپاتیفای</div>
                      <div className="stat-desc ">
                        <span className="bg-red-400 text-gray-50 rounded-md px-5 h-5">
                          غیرفعـال
                        </span>
                      </div>
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

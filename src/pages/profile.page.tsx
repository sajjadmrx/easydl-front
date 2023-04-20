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
import { AuthContext } from "../shared/interfaces/authContext.interface";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { User } from "../shared/interfaces/user.interface";
import moment from "moment-jalaali";
import { TbVip, TbVipOff } from "react-icons/tb";
export function ProfilePage() {
  moment.loadPersian({ usePersianDigits: true });
  const loadingContext = useContext(LoadingContext);
  useEffect(() => {
    document.title = `${infoStore.brandName.fa} - پروفایل`;
    loadingContext.done();
  }, []);
  const authContextData: AuthContext = useContext(authContext);
  if (
    !authContextData.isAuthenticated ||
    !CookieUtil.has("token") ||
    !authContextData.user
  ) {
    return <Redirect to="/" />;
  }

  const user: User = authContextData.user;
  const time = moment(user.subscription);
  let expiredFa = time.locale("fa").fromNow().replace("در", "");
  const isSub = isSubUser(user);
  const subtext: string = isSub
    ? `  ${time.format("YYYY-MM-DD")} | ${expiredFa} دیگر `
    : `اشتراک ندارید`;

  return (
    <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
      <main className="p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95 min-h-screen">
        <div className="hero  ">
          <div className="hero-content text-center">
            <div className="flex items-center justify-center">
              <div className="items-center">
                <div className="stats stats-vertical lg:stats-horizontal  shadow-lg">
                  <div className="stat">
                    <div className="stat-title">پروفایل</div>

                    <div className="stat-title">{user.username}</div>
                    <div className="stat-desc ">{user.email}</div>

                    <div className="stat-figure ">
                      <div className="avatar online">
                        <div className="w-14 rounded-full">
                          <img
                            src={user.avatar}
                            alt={user.username + " avatar"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure ">
                      {isSub ? (
                        <TbVip size={35} className="text-green-400" />
                      ) : (
                        <TbVipOff size={35} />
                      )}
                    </div>
                    <div className="stat-title">وضعیت اشتراک</div>
                    <div className="stat-value ">
                      <p className={"text-xs"}>{subtext}</p>
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-figure ">
                      <FontAwesomeIcon
                        icon={faSpotify as IconProp}
                        size={"2x"}
                      ></FontAwesomeIcon>
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
  );
}

function isSubUser(user: User): boolean {
  return moment(user.subscription).isAfter(moment());
}

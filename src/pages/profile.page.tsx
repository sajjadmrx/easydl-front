import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { LoadingContext } from "react-router-loading";
import { authContext } from "../contexts/authContext";
import { infoStore } from "../store/info.store";
import { CookieUtil } from "../utils/cookie.util";
import React from "react";
import { AuthContext } from "../shared/interfaces/authContext.interface";
import { User } from "../shared/interfaces/user.interface";

import { SpotifyConnectionStat } from "../components/profile/stats/connections/spotify.stat";
import { spotifyConnectionContext } from "../contexts/spotify-con.context";
import { ConnectionsComponent } from "../components/profile/connections";
import { SubscriptionStat } from "../components/profile/stats/connections/subscription.stat";
import { TbApps } from "react-icons/tb";
import { BsSpotify } from "react-icons/bs";
export function ProfilePage() {
  const loadingContext = useContext(LoadingContext);

  const [isConnect, setIsConnect] = useState<boolean>(false);
  const [info, setInfo] = useState<any>();

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

  return (
    <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
      <main className="p-6 lg:py-8 lg:px-10 rounded-3xl dark:bg-zinc-900/95 min-h-screen">
        <spotifyConnectionContext.Provider
          value={{ isConnect, setIsConnect, info, setInfo }}
        >
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
                    <SubscriptionStat sub={user.subscription} />
                    <SpotifyConnectionStat />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="py-8">
            <ConnectionsComponent />
          </section>
        </spotifyConnectionContext.Provider>
      </main>
    </div>
  );
}

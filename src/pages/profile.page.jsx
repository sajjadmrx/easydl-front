import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/fontawesome-free-brands";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { LoadingContext } from "react-router-loading";
import AuthContext from "../contexts/auth.context";
import { infoStore } from "../store/info.store";
import { PageWrapper } from "../Wrappers/pages.wrapper";
import { Table, Avatar, Badge } from "react-daisyui";
import moment from "moment";
import { userService } from "../service/index.service";
import { HistoryTable } from "../components/profile/history-table.component";
import { CookieUtil } from "../utils/cookie.util";
export function ProfilePage() {
  const loadingContext = useContext(LoadingContext);
  const [downloads, setDownloads] = useState([]);
  useEffect(() => {
    document.title = `${infoStore.brandName.fa} - پروفایل`;
    loadingContext.done();
  }, []);

  useEffect(() => {
    async function getDownloads() {
      const downloads = await userService.getDownloads();
      setDownloads(downloads);
    }
    getDownloads();
  }, []);
  const authContext = useContext(AuthContext);
  if (!authContext.isAuthenticated || !CookieUtil.has("token")) {
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
                        {authContext.user.username}
                      </div>
                      <div className="stat-desc ">{authContext.user.email}</div>

                      <div className="stat-figure ">
                        <div className="avatar online">
                          <div className="w-14 rounded-full">
                            <img src={authContext.user.avatar} />
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
                        <FontAwesomeIcon
                          icon={["fas", "download"]}
                          size={"2x"}
                        ></FontAwesomeIcon>
                      </div>
                      <div className="stat-title">تعداد دانلود</div>
                      <div className="stat-value ">{downloads.length}</div>
                    </div>
                    <div className="stat">
                      <div className="stat-figure ">
                        <FontAwesomeIcon
                          icon={faSpotify}
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
          <div className="mt-5 max-w-7xl m-auto text-center">
            <h3 className="text-2xl font-bold mb-2 mt-2"> دانلودها</h3>
            <hr className="border-gray-700" />
            <div className="mt-3 w-full mb-8 overflow-x-auto rounded-lg shadow-lg">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                  <HistoryTable downloads={downloads} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}

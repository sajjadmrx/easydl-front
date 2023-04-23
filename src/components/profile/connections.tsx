import React, { useContext, useState } from "react";
import { BsSpotify } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
import { connectionsService } from "../../service/index.service";
import { axiosError } from "../../handlers/error.handler";
import { toast } from "react-toastify";
import { Button, Tooltip } from "react-daisyui";
import { spotifyConnectionContext } from "../../contexts/spotify-con.context";
import { SpotifyConnectionContext } from "../../shared/interfaces/spotify.interface";

export function ConnectionsComponent() {
  const [loading, setLoading] = useState<boolean>(false);
  const spotifyConnectionContextData = useContext<SpotifyConnectionContext>(
    spotifyConnectionContext
  );
  async function connectHandle() {
    setLoading(true);
    try {
      window.location.href = await connectionsService.getAuth();
    } catch (e) {
      axiosError(e, toast.error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words shadow-lg w-full mb-6 shadow-lg rounded-lg">
            <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl font-semibold flex gap-2">
                <TbApps className={"mt-1"} />
                برنامه ها
              </h4>
              <p className="leading-relaxed mt-1 mb-4">
                برای اتصال به پلفترم های مختلف،روی ایکون موردنظر کلیک کنید.
              </p>
              <div className="flex justify-center mt-6">
                <Tooltip message={"اسپاتیفای"}>
                  {spotifyConnectionContextData.isConnect ? (
                    <Button
                      className="bg-gray-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      disabled={true}
                    >
                      <BsSpotify size={25} />
                    </Button>
                  ) : (
                    <Button
                      className="bg-gray-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      disabled={loading}
                      onClick={connectHandle}
                    >
                      <BsSpotify size={25} />
                    </Button>
                  )}
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

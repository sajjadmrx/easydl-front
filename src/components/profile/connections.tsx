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
    try {
      setLoading(true);
      window.location.href = await connectionsService.getAuth();
    } catch (e) {
      axiosError(e, toast.error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container mx-auto px-4">
      <div className="container mx-auto px-4">
        <div className="shadow-lg rounded-lg shadow-lg px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold flex gap-2">
              <TbApps className={"mt-1"} />
              برنامه ها
            </h2>
          </div>
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <BsSpotify size={40} />
              <div className="">اتصال به اسپاتیفای</div>
            </div>
            {spotifyConnectionContextData.isConnect ? (
              <Button disabled={true}>متصل است</Button>
            ) : (
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
                onClick={connectHandle}
              >
                اتصال
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

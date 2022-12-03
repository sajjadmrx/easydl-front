import axios from "axios";
import { axiosError } from "../handlers/error.handler";
import { hostStore } from "../store/host.store";
import myAxios from "../utils/axios.util";
import { toast } from "react-toastify";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers":
    "X-Requested-With, content-type, Authorization",
};

export class ApiService {
  constructor() {}

  setToken(token: string) {
    // @ts-ignore
    myAxios.defaults.headers["Authorization"] = "Bearer " + token;
  }

  async post(url: string, body: any) {
    try {
      const result = await myAxios.post(url, body, { headers });
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async postWithAxios<T>(url: string, body: any): Promise<T> {
    try {
      const result = await axios.post(hostStore.url + url, body, { headers });
      return result.data as T;
    } catch (error) {
      throw error;
    }
  }

  async get(url: string, params: any) {
    try {
      const result = await myAxios.get(url, {
        params: params,
        headers,
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async download(urlInput: string, data: any, cbProgress: any) {
    try {
      if (!urlInput.startsWith("/")) urlInput = "/" + urlInput;
      const result = await myAxios.post(urlInput, data, {
        responseType: "arraybuffer",
        onDownloadProgress: (progressEvent) => {
          const loaded = progressEvent.loaded;
          const timeStamp = progressEvent.timeStamp;
          const total = progressEvent.total || 1;
          const percent = Math.floor((loaded / total) * 100);
          cbProgress(percent);
        },
        headers: headers,
      });
      const blob = new Blob([result.data], { type: "audio/mp3" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const filename =
        getFileName(result.headers["content-disposition"]) ||
        String(Date.now()) + ".mp3";

      link.setAttribute("download", filename);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      axiosError(error, (res: any) => {
        toast.error(res);
      });
      throw error;
    }
  }
}

function getFileName(disposition: any) {
  const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)(?:; ?|$)/i;
  const asciiFilenameRegex = /^filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i;

  let fileName = null;
  if (utf8FilenameRegex.test(disposition)) {
    // @ts-ignore
    fileName = decodeURIComponent(utf8FilenameRegex.exec(disposition)[1]);
  } else {
    // prevent ReDos attacks by anchoring the ascii regex to string start and
    //  slicing off everything before 'filename='
    const filenameStart = disposition.toLowerCase().indexOf("filename=");
    if (filenameStart >= 0) {
      const partialDisposition = disposition.slice(filenameStart);
      const matches = asciiFilenameRegex.exec(partialDisposition);
      if (matches != null && matches[2]) {
        fileName = matches[2];
      }
    }
  }
  return fileName;
}

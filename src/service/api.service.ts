import axios, { AxiosResponse } from "axios";
import { axiosError } from "../handlers/error.handler";
import { hostStore } from "../store/host.store";
import myAxios from "../utils/axios.util";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";
import { Response } from "../shared/interfaces/response.interface";
import { getFileName } from "../utils/regex.util";
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

  async get<T extends object>(url: string, params: any): Promise<Response<T>> {
    try {
      const result: AxiosResponse<Response<T>> = await myAxios.get(url, {
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
      const filename = getFileName(result.headers["content-disposition"]);
      // const blob = new Blob([result.data], {
      //   type: result.headers["content-type"],
      // });
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      //
      // link.setAttribute("download", filename);
      // link.setAttribute("target", "_blank");
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      fileDownload(result.data, filename, result.headers["content-type"]);
    } catch (error) {
      throw error;
    }
  }
}

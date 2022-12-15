import { AxiosInstance, AxiosResponse } from "axios";
import fileDownload from "js-file-download";
import { Response } from "../shared/interfaces/response.interface";
import { getFileName } from "../utils/regex.util";

export abstract class ApiService {
  constructor(protected myAxios: AxiosInstance) {}

  protected abstract getPrefix(): string;

  async post<T>(url: string, body: any): Promise<T> {
    try {
      const result = await this.myAxios.post(`${this.getPrefix() + url}`, body);
      return result.data as T;
    } catch (error) {
      throw error;
    }
  }

  async get<T extends object>(url: string, params: any): Promise<Response<T>> {
    try {
      const result: AxiosResponse<Response<T>> = await this.myAxios.get(
        `${this.getPrefix() + url}`,
        {
          params: params,
        }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  protected async download(
    urlInput: string,
    data: any,
    cbProgress: (val: number) => number
  ): Promise<void> {
    try {
      if (!urlInput.startsWith("/")) urlInput = "/" + urlInput;
      const result = await this.myAxios.post(
        `${this.getPrefix() + urlInput}`,
        data,
        {
          responseType: "arraybuffer",
          onDownloadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const timeStamp = progressEvent.timeStamp;
            const total = progressEvent.total || 1;
            const percent: number = Math.floor((loaded / total) * 100);
            cbProgress(percent);
          },
        }
      );
      const filename = getFileName(result.headers["content-disposition"]);
      fileDownload(result.data, filename, result.headers["content-type"]);
    } catch (error) {
      throw error;
    }
  }
}

import { ApiService } from "./api.service";

export class ReportService extends ApiService {
  static PREFIX: string = "/report";
  protected getPrefix(): string {
    return ReportService.PREFIX;
  }

  async send(data: any) {
    try {
      await this.post("/", data);
    } catch (e) {
      throw e;
    }
  }
}

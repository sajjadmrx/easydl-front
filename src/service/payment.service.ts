import { ApiService } from "./api.service";
import { Response } from "../shared/interfaces/response.interface";
import { Plans } from "../shared/interfaces/plans.interface";

export class PaymentService extends ApiService {
  static PREFIX: string = "/payment";
  async getPlans(): Promise<Response<Plans[]>> {
    return this.get("/services", {});
  }

  async buy(planId: number): Promise<Response<string>> {
    return this.post(`/?serviceId=${planId}`, {});
  }

  async verify(refId: string) {
    return this.post(`/verify`, {
      refId: refId,
      status: "OK",
    });
  }

  protected getPrefix(): string {
    return PaymentService.PREFIX;
  }
}

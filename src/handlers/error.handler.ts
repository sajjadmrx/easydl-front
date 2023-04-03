import { ResponseMessages } from "../shared/constants/messages.contant";

export function axiosError(error: any, cb: any) {
  if (error.response && error.response.status > 0) {
    let item = error.response.data;
    let text: any;
    if (typeof item == "object" && !item.message) {
      const enc = new TextDecoder("utf-8");
      item = JSON.parse(enc.decode(item));
      text = item.message;
    } else if (item.message) {
      text = item.message;
    }
    // @ts-ignore
    let message = ResponseMessages[text] || "خطایی رخ داده است";
    if (text == "LIMIT") {
      console.log(item);
      const remainingHours = Math.floor(item.time / 60 / 60);
      const remainingMinutes = Math.floor((item.time % 3600) / 60);
      const remainingSeconds = item.time % 60;
      message = `${remainingHours} ساعت و ${remainingMinutes} دقیقه و ${remainingSeconds} ثانیه تا پایان محدودیت`;
    }
    cb(message);
  } else if (error.request) {
    cb("خطایی در ارتباط با سرور رخ داده است");
  } else {
  }
}

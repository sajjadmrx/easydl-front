import { ResponseMessages } from "../constants/messages.contant";


export function axiosError(error, cb) {
    if (error.response && error.response.status > 0) {

        let item = error.response.data;
        let text;
        if (typeof item == 'object' && !item.message) {
            const enc = new TextDecoder("utf-8");
            text = enc.decode(item);
            text = JSON.parse(text).message;
        }
        else if (item.message) {
            text = item.message
        }
        cb(ResponseMessages[text] || "خطایی رخ داده است");
    } else if (error.request) {

        cb("خطایی در ارتباط با سرور رخ داده است");
    } else {
    }
}
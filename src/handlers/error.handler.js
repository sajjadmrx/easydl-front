import { ResponseMessages } from "../constants/messages.contant";


export function axiosError(error, setStateError) {
    if (error.response && error.response.status > 0) {

        let item = error.response.data;
        console.log(item)
        let text;
        if (typeof item == 'object' && !item.message) {
            const enc = new TextDecoder("utf-8");
            text = enc.decode(item);
            text = JSON.parse(text).message;
        }
        else if (item.message) {
            text = item.message
        }

        setStateError(ResponseMessages[text] || "خطایی رخ داده است");
    } else if (error.request) {

        setStateError("خطایی در ارتباط با سرور رخ داده است");
    } else {
    }
}
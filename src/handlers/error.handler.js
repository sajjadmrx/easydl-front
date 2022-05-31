import { ResponseMessages } from "../constants/messages.contant";


export function axiosError(error, setStateError) {
    if (error.response && error.response.status > 0) {

        let text = error.response.data;

        if (typeof text == 'object') {
            const enc = new TextDecoder("utf-8");
            text = enc.decode(text);
            text = JSON.parse(text).message;
        }

        setStateError(ResponseMessages[text] || "خطایی رخ داده است");
    } else if (error.request) {

        setStateError("خطایی در ارتباط با سرور رخ داده است");
    } else {
        console.log('Error', error.message);
    }
    console.log(error.config);
}
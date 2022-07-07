import axios from "axios";
import { hostStore } from '../store/host.store'
import { CookieUtil } from "./cookie.util";
const myAxios = axios.create({
    baseURL: hostStore.url,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization,Accept',
    }
})
myAxios.interceptors.request.use((config) => {
    let token = CookieUtil.get('token')
    console.log("TOKEN: ", token, config)
    if (token) {
        config.headers.credentials = 'include';
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Access-Control-Allow-Origin'] = '*';
    }
    else if (config.url != 'users/@me/profile')
        config.headers.Authorization = null;
    return config;
})

export default myAxios;
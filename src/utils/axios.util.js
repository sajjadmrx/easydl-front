import axios from "axios";
import { hostStore } from '../store/host.store'
import { CookieUtil } from "./cookie.util";
const myAxios = axios.create({
    baseURL: hostStore.url,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Authorization,Accept',
        'Authorization': 'Bearer ' + CookieUtil.get('token') || '',
    }
})


export default myAxios;
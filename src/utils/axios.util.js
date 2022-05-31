import axios from "axios";
import { hostStore } from '../store/host.store'
const myAxios = axios.create({
    baseURL: hostStore.url,

})


export default myAxios;
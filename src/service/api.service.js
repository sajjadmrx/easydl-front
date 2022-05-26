import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
//set base url
const baseUrl = process.env.NODE_ENV == 'development' ? "http://localhost:5000" : "https://rj.app";
axios.defaults.baseURL = baseUrl;

class methods {
    async get(url, params = {}) {
        const result = await axios.get(url, { params })
        return result.data
    }
    async post(url, data = {}) {
        const result = await axios.post(url, data)
        return result.data
    }
    async put(url, data = {}) {
        const result = await axios.put(url, data)
        return result.data
    }
}

export class ApiService extends methods {
    constructor() {
        super();
    }
    async getSongDetails(link) {

    }
    async getSongWithSlug(slug) {

    }
    async searchRadioJavan(slug) {

    }
    async getOrginalUrlRadioJavan(url) {

    }

}
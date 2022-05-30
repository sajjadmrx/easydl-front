import Axios from 'axios';


//set base url
const baseUrl = process.env.NODE_ENV == 'development' ? "http://localhost:5000" : "https://rj.app";
const axios = Axios.create({
    baseURL: baseUrl
})
//cors
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
    async searchSpotify(query) {
        try {
            const result = await this.post('/search/spotify', {
                url: query
            })
            return result
        } catch (error) {
            throw error
        }
    }
    async getOrginalUrlRadioJavan(url) {

    }

    async download(urlInput, cbProgress) {
        try {
            if (!urlInput.startsWith('/'))
                urlInput = '/' + urlInput;
            console.log(urlInput);
            const result = await axios.get(urlInput, {
                responseType: 'arraybuffer',
                onDownloadProgress: (progressEvent) => {
                    const loaded = progressEvent.loaded;
                    const timeStamp = progressEvent.timeStamp;
                    const total = progressEvent.total || 1
                    const percent = Math.floor((loaded / total) * 100);
                    cbProgress(percent)
                }
            });
            const blob = new Blob([result.data], { type: 'audio/mp3' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const filename = result.headers['filename'];
            link.setAttribute('download', filename);
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            throw error
        }
    }



}
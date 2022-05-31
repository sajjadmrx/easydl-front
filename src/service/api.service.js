
import myAxios from '../utils/axios.util';



//cors
class methods {
    async get(url, params = {}) {
        const result = await myAxios.get(url, { params })
        return result.data
    }
    async post(url, data = {}) {
        const result = await myAxios.post(url, data)
        return result.data
    }
    async put(url, data = {}) {
        const result = await myAxios.put(url, data)
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
    async searchRadioJavan(url) {
        try {
            const result = await this.get('/search/radiojavan', {
                url: url
            })
            return result
        } catch (error) {
            throw error
        }
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
            const result = await myAxios.get(urlInput, {
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
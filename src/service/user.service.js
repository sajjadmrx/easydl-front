import { CookieUtil } from "../utils/cookie.util";

export class UserService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    async getProfile() {
        const token = CookieUtil.get('token')
        this.apiService.setToken(token);
        return this.apiService.get('users/@me/profile');
    }
    async getDownloads() {
        this.apiService.setToken(CookieUtil.get('token'));
        const result = await this.apiService.get('users/@me/downloads');
        return result.data;
    }
}
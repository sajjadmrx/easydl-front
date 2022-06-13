import { CookieUtil } from "../utils/cookie.util";

export class UserService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    getProfile() {
        this.apiService.setToken(CookieUtil.get('token'));
        return this.apiService.get('users/@me/profile');
    }
}
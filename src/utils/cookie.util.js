import Cookies from 'js-cookie';
import ms from 'ms'
export class CookieUtil {
    static has(name) {
        const cookie = Cookies.get(name);
        return cookie !== undefined;
    }
    static set(name, value, expireMs = null) {
        if (expireMs) {
            Cookies.set(name, value, { expires: expireMs });
        }
        else {
            Cookies.set(name, value);
        }
    }
}
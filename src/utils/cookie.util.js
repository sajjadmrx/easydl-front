import Cookies from "js-cookie";
export class CookieUtil {
  static has(name) {
    const cookie = Cookies.get(name);
    return cookie !== undefined;
  }
  static set(name, value, expireMs = null) {
    if (expireMs) {
      Cookies.set(name, value, { expires: expireMs });
    } else {
      Cookies.set(name, value);
    }
  }
  static get(name) {
    return Cookies.get(name) || null;
  }

  static delete(name) {
    Cookies.remove(name);
  }
}

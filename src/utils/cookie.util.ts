import Cookies from "js-cookie";
export class CookieUtil {
  static has(name: string): boolean {
    const cookie = Cookies.get(name);
    return cookie !== undefined;
  }
  static set(name: string, value: any, expireMs = null): void {
    if (expireMs) {
      Cookies.set(name, value, { expires: expireMs });
    } else {
      Cookies.set(name, value);
    }
  }
  static get(name: string): any {
    return Cookies.get(name) || null;
  }

  static delete(name: string): any {
    Cookies.remove(name);
  }
}

import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";


const apiService = new ApiService()


export const authService = new AuthService(apiService)
export const userService = new UserService(new ApiService())
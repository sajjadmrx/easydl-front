export class AuthService {
    constructor(apiService) {
        this.apiService = apiService
    }

    async sendGoogleToken(token) {
        try {
            const result = await this.apiService.postWithAxios('/auth/google', { token })
            return result
        } catch (error) {
            throw error
        }
    }
}
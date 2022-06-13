export class AuthService {
    constructor(apiService) {
        this.apiService = apiService
    }

    async sendGoogleToken(token) {
        try {
            const result = await this.apiService.post('/auth/google', { token })
            return result
        } catch (error) {
            throw error
        }
    }
}
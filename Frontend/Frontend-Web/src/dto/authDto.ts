export interface LoginRequest {
    identifier: string;  // adjust accordingly: username/email/etc.
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}
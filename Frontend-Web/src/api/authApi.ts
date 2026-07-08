import axios from "axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../dto/authDto";
import { parseApiError } from "../lib/errorHandling";
import { API_BASE_URL } from "../config/api";

interface LoginApiProps {
    req: LoginRequest;
    setError: (err: string) => void
}

interface RegisterApiProps {
    req: RegisterRequest;
    setError: (err: string) => void
}

export const loginApi = async ({req, setError}: LoginApiProps): Promise<AuthResponse | null> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_BASE_URL}/auth/login`,
            req
        )
        if (response && response.data) return response.data;
        return null;
    } catch (err: unknown) {
        setError(parseApiError(err))
        return null;
    }
}

export const registerApi = async ({req, setError}: RegisterApiProps): Promise<AuthResponse | null> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_BASE_URL}/auth/register`,
            req
        )
        if (response && response.data) return response.data;
        return null;
    } catch (err: unknown) {
        setError(parseApiError(err))
        return null;
    }
}
import axios from "axios";
import type { AuthResponse, LoginRequest } from "../dto/authDto";
import { parseApiError } from "../lib/errorHandling";
import { API_BASE_URL } from "../config/api";

interface LoginApiProps {
    req: LoginRequest;
}

export const loginApi = async ({req}: LoginApiProps): Promise<AuthResponse | null> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_BASE_URL}/auth/login`,
            req
        )
        if (response && response.data) return response.data;
        return null;
    } catch (err: unknown) {
        parseApiError(err)
        return null;
    }
}
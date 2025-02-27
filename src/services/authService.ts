import api from "./api";

const LOGIN_URL = "/persona/auth/login";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>(LOGIN_URL, { email, password });

    localStorage.setItem("accessToken", response.data.accessToken);

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error("Credenciais inválidas. Tente novamente.");
  }
}
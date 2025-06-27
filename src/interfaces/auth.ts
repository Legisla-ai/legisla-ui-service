export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  organizationName: string;
  numberOfEmployees: number;
}
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}
export type RegisterUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  organizationName: string;
  numberOfEmployees: number;
};
export type RegisterResponse = LoginResponse;

export interface AuthContextType {
  user: User | null;
  tokens: { accessToken: string; refreshToken: string; idToken: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (response: LoginResponse, userData?: User) => void;
  logout: () => void;
  updateTokens: (newTokens: { accessToken: string; refreshToken: string; idToken: string }) => void;
}

// src/interfaces/auth.ts
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

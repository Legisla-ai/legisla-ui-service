import { SignUpSchemaType } from '@/schemas/signUpSchema';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}
export type RegisterUser = SignUpSchemaType;
export type RegisterResponse = LoginResponse;

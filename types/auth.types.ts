import {Jwt} from "@/types/index";

export type SignupParams = {
    email: string;
    username: string;
    password: string;
    company: number;
    signal?: AbortSignal;
};

export type signupResponse = {
    details: string;
    status_code: number;
};

export type loginResponse = {
    results: Jwt | string;
    http_status_code: number;
};

export interface LoginParams {
  username: string;
  password: string;
  signal?: AbortSignal;
}
export type ChangePasswordParams = {
    old_password: string;
    new_password: string;
    signal?: AbortSignal;
};

export type ResetPasswordParams = {
    email: string,
    signal?: AbortSignal
}

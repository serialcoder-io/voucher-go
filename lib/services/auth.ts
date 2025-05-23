import {Jwt} from "@/lib/definitions";
import {baseUrl} from "@/lib/utils";

export type loginResponse = {
    results: Jwt | string;
    http_status_code: number;
};

export interface LoginParams {
    username: string;
    password: string;
}

/**
 * Gets a tokens pair (JWT)
 * @param credentials - Login parameters containing username and password
 * @returns - JWT tokens or error message
 */
export async function login(credentials: LoginParams): Promise<loginResponse> {
    try {
        const response = await fetch(`${baseUrl}/vms/auth/token/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (!response.ok) {
            return {
                results: data.detail ||
                    'something went wrong, Please try again or contact support if the problem persists.',
                http_status_code: response.status,
            };
        }
        return {
            results: data as Jwt,
            http_status_code: response.status,
        };
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error('Sorry, something went wrong: ' + JSON.stringify(e));
        }
    }
}

export type SignupParams = {
    email: string;
    username: string;
    password: string;
    company: number;
};

export type signupResponse = {
    details: string;
    status_code: number;
};
export async function signup(params: SignupParams): Promise<signupResponse> {
    try {
        const response = await fetch(`${baseUrl}/vms/auth/users/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        let message = ""
        if(response.status == 400){
            const data = await response.json();
            if(data.email){
               message = data.email[0]
            }else if(data.username){
                message = data.username[0]
            }
        }else if(!response.ok){
            message = "something went wrong, Please try again or contact support if the problem persists."
        }
        return {
            details: message,
            status_code: response.status
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error('Sorry, something went wrong: ' + JSON.stringify(e));
        }
    }
}


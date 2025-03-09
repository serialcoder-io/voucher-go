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
 * Obtains tokens pair (JWT)
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
                results: data.detail || 'somothing went wrong',
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

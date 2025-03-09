import {Jwt, User} from "@/lib/definitions";
import {TokenName} from "@/store/AuthStore";
import {baseUrl} from "@/lib/utils";


export type loginResponse = {
    results: Jwt | string;
    http_status_code: number;
};

export interface LoginParams {
    username: string;
    password: string;
}

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

type UserResponse = {
    results: User | null;
    http_status_code: number;
}

export async function fetchSignedInUserData(accessToken: TokenName): Promise<UserResponse> {
    try {
        const response = await fetch(`${baseUrl}/vms/auth/users/me/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                results: data.detail || null,
                http_status_code: response.status,
            };
        }
        return {
            results: data as User,
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





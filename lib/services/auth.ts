import {Jwt} from "@/types";
import {baseUrl} from "@/lib/services/base-url";
import {
    SignupParams,
    signupResponse,
    loginResponse,
    LoginParams,
    ChangePasswordParams,
    ResetPasswordParams
} from "@/types/auth.types";


/**
 * Gets a tokens pair (JWT)
 * @param credentials - Login parameters containing username and password
 * @returns - JWT tokens or error message
 */
export async function login(
    params: LoginParams, 
): Promise<loginResponse> {
     const { username, password, signal } = params;

    try {
        const response = await fetch(`${baseUrl}/vms/auth/token/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
            signal
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

export async function signup(params: SignupParams): Promise<signupResponse> {
    const { email, username, password, company, signal } = params
    try {
        const response = await fetch(`${baseUrl}/vms/auth/users/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password, company }),
            signal
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


/**
 * send a request to the endpoint and return the http status code
 * if the status code is 204 it means and email was sent
 * @param params
 * @returns 
 */
export async function resetPassword(params: ResetPasswordParams): Promise<number>{
    const {email, signal} = params;
    try {
        const response = await fetch(`${baseUrl}/vms/auth/users/reset_password/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"email": email}),
            signal
        });
        return response.status;
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error('Sorry, something went wrong: ' + JSON.stringify(e));
        }
    }
}


export async function updatePassword({
     params,
     accessToken
}: {
    params: ChangePasswordParams,
    accessToken: string
}): Promise<number>{
    const { old_password, new_password, signal } = params;
    try {
        const response = await fetch(`${baseUrl}/vms/auth/change_password/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ old_password, new_password}),
            signal
        });
        return response.status;
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw e;
        } else {
            throw new Error('Sorry, something went wrong: ' + JSON.stringify(e));
        }
    }
}
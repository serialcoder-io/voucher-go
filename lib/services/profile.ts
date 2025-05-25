import { baseUrl } from "./base-url";

export type UserProfile = {
    first_name: string,
    last_name: string,
    username: string
    email: string
}
/**
 * send a request to the endpoint and return the http status code
 * if the status code is 200 it means user profile was update
 * @param prams 
 * @param access_token
 * @returns the http status code
 */
export async function updateUserProfile({
    params,
    accessToken,
}: {
    params: UserProfile;
    accessToken: string;
}): Promise<number> {
    try {
        const response = await fetch(`${baseUrl}/vms/auth/users/me/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(params),
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
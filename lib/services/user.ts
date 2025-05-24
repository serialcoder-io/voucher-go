import {User} from "@/lib/definitions";
import {baseUrl} from "@/lib/services/base-url";


/**
 * Fetches user data using the provided access token.
 * @param accessToken - The access token used for authentication in the request.
 * @returns - A promise that resolves to the user data or null if the request fails.
 */
async function fetchUserData(accessToken: string): Promise<User | null> {
    try {
        const response = await fetch(`${baseUrl}/vms/auth/users/me/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        return await response.json() as User;

    } catch (err) {
        console.error("Error fetching user data:", err);
        return null;
    }
}

export default fetchUserData;
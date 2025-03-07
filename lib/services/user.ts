import {User} from "@/lib/definitions";

async function fetchUserData(accessToken: string): Promise<User | null> {
    try {
        const response = await fetch("http://192.168.150.83:8000/vms/auth/users/me/", {
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
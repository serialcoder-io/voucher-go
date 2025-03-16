import {Company, Shop} from "@/lib/definitions";
import {baseUrl} from "@/lib/utils";

export type CompanyResponse = {
    data: Company[] | null;
    http_status_code: number;
}

export async function fetchAllCompanies(): Promise<Company[] | []> {
    try {
        const response = await fetch(`${baseUrl}/vms/api/companies/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data as Company[] || [];
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error('Sorry, something went wrong: ' + e.message);
        }
        throw new Error('Unknown error occurred');
    }
}

/**
 * Fetches all shops for a given company based on the company ID.
 * This function makes an API request to retrieve all shops associated with the specified company.
 *
 * @param {number} companyId - The ID of the company for which to fetch all shops.
 * @return {Promise<Shop[]>} - Returns a promise that resolves to an array of Shop objects if shops exist, or an empty array if none are found.
 *
 * @throws {Error} - Throws an error if the request fails or if an unknown error occurs.
 */
export async function fetchShops(companyId: number): Promise<Shop[] | []> {
    try {
        const response = await fetch(`${baseUrl}/vms/api/shops/?company=${companyId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data as Shop[] || [];
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error('Sorry, something went wrong: ' + e.message);
        }
        throw new Error('Unknown error occurred');
    }
}

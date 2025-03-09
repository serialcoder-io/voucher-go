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

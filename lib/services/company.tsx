import { Company } from "@/lib/definitions";
import {baseUrl} from "@/lib/utils";

export type CompanyResponse = {
    data: Company[] | null;
    http_status_code: number;
}

export async function fetchAllCompanies(): Promise<Company[]> {
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
        return data as Company[]; // On s'assure que `data` est un tableau d'entreprises
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error('Sorry, something went wrong: ' + e.message);
        }
        throw new Error('Unknown error occurred');
    }
}

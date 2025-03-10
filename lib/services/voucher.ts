import {Voucher} from "@/lib/definitions";
import {baseUrl} from "@/lib/utils";

export async function findVoucherByRef(voucherRef: string, accessToken: string): Promise<Voucher[] | []> {
    try {
        const response = await fetch(`${baseUrl}/vms/api/vouchers/?search=${voucherRef}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.results.length > 0 ? data.results as Voucher[] : [];
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error('Error fetching voucher:', e.message);
        }
        // Retourne un tableau vide en cas d'erreur
        return [];
    }
}
import {Shop, Voucher} from "@/lib/definitions";
import {baseUrl} from "@/lib/utils";

export async function findVoucherById(voucherRef: string): Promise<Voucher | []> {
    try {
        const response = await fetch(`${baseUrl}/vms/api/vouchers/?search=${encodeURIComponent(voucherRef)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const voucher = await response.json();
        return voucher as Voucher || [];
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error('Sorry, something went wrong: ' + e.message);
        }
        throw new Error('Unknown error occurred');
    }
}
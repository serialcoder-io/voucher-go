import {Voucher} from "@/lib/definitions";
import {baseUrl} from "@/lib/utils";

export async function getVouchersRedeemedAtShop(shop_id: number, accessToken: string): Promise<Voucher[] | []> {
    try {
        const response = await fetch(`${baseUrl}/vms/api/vouchers/?voucher_status=redeemed&redemption__shop=${shop_id}`, {
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
        return [];
    }
}


import {Voucher} from "@/lib/definitions";
import {baseUrl} from "@/constants/base-url";


export type VouchersResponse = {
    next: string | null,
    previous: string | null,
    vouchers: Voucher[] | [],
}

export async function getVouchersRedeemedAtShop(accessToken: string, page: number = 1, shop_id: number): Promise<VouchersResponse> {
    const queryParams = `?voucher_status=redeemed&redemption__shop=${shop_id}&page=${page}`
    try {
        const response = await fetch(`${baseUrl}/vms/api/vouchers/${queryParams}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        return {
            next: data.next,
            previous: data.prevous,
            vouchers: data.results,
        } as VouchersResponse;

    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error('Error fetching voucher:', e.message);
        }
        return {
            next: null,
            previous: null,
            vouchers: [],
        }
    }
}


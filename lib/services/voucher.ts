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

type VoucherRedemptionSuccess = {
    http_status: number;
    details: string;
    voucher_info: {
        voucher_ref: string;
        amount: number;
        redemption: {
            redeemed_on: string;
            redeemed_at: string;
            till_no: number;
        };
    };
};

type VoucherRedemptionFailed = {
    http_status: number;
    details: string;
};

export type RedemptionResponse = VoucherRedemptionSuccess | VoucherRedemptionFailed;
export type RedemptionParams = {
    voucherId: number,
    shopId: number,
    tillNo: number | string,
    accessToken: string,
}

export async function redeemVoucher({voucherId, shopId, tillNo, accessToken}: RedemptionParams): Promise<RedemptionResponse> {
    try {
        const response = await fetch(`${baseUrl}/vms/api/vouchers/${voucherId}/redeem/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({shop_id: shopId, till_no: tillNo,}),
        });
        const results = await response.json();
        return {
            http_status: response.status,
            ...results,
        };
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error('Error fetching voucher:', e.message);
        }
        console.log(e)
        // Retourne un tableau vide en cas d'erreur
        return {"http_status": 500, "details": "Sorry, something went wrong"};
    }
}
import { useMutation } from '@tanstack/react-query';
import { redeemVoucher, RedemptionParams, RedemptionResponse } from "@/lib/services/voucher";

export const useRedeemVoucher = () => {
    return useMutation<RedemptionResponse, Error, RedemptionParams>({
        mutationFn: redeemVoucher,
    });
};

export default useRedeemVoucher;

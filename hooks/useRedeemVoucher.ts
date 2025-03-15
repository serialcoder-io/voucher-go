import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { redeemVoucher, RedemptionParams, RedemptionResponse } from "@/lib/services/voucher";

const useRedeemVoucher = (
    shopId: number | string,
    tillNo: string | number,
    voucherId: number,
    accessToken: string
) => {
    // Assure-toi de typer correctement la mutation
    const mutation: UseMutationResult<RedemptionResponse, Error, RedemptionParams> = useMutation({
        mutationFn: redeemVoucher,
    });

    const handleRedeem = async () => {
        if (shopId && tillNo && voucherId) {
            try {
                await mutation.mutateAsync({ voucherId, shopId, tillNo, accessToken });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return {
        handleRedeem,
        isPending: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    };
};

export default useRedeemVoucher;

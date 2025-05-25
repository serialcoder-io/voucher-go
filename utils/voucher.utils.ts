import { UseMutationResult } from '@tanstack/react-query';
import { showDialog, showToast } from "@/utils/index";
import { ALERT_TYPE } from "react-native-alert-notification";
import { RedemptionParams, RedemptionResponse } from "@/lib/services/voucher";
import {Theme} from "@/types";

type RedirectFunction = () => void;

interface HandleRedeemParams {
    mutation: UseMutationResult<RedemptionResponse, Error, RedemptionParams>;
    shopId: number | "";
    tillNo: number | "";
    voucherId: number;
    accessToken: string;
    redirect: RedirectFunction;
    theme: Theme
}

export const handleRedeem = async ({
    mutation,
    shopId,
    tillNo,
    voucherId,
    accessToken,
    redirect,
    theme,
}: HandleRedeemParams): Promise<void> => {
    if (shopId && tillNo) {
        try {
            const result = await mutation.mutateAsync({ voucherId, shopId, tillNo, accessToken });
            switch (result.http_status) {
                case 201:
                    showToast("Redeemed", result.details!, ALERT_TYPE.SUCCESS, theme);
                    break;
                case 400:
                    showDialog('Warning', result.details, ALERT_TYPE.WARNING, redirect);
                    break;
                case 404:
                    showDialog('Error', result.details!, ALERT_TYPE.DANGER, redirect);
                    break;
                default:
                    const defaultMsg = "Sorry something went wrong. please try again later.";
                    const errorMsg = result.details ? result.details : defaultMsg;
                    showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect);
            }
        } catch (error) {
            const errorMsg = "Sorry, something went wrong, please try again later";
            showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect);
        }
    } else {
        const errorMsg = "Invalid data. Please check the voucher, shop, or till number.";
        showDialog('Error', errorMsg, ALERT_TYPE.DANGER, redirect);
    }
};

import {Voucher} from "@/types";

/**
 * this fucntion check if the voucher was expired, and return true, false otherwise
 * @param voucher
 */
export const isVoucherExpired = (voucher: Voucher) => {
    const now = new Date();
    const expiry = voucher.expiry_date ? new Date(voucher.expiry_date) : null;
    const extension = voucher.extention_date ? new Date(voucher.extention_date) : null;

    if (!expiry) return false; // If there is no expiry_date, assume the voucher is still valid
    if (now <= expiry) return false; 
    if (extension && now <= extension) return false;

    return true;
};


/**
 * this function check if the status of the voucher.
 * if it's issued, return true, false otherwise
 * @param voucher
 */
export const isVoucherInvalidStatus = (voucher: Voucher) => {
    return voucher.voucher_status !== "issued";
};
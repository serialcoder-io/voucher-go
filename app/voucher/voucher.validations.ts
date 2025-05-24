import {Voucher} from "@/lib/definitions";

/**
 * this fucntion check if the voucher is not expired, and return true, false otherwise
 * @param voucher
 */
export const isVoucherExpired = (voucher: Voucher) => {
    // Check if the voucher status is "expired"
    if (voucher.voucher_status === "expired") {
        return true; // If the status is "expired", the voucher is expired
    }

    const expiration_date = voucher.expiry_date ? new Date(voucher.expiry_date) : null;
    const extention_date = voucher.extention_date ? new Date(voucher.extention_date) : null;
    const currentDate = new Date();

    // If an expiration date is present, compare it with the current date
    if (expiration_date && currentDate > expiration_date) {
        // If the expiration date is passed, check for the extension
        return !(extention_date && currentDate <= extention_date);
    }
    return false; // The voucher is not expired if none of the above conditions are met
};


/**
 * this function check if the status of the voucher.
 * if it's issued, return true, false otherwise
 * @param voucher
 */
export const isVoucherInvalidStatus = (voucher: Voucher) => {
    return voucher.voucher_status !== "issued";
};
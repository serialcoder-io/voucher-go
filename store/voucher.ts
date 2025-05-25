import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {createSelectors} from "@/utils";
import {Voucher} from "@/types";

interface VoucherState {
    voucher: Voucher[] | []
    setVoucher: (voucher: Voucher[]) => void
}

/**
 * store the voucher when the user scanned or enter the reference manually and a voucher was found
 */
export const useVoucherStore = createSelectors(
    create<VoucherState>()(
        immer((set) => ({
            voucher: [],
            setVoucher: (voucher: Voucher[])=> set((state)=>{
                state.voucher = voucher;
            })
        }))
    )
)

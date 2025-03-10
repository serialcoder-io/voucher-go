import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {createSelectors} from "@/lib/utils";
import {Voucher} from "@/lib/definitions";


interface VoucherState {
    voucher: Voucher[] | []
    setVoucher: (voucher: Voucher[]) => void
}
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

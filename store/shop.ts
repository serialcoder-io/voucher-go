import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {Shop} from "@/lib/definitions";
import {createSelectors} from "@/lib/utils";


interface ShopState {
    shop: Shop | null
    setShop: (shop: Shop) => void
}
export const useShopStore = createSelectors(
    create<ShopState>()(
        immer((set) => ({
            shop: null,
            setShop: (shop: Shop)=> set((state)=>{
                state.shop = shop;
            })
        }))
    )
)

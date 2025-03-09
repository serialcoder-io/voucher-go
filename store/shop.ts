import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {Shop} from "@/lib/definitions";
import {createSelectors} from "@/lib/utils";


interface ShopState {
    shop: Shop | null
}
export const useAuthStore = createSelectors(
    create<ShopState>()(
        immer((set) => ({
            shop: null,
            setShop: (shop: Shop)=> set((state)=>{
                if(state.shop !== null){
                    state.shop = shop
                }
            })
        }))
    )
)

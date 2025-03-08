import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { StoreApi, UseBoundStore } from 'zustand';
import {Company, Shop} from "@/lib/definitions";

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    let store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }

    return store
}

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

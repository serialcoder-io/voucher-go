import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {createSelectors} from "@/lib/utils";


interface GlobalRefState {
    globalRef: string | null
    setGlobalRef: (newRef: string) => void
}
export const useGlobalRef = createSelectors(
    create<GlobalRefState>()(
        immer((set) => ({
            globalRef: null,
            setGlobalRef: (ref: string)=> set((state)=>{
                state.globalRef = ref
            })
        }))
    )
)

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {createSelectors} from "@/lib/utils";


interface FilterModalState {
    modalVisible:boolean;
    setModalVisible: () => void
}
export const useFilterModalVisibility = createSelectors(
    create<FilterModalState>()(
        immer((set) => ({
            modalVisible: false,
            setModalVisible: ()=> set((state)=>{
                state.modalVisible = !state.modalVisible;
                console.log(state.modalVisible);
            })
        }))
    )
)

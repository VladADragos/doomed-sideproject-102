import {
    atom, selector, selectorFamily,
} from "recoil";
import { TPage } from "../../types";


const slotsState = atom<Map<string, string>>({
    key: 'slotsState', // unique ID (with respect to other atoms/selectors)
    default: new Map(), // default value (aka initial value)
});

const pagesStateDefault: [string, TPage][] = [["1", { layout: "first", name: "1", pageNumber: 0 }]]


const pagesState = atom<Map<string, TPage>>({
    key: 'pagesState', // unique ID (with respect to other atoms/selectors)
    default: new Map(), // default value (aka initial value)
});

const aspectRatioState = atom<string>({
    key: 'aspectRatio', // unique ID (with respect to other atoms/selectors)
    default: "210/297", // default value (aka initial value)
});


const blocksState = atom<Map<string, { name: string, imageSrc: string }>>({
    key: "blocksState",
    default: new Map()
})

const selectBlock = selectorFamily<undefined | { name: string, imageSrc: string }, string | undefined>({
    key: "selectBlock",
    get: (block) => ({ get }) => {
        if (!block) return undefined;
        const blocks = get(blocksState);

        return blocks.get(block);
    }
})

const selectSlotData = selectorFamily<undefined | string, string>({
    key: "selectSlotData",
    get: (slot) => ({ get }) => {
        const slots = get(slotsState);

        return slots.get(slot);
    }
})


// const selectSlotData = selector({
//     key: "selectSlotData",
//     get: ({ get }) => {
//         const slots = get(slotsState);
//         return slots
//     }
// })

const layouts: string[] = [
    "layout 0",
    "layout 1",
    "layout 2",
    "layout 3",
]
export { slotsState, selectSlotData, blocksState, selectBlock, aspectRatioState, pagesState, layouts };
import { atom, selector, selectorFamily } from "recoil";
import {
  getItems,
  getConditions,
  getGhosts,
  getItemConditions,
} from "@/features/common/apis";

export interface Item {
  id: number;
  name: string;
}

export interface Condition {
  id: number;
  value: string;
  name: string;
}

export interface Ghost {
  id: number;
  name: string;
  items: Item[];
}

export interface ItemCondition {
  item: Item;
  condition: Condition;
}

export const itemsStore = atom<Item[]>({
  key: "itemsStore",
  default: selector({
    key: "itemsStoreAsync",
    get: async () => await getItems(),
  }),
});

export const conditionsStore = atom<Condition[]>({
  key: "conditionsStore",
  default: selector({
    key: "conditionsStoreAsync",
    get: async () => await getConditions(),
  }),
});

export const ghostsStore = atom<Ghost[]>({
  key: "ghostsStore",
  default: selector({
    key: "ghostsStoreAsync",
    get: async () => await getGhosts(),
  }),
});

export const itemConditionsStore = atom<ItemCondition[]>({
  key: "itemConditionsStore",
  default: selector({
    key: "itemConditionsStoreAsync",
    get: async () => await getItemConditions(),
  }),
});

export const determinCountStore = selectorFamily<number, number>({
  key: "determinCountStore",
  get: ghostId => {
    // istanbul ignore next
    return ({ get }) => {
      const conditionPerItem = get(itemConditionsStore);
      const ghosts = get(ghostsStore);
      const determinItemIds = conditionPerItem
        .filter(o => o.condition.id === 1)
        .map(o => o.item.id);

      return ghosts
        .filter(o => o.id === ghostId)
        .flatMap(o => o.items)
        .filter(o => determinItemIds.includes(o.id)).length;
    };
  },
});

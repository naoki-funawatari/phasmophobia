import { atom, selectorFamily } from "recoil";
import itemsjson from "@/database/items.json";
import conditionsjson from "@/database/conditions.json";
import ghostsjson from "@/database/ghosts.json";

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
  itemIds: number[];
}

export interface ItemCondition {
  item: Item;
  condition: Condition;
}

export const itemsStore = atom<Item[]>({
  key: "itemsStore",
  default: itemsjson,
});

export const conditionsStore = atom<Condition[]>({
  key: "conditionsStore",
  default: conditionsjson,
});

export const ghostsStore = atom<Ghost[]>({
  key: "ghostsStore",
  default: ghostsjson,
});

export const itemConditionsStore = atom<ItemCondition[]>({
  key: "itemConditionsStore",
  default: itemsjson.map(item => ({
    item,
    condition: conditionsjson[0],
  })),
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
        .flatMap(o => o.itemIds)
        .filter(o => determinItemIds.includes(o)).length;
    };
  },
});

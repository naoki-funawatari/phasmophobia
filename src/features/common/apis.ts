import itemsjson from "@/database/items.json";
import conditionsjson from "@/database/conditions.json";
import ghostsjson from "@/database/ghosts.json";
import type {
  Item,
  Condition,
  Ghost,
  ItemCondition,
} from "@/features/common/stores";

export const getItems = () => {
  return new Promise<Item[]>(resolve => {
    resolve(itemsjson);
  });
};

export const getConditions = () => {
  return new Promise<Condition[]>(resolve => {
    resolve(conditionsjson);
  });
};

export const getGhosts = () => {
  return new Promise<Ghost[]>(resolve => {
    resolve(ghostsjson);
  });
};

export const getItemConditions = async () => {
  const items = await getItems();
  const conditions = await getConditions();

  return items.map<ItemCondition>(item => ({
    item,
    condition: conditions[0],
  }));
};

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

export const getItem = (id: number) => {
  const item = itemsjson.map<Item>(o => o).find(o => o.id === id);

  if (item === undefined) {
    throw new Error();
  }

  return item;
};

export const getConditions = () => {
  return new Promise<Condition[]>(resolve => {
    resolve(conditionsjson);
  });
};

export const getGhosts = async () => {
  const ghosts = ghostsjson.map<Promise<Ghost>>(async ghost => {
    const items = ghost.itemIds.map(itemId => getItem(itemId));
    return {
      id: ghost.id,
      name: ghost.name,
      items: await Promise.all(items),
    };
  });

  return await Promise.all(ghosts);
};

export const getItemConditions = async () => {
  const items = await getItems();
  const conditions = await getConditions();

  return items.map<ItemCondition>(item => ({
    item,
    condition: conditions[0],
  }));
};

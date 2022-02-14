import { useRecoilValue, useRecoilState } from "recoil";
import { itemsStore, conditionsStore, itemConditionsStore } from "@/stores/stores";

export const useItems = () => useRecoilValue(itemsStore);

export const useConditions = () => useRecoilValue(conditionsStore);

export const useConditionPerItem = () => {
  const [conditionPerItem, setConditionPerItem] = useRecoilState(itemConditionsStore);
  return { conditionPerItem, setConditionPerItem };
};

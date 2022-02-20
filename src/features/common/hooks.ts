import { useRecoilValue, useRecoilState } from "recoil";
import {
  itemsStore,
  conditionsStore,
  ghostsStore,
  itemConditionsStore,
} from "@/features/common/stores";

export const useItems = () => useRecoilValue(itemsStore);

export const useConditions = () => useRecoilValue(conditionsStore);

export const useGhosts = () => useRecoilValue(ghostsStore);

export const useConditionPerItem = () => {
  const [conditionPerItem, setConditionPerItem] = useRecoilState(itemConditionsStore);
  return { conditionPerItem, setConditionPerItem };
};

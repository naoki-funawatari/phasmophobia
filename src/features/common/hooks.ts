import { useRecoilValue, useRecoilState } from "recoil";
import {
  itemsStore,
  conditionsStore,
  ghostsStore,
  itemConditionsStore,
  determinCountStore,
} from "@/features/common/stores";

export const useItems = () => useRecoilValue(itemsStore);

export const useConditions = () => useRecoilValue(conditionsStore);

export const useGhosts = () => useRecoilValue(ghostsStore);

export const useConditionPerItem = () => {
  const [conditionPerItem, setConditionPerItem] =
    useRecoilState(itemConditionsStore);
  return { conditionPerItem, setConditionPerItem };
};

export const useDeterminCount = (ghostId: number) =>
  useRecoilValue(determinCountStore(ghostId));

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

export const useItemConditions = () => {
  const [itemConditions, setConditionPerItem] =
    useRecoilState(itemConditionsStore);
  return { itemConditions, setConditionPerItem };
};

export const useDeterminCount = (ghostId: number) =>
  useRecoilValue(determinCountStore(ghostId));

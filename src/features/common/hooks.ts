import { useRecoilValue, useRecoilState } from "recoil";
import {
  evidenceListStore,
  conditionsStore,
  ghostsStore,
  evidenceConditionsStore,
  determinCountStore,
} from "@/features/common/stores";

export const useEvidenceList = () => useRecoilValue(evidenceListStore);

export const useConditions = () => useRecoilValue(conditionsStore);

export const useGhosts = () => useRecoilValue(ghostsStore);

export const useEvidenceConditions = () => {
  const [evidenceConditions, setConditionPerEvidence] = useRecoilState(
    evidenceConditionsStore,
  );
  return { evidenceConditions, setConditionPerEvidence };
};

export const useDeterminCount = (ghostId: number) =>
  useRecoilValue(determinCountStore(ghostId));

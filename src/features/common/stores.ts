import { atom, selector, selectorFamily } from "recoil";
import {
  getEvidenceList,
  getConditions,
  getGhosts,
  getEvidenceConditions,
} from "@/features/common/apis";

export interface Evidence {
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
  evidenceList: Evidence[];
}

export interface EvidenceCondition {
  evidence: Evidence;
  condition: Condition;
}

export const evidenceListStore = atom<Evidence[]>({
  key: "evidenceListStore",
  default: selector({
    key: "evidenceListStoreAsync",
    get: async () => await getEvidenceList(),
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

export const evidenceConditionsStore = atom<EvidenceCondition[]>({
  key: "evidenceConditionsStore",
  default: selector({
    key: "evidenceConditionsStoreAsync",
    get: async () => await getEvidenceConditions(),
  }),
});

export const determinCountStore = selectorFamily<number, number>({
  key: "determinCountStore",
  get: ghostId => {
    // istanbul ignore next
    return ({ get }) => {
      const evidenceConditions = get(evidenceConditionsStore);
      const ghosts = get(ghostsStore);
      const determinEvidenceIds = evidenceConditions
        .filter(o => o.condition.id === 1)
        .map(o => o.evidence.id);

      return ghosts
        .filter(o => o.id === ghostId)
        .flatMap(o => o.evidenceList)
        .filter(o => determinEvidenceIds.includes(o.id)).length;
    };
  },
});

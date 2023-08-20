import evidenceListjson from "@/database/evidenceList.json";
import conditionsjson from "@/database/conditions.json";
import ghostsjson from "@/database/ghosts.json";
import type {
  Evidence,
  Condition,
  Ghost,
  EvidenceCondition,
} from "@/features/common/stores";

export const getEvidenceList = () => {
  return new Promise<Evidence[]>(resolve => {
    resolve(evidenceListjson);
  });
};

export const getEvidence = (id: number) => {
  const evidence = evidenceListjson
    .map<Evidence>(o => o)
    .find(o => o.id === id);

  if (evidence === undefined) {
    throw new Error();
  }

  return evidence;
};

export const getConditions = () => {
  return new Promise<Condition[]>(resolve => {
    resolve(conditionsjson);
  });
};

export const getGhosts = async () => {
  const ghosts = ghostsjson.map<Promise<Ghost>>(async ghost => {
    const evidenceList = ghost.evidenceIds.map(evidenceId =>
      getEvidence(evidenceId),
    );
    return {
      id: ghost.id,
      name: ghost.name,
      evidenceList: await Promise.all(evidenceList),
    };
  });

  return await Promise.all(ghosts);
};

export const getEvidenceConditions = async () => {
  const evidenceList = await getEvidenceList();
  const conditions = await getConditions();

  return evidenceList.map<EvidenceCondition>(evidence => ({
    evidence,
    condition: conditions[0],
  }));
};

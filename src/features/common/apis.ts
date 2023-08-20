import evidenceListjson from "@/database/evidenceList.json";
import conditionsjson from "@/database/conditions.json";
import ghostEvidenceListjson from "@/database/ghostEvidenceList.json";
import ghostsjson from "@/database/ghosts.json";
import type {
  Evidence,
  Condition,
  Ghost,
  EvidenceCondition,
  GhostEvidenceList,
} from "@/features/common/stores";

export const getEvidenceList = () => {
  return new Promise<Evidence[]>(resolve => {
    resolve(evidenceListjson);
  });
};

export const getEvidence = async (id: number) => {
  const evidenceList = await getEvidenceList();
  const evidence = evidenceList.map(o => o).find(o => o.id === id);

  if (!evidence) {
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
  const ghostEvidenceList = await getGhostEvidenceList();
  const ghosts = ghostsjson.map<Promise<Ghost>>(async ghost => {
    const evidenceList = ghostEvidenceList
      .find(o => o.ghostId === ghost.id)!
      .evidenceIds.map(evidenceId => getEvidence(evidenceId));

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

export const getGhostEvidenceList = async () => {
  return new Promise<GhostEvidenceList[]>(resolve => {
    resolve(ghostEvidenceListjson);
  });
};

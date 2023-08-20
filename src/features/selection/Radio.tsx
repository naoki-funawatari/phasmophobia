import {
  useEvidenceList,
  useConditions,
  useEvidenceConditions,
} from "@/features/common/hooks";

export default function Radio({
  evidenceId,
  conditionId,
}: {
  evidenceId: number;
  conditionId: number;
}) {
  const evidenceList = useEvidenceList();
  const conditions = useConditions();
  const { evidenceConditions, setConditionPerEvidence } =
    useEvidenceConditions();

  const isDetermin = () => {
    return !!evidenceConditions
      .filter(o => o.evidence.id === evidenceId)
      .filter(o => o.condition.id === conditionId).length;
  };

  const handleEvidenceClicked = () => {
    const newEvidence = evidenceList.find(o => o.id === evidenceId);
    const newCondition = conditions.find(o => o.id === conditionId);
    const newevidenceConditions = evidenceConditions.map(o =>
      newEvidence && newCondition && o.evidence.id === evidenceId
        ? { evidence: newEvidence, condition: newCondition }
        : o,
    );

    setConditionPerEvidence(newevidenceConditions);
  };

  return (
    <label>
      <input
        type="radio"
        name={`evidence-table-data-${evidenceId}`}
        checked={isDetermin()}
        onChange={handleEvidenceClicked}
      />
      {`${isDetermin()}`}
    </label>
  );
}

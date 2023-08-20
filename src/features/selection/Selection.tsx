import { useEvidenceList, useConditions } from "@/features/common/hooks";
import Radio from "@/features/selection/Radio";

export default function Selection() {
  const evidenceList = useEvidenceList();
  const conditions = useConditions();

  return (
    <header>
      <div className="table">
        <div className="row">
          <div className="condition-name"></div>
          {evidenceList.map(evidence => (
            <div
              className="header evidence-name"
              key={`evidence-table-header-${evidence.id}`}
            >
              <div>{evidence.name}</div>
            </div>
          ))}
        </div>
        {conditions.map((condition, i) => (
          <div className="row">
            <div className="header align-left condition-name">
              {condition.name}
            </div>
            {evidenceList.map(evidence => (
              <div
                className="evidence-name"
                key={`evidence-table-data-${condition.id}-${i}-${evidence.id}`}
              >
                <Radio evidenceId={evidence.id} conditionId={condition.id} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </header>
  );
}

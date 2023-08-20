import { useEvidenceList, useConditions } from "@/features/common/hooks";
import Radio from "@/features/selection/Radio";

export default function Selection() {
  const evidenceList = useEvidenceList();
  const conditions = useConditions();

  return (
    <header>
      <table>
        <thead>
          <tr>
            <th></th>
            {evidenceList.map(evidence => (
              <th key={`evidence-table-header-${evidence.id}`}>
                <div className="evidence-name">{evidence.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {conditions.map((condition, i) => (
            <tr key={`evidence-table-data-${condition.id}-${i}`}>
              <th className="align-left condition-name">{condition.name}</th>
              {evidenceList.map(evidence => (
                <td
                  key={`evidence-table-data-${condition.id}-${i}-${evidence.id}`}
                >
                  <Radio evidenceId={evidence.id} conditionId={condition.id} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </header>
  );
}

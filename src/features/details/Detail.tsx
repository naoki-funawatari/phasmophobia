import { Ghost } from "@/features/common/stores";
import {
  useEvidenceConditions,
  useDeterminCount,
} from "@/features/common/hooks";

const colors = ["", "#ffffc1", "#ffe0c1", "#ffc1c1", "#c1e0ff"];

export default function Detail({
  ghost,
  index,
}: {
  ghost: Ghost;
  index: number;
}) {
  const { id, name, evidenceList } = ghost;
  const determinCount = useDeterminCount(id);
  const { evidenceConditions } = useEvidenceConditions();

  // istanbul ignore next
  const getEvidenceName = (evidenceId: number) => {
    return evidenceList.find(o => o.id === evidenceId)?.name;
  };

  // istanbul ignore next
  const isSelected = (evidenceId: number) => {
    return !!evidenceConditions
      .filter(o => ghost.evidenceList.map(o => o.id).includes(o.evidence.id))
      .filter(o => o.evidence.id === evidenceId)
      .filter(o => o.condition.id === 1).length;
  };

  // istanbul ignore next
  const hasExcluded = () => {
    return !!evidenceConditions
      .filter(o => evidenceList.map(p => p.id).includes(o.evidence.id))
      .filter(o => o.condition.id === 2).length;
  };

  // istanbul ignore next
  const countColor = hasExcluded() ? colors[4] : colors[determinCount];

  return (
    <tr>
      <th className="align-left ghost-name">{name}</th>
      {evidenceList.map(evidence => (
        <td
          key={`ghost-table-data-${id}-${index}-${evidence.id}`}
          id={`ghost-table-data-${id}-${index}-${evidence.id}`}
          style={{
            backgroundColor: isSelected(evidence.id) ? "#ffffc1" : "white",
          }}
        >
          {getEvidenceName(evidence.id)}
        </td>
      ))}
      <td className="count" style={{ backgroundColor: countColor }}>
        {determinCount}
      </td>
    </tr>
  );
}

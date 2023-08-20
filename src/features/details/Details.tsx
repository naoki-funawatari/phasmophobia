import { Scrollbars } from "react-custom-scrollbars";
import { useGhosts, useEvidenceConditions } from "@/features/common/hooks";
import Detail from "@/features/details/Detail";

export default function Details() {
  const ghosts = useGhosts();
  const { evidenceConditions } = useEvidenceConditions();
  const selectedIds = evidenceConditions
    .filter(o => o.condition.id === 1)
    .map(o => o.evidence.id);
  // istanbul ignore next;
  const excludedIds = evidenceConditions
    .filter(o => o.condition.id === 2)
    .map(o => o.evidence.id);
  const sortedGhosts = [...ghosts];

  sortedGhosts.sort((a, b) => {
    const evidenceIdsA = a.evidenceList.map(p => p.id);
    const evidenceIdsB = b.evidenceList.map(p => p.id);
    const selectedIdsA = evidenceIdsA.filter(id => selectedIds.includes(id));
    const selectedIdsB = evidenceIdsB.filter(id => selectedIds.includes(id));
    return selectedIdsB.length - selectedIdsA.length;
  });

  sortedGhosts.sort((a, b) => {
    const evidenceIdsA = a.evidenceList.map(p => p.id);
    const evidenceIdsB = b.evidenceList.map(p => p.id);
    const excludedIdsA = evidenceIdsA.filter(p => excludedIds.includes(p));
    const excludedIdsB = evidenceIdsB.filter(p => excludedIds.includes(p));
    return excludedIdsA.length - excludedIdsB.length;
  });

  return (
    <main>
      <Scrollbars height="100%" universal>
        <div className="table">
          <div className="row">
            <div className="header align-center ghost-name"></div>
            <div className="header align-center determin-name">証拠①</div>
            <div className="header align-center determin-name">証拠②</div>
            <div className="header align-center determin-name">証拠③</div>
            <div className="header align-center count">カウント</div>
          </div>
          <>
            {sortedGhosts.map((ghost, index) => (
              <Detail
                key={`ghost-table-data-${ghost.id}-${index}`}
                {...{ ghost, index }}
              />
            ))}
          </>
        </div>
      </Scrollbars>
    </main>
  );
}

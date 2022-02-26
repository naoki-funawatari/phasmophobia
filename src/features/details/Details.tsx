import { useGhosts, useItemConditions } from "@/features/common/hooks";
import Detail from "@/features/details/Detail";

export default function Details() {
  const ghosts = useGhosts();
  const { itemConditions } = useItemConditions();
  const selectedIds = itemConditions
    .filter(o => o.condition.id === 1)
    .map(o => o.item.id);
  const excludedIds = itemConditions
    .filter(o => o.condition.id === 2)
    .map(o => o.item.id);
  const sortedGhosts = [...ghosts];

  sortedGhosts.sort((a, b) => {
    const itemIdsA = a.items.map(p => p.id);
    const itemIdsB = b.items.map(p => p.id);
    const selectedIdsA = itemIdsA.filter(id => selectedIds.includes(id));
    const selectedIdsB = itemIdsB.filter(id => selectedIds.includes(id));
    return selectedIdsB.length - selectedIdsA.length;
  });

  sortedGhosts.sort((a, b) => {
    const itemIdsA = a.items.map(p => p.id);
    const itemIdsB = b.items.map(p => p.id);
    const excludedIdsA = itemIdsA.filter(p => excludedIds.includes(p));
    const excludedIdsB = itemIdsB.filter(p => excludedIds.includes(p));
    return excludedIdsA.length - excludedIdsB.length;
  });

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <div className="determin-name">証拠①</div>
            </th>
            <th>
              <div className="determin-name">証拠②</div>
            </th>
            <th>
              <div className="determin-name">証拠③</div>
            </th>
            <th>カウント</th>
          </tr>
        </thead>
        <tbody>
          {sortedGhosts.map((ghost, index) => (
            <Detail
              key={`ghost-table-data-${ghost.id}-${index}`}
              {...{ ghost, index }}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}

import { useItems, useGhosts } from "@/features/common/hooks";
import Detail from "@/features/details/Detail";

export default function Details() {
  const items = useItems();
  const ghosts = useGhosts();

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th></th>
            {items.map(item => (
              <th key={`ghost-table-header-${item.id}`}>{item.name}</th>
            ))}
            <th>カウント</th>
          </tr>
        </thead>
        <tbody>
          {ghosts.map((ghost, index) => (
            <Detail
              key={`ghost-table-data-${ghost.id}-${index}`}
              {...{ id: ghost.id, name: ghost.name, index }}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}

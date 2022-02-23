import { useGhosts } from "@/features/common/hooks";
import Detail from "@/features/details/Detail";

export default function Details() {
  const ghosts = useGhosts();

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
          {ghosts.map((ghost, index) => (
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

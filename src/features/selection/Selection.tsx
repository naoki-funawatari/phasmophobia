import { useItems, useConditions } from "@/features/common/hooks";
import Radio from "@/features/selection/Radio";

export default function Selection() {
  const items = useItems();
  const conditions = useConditions();

  return (
    <header>
      <table>
        <thead>
          <tr>
            <th></th>
            {items.map(item => (
              <th key={`evidence-table-header-${item.id}`}>
                <div className="item-name">{item.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {conditions.map((condition, i) => (
            <tr key={`evidence-table-data-${condition.id}-${i}`}>
              <th className="align-left condition-name">{condition.name}</th>
              {items.map(item => (
                <td key={`evidence-table-data-${condition.id}-${i}-${item.id}`}>
                  <Radio itemId={item.id} conditionId={condition.id} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </header>
  );
}

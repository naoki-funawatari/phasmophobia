import { Ghost } from "@/features/common/stores";
import { useItemConditions, useDeterminCount } from "@/features/common/hooks";

const colors = ["", "#ffffc1", "#ffe0c1", "#ffc1c1", "#c1e0ff"];

export default function Detail({
  ghost,
  index,
}: {
  ghost: Ghost;
  index: number;
}) {
  const { id, name, items } = ghost;
  const determinCount = useDeterminCount(id);
  const { itemConditions } = useItemConditions();

  // istanbul ignore next
  const getItemName = (itemId: number) => {
    return items.find(o => o.id === itemId)?.name;
  };

  // istanbul ignore next
  const isSelected = (itemId: number) => {
    return !!itemConditions
      .filter(o => ghost.items.map(o => o.id).includes(o.item.id))
      .filter(o => o.item.id === itemId)
      .filter(o => o.condition.id === 1).length;
  };

  // istanbul ignore next
  const hasExcluded = () => {
    return !!itemConditions
      .filter(o => items.map(p => p.id).includes(o.item.id))
      .filter(o => o.condition.id === 2).length;
  };

  // istanbul ignore next
  const countColor = hasExcluded() ? colors[4] : colors[determinCount];

  return (
    <tr>
      <th className="align-left ghost-name">{name}</th>
      {items.map(item => (
        <td
          key={`ghost-table-data-${id}-${index}-${item.id}`}
          id={`ghost-table-data-${id}-${index}-${item.id}`}
          style={{ backgroundColor: isSelected(item.id) ? "#ffffc1" : "white" }}
        >
          {getItemName(item.id)}
        </td>
      ))}
      <td className="count" style={{ backgroundColor: countColor }}>
        {determinCount}
      </td>
    </tr>
  );
}

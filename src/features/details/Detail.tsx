import { Ghost } from "@/features/common/stores";
import {
  useItems,
  useConditionPerItem,
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
  const { id, name, itemIds } = ghost;
  const determinCount = useDeterminCount(id);
  const items = useItems();
  const { conditionPerItem } = useConditionPerItem();

  // istanbul ignore next
  const getItemName = (itemId: number) => {
    return items.find(o => o.id === itemId)?.name;
  };

  // istanbul ignore next
  const isSelected = (itemId: number) => {
    return !!conditionPerItem
      .filter(o => ghost.itemIds.includes(o.item.id))
      .filter(o => o.item.id === itemId)
      .filter(o => o.condition.id === 1).length;
  };

  // istanbul ignore next
  const hasExcluded = () => {
    return !!conditionPerItem
      .filter(o => itemIds.includes(o.item.id))
      .filter(o => o.condition.id === 2).length;
  };

  // istanbul ignore next
  const countColor = hasExcluded() ? colors[4] : colors[determinCount];

  return (
    <tr>
      <th className="align-left ghost-name">{name}</th>
      {itemIds.map(itemId => (
        <td
          key={`ghost-table-data-${id}-${index}-${itemId}`}
          style={{ backgroundColor: isSelected(itemId) ? "#ffffc1" : "white" }}
        >
          {getItemName(itemId)}
        </td>
      ))}
      <td className="count" style={{ backgroundColor: countColor }}>
        {determinCount}
      </td>
    </tr>
  );
}

import {
  useItems,
  useGhosts,
  useConditionPerItem,
  useDeterminCount,
} from "@/features/common/hooks";

const colors = ["", "#ffffc1", "#ffe0c1", "#ffc1c1", "#c1e0ff"];

export default function Detail({
  id,
  name,
  index,
}: {
  id: number;
  name: string;
  index: number;
}) {
  const determinCount = useDeterminCount(id);
  const items = useItems();
  const ghosts = useGhosts();
  const { conditionPerItem } = useConditionPerItem();

  // istanbul ignore next
  const getConditionName = (itemId: number) => {
    const hasItem = ghosts
      .filter(o => o.id === id)
      .flatMap(o => o.itemIds)
      .includes(itemId);
    const conditionName =
      conditionPerItem.find(o => o.item.id === itemId)?.condition.name ?? "";
    return hasItem ? conditionName : "-";
  };

  // istanbul ignore next
  const hasExcluded = () => {
    const itemIds = ghosts.filter(o => o.id === id).flatMap(o => o.itemIds);
    return !!conditionPerItem
      .filter(o => itemIds.includes(o.item.id))
      .filter(o => o.condition.id === 2).length;
  };

  // istanbul ignore next
  const color = hasExcluded() ? colors[4] : colors[determinCount];

  return (
    <tr style={{ backgroundColor: color }}>
      <th className="align-left ghost-name">{name}</th>
      {items.map(item => (
        <td key={`ghost-table-data-${id}-${index}-${item.id}`}>
          <label>{`${getConditionName(item.id)}`}</label>
        </td>
      ))}
      <td className="count">{determinCount}</td>
    </tr>
  );
}

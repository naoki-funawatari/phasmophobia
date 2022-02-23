import {
  useItems,
  useGhosts,
  useConditionPerItem,
  useDeterminCount,
} from "@/features/common/hooks";

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
  const getConditionName = (ghostId: number, itemId: number) => {
    const hasItem = ghosts
      .filter(o => o.id === ghostId)
      .flatMap(o => o.itemIds)
      .includes(itemId);
    const conditionName =
      conditionPerItem.find(o => o.item.id === itemId)?.condition.name ?? "";
    return hasItem ? conditionName : "-";
  };

  return (
    <tr>
      <th className="align-left ghost-name">{name}</th>
      {items.map(item => (
        <td key={`ghost-table-data-${id}-${index}-${item.id}`}>
          <label>{`${getConditionName(id, item.id)}`}</label>
        </td>
      ))}
      <td className="count">{determinCount}</td>
    </tr>
  );
}

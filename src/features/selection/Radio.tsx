import {
  useItems,
  useConditions,
  useItemConditions,
} from "@/features/common/hooks";

export default function Radio({
  itemId,
  conditionId,
}: {
  itemId: number;
  conditionId: number;
}) {
  const items = useItems();
  const conditions = useConditions();
  const { itemConditions, setConditionPerItem } = useItemConditions();

  const isDetermin = () => {
    return !!itemConditions
      .filter(o => o.item.id === itemId)
      .filter(o => o.condition.id === conditionId).length;
  };

  const handleEvidenceClicked = () => {
    const newItem = items.find(o => o.id === itemId);
    const newCondition = conditions.find(o => o.id === conditionId);
    const newitemConditions = itemConditions.map(o =>
      newItem && newCondition && o.item.id === itemId
        ? { item: newItem, condition: newCondition }
        : o
    );

    setConditionPerItem(newitemConditions);
  };

  return (
    <label>
      <input
        type="radio"
        name={`evidence-table-data-${itemId}`}
        checked={isDetermin()}
        onChange={handleEvidenceClicked}
      />
      {`${isDetermin()}`}
    </label>
  );
}

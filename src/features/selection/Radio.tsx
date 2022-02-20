import { useItems, useConditions, useConditionPerItem } from "@/features/hooks/hooks";

export default function Radio({ itemId, conditionId }: { itemId: number; conditionId: number }) {
  const items = useItems();
  const conditions = useConditions();
  const { conditionPerItem, setConditionPerItem } = useConditionPerItem();

  const isDetermin = () => {
    return !!conditionPerItem
      .filter(o => o.item.id === itemId)
      .filter(o => o.condition.id === conditionId).length;
  };

  const handleEvidenceClicked = () => {
    const newItem = items.find(o => o.id === itemId);
    const newCondition = conditions.find(o => o.id === conditionId);
    const newconditionPerItem = conditionPerItem.map(o =>
      newItem && newCondition && o.item.id === itemId
        ? { item: newItem, condition: newCondition }
        : o
    );

    setConditionPerItem(newconditionPerItem);
  };

  return (
    <label>
      {`${isDetermin()}`}
      <input
        type="radio"
        name={`evidence-table-data-${itemId}`}
        checked={isDetermin()}
        onChange={handleEvidenceClicked}
      />
    </label>
  );
}

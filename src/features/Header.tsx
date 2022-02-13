import { useRecoilValue, useRecoilState } from "recoil";
import { itemsStore, conditionsStore, itemConditionsStore, ItemCondition } from "@/stores/stores";

export default function Header() {
  const items = useRecoilValue(itemsStore);
  const conditions = useRecoilValue(conditionsStore);
  const [conditionPerItem, setConditionPerItem] = useRecoilState(itemConditionsStore);

  const isDetermin = (itemId: number, conditionId: number) => {
    return !!conditionPerItem
      .filter(o => o.item.id === itemId)
      .filter(o => o.condition.id === conditionId).length;
  };

  const handleEvidenceClicked = (itemId: number, conditionId: number) => () => {
    const newItem = items.find(o => o.id === itemId);
    const newCondition = conditions.find(o => o.id === conditionId);
    const newconditionPerItem = conditionPerItem.map<ItemCondition>(o =>
      newItem && newCondition && o.item.id === itemId
        ? { item: newItem, condition: newCondition }
        : o
    );

    setConditionPerItem(newconditionPerItem);
  };

  return (
    <header>
      <table>
        <thead>
          <tr>
            <th></th>
            {items.map(item => (
              <th key={`evidence-table-header-${item.id}`}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {conditions.map((condition, i) => (
            <tr key={`evidence-table-data-${condition.id}-${i}`}>
              <td>{condition.name}</td>
              {items.map(item => (
                <td key={`evidence-table-data-${condition.id}-${i}-${item.id}`}>
                  <label>
                    {`${isDetermin(item.id, condition.id)}`}
                    <input
                      type="radio"
                      name={`evidence-table-data-${item.id}`}
                      checked={isDetermin(item.id, condition.id)}
                      onChange={handleEvidenceClicked(item.id, condition.id)}
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </header>
  );
}

import { useRecoilValue, useRecoilState } from "recoil";
import {
  itemsStore,
  conditionsStore,
  ghostsStore,
  itemConditionsStore,
  ItemCondition,
} from "@/stores/stores";

export default function App() {
  const items = useRecoilValue(itemsStore);
  const conditions = useRecoilValue(conditionsStore);
  const ghosts = useRecoilValue(ghostsStore);
  const [conditionPerItem, setConditionPerItem] = useRecoilState(itemConditionsStore);

  const isDetermin = (itemId: number, conditionId: number) => {
    return !!conditionPerItem
      .filter(o => o.item.id === itemId)
      .filter(o => o.condition.id === conditionId).length;
  };

  const getConditionName = (ghostId: number, itemId: number) => {
    const hasItem = ghosts
      .filter(o => o.id === ghostId)
      .flatMap(o => o.itemIds)
      .includes(itemId);
    const conditionName = conditionPerItem.find(o => o.item.id === itemId)?.condition.name ?? "";
    return hasItem ? conditionName : "-";
  };

  const getDeterminCount = (ghostId: number) => {
    const determinItemIds = conditionPerItem.filter(o => o.condition.id === 1).map(o => o.item.id);
    return ghosts
      .filter(o => o.id === ghostId)
      .flatMap(o => o.itemIds)
      .filter(o => determinItemIds.includes(o)).length;
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
    <>
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
      <hr />
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
            {ghosts.map((ghost, i) => (
              <tr key={`ghost-table-data-${ghost.id}-${i}`}>
                <td>{ghost.name}</td>
                {items.map(item => (
                  <td key={`ghost-table-data-${ghost.id}-${i}-${item.id}`}>
                    <label>{`${getConditionName(ghost.id, item.id)}`}</label>
                  </td>
                ))}
                <td>{getDeterminCount(ghost.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

import { useRecoilValue } from "recoil";
import { itemsStore, ghostsStore, itemConditionsStore } from "@/stores/stores";

export default function Main() {
  const items = useRecoilValue(itemsStore);
  const ghosts = useRecoilValue(ghostsStore);
  const conditionPerItem = useRecoilValue(itemConditionsStore);

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

  return (
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
  );
}

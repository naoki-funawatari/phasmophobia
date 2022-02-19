import { shallow } from "enzyme";
import Radio from "@/features/selection/Radio";
import { Item, Condition, ItemCondition } from "@/stores/stores";
import { useItems, useConditions, useConditionPerItem } from "@/features/hooks/hooks";

jest.mock("recoil");
jest.mock("@/features/hooks/hooks");

const mockUseItems = useItems as jest.Mock;
const mockUseConditions = useConditions as jest.Mock;
const mockUseConditionPerItem = useConditionPerItem as jest.Mock;

describe("Mount Radio.", () => {
  beforeEach(() => {
    mockUseItems.mockImplementation(() => mockItems);
    mockUseConditions.mockImplementation(() => mockConditions);
    mockUseConditionPerItem.mockImplementation(() => ({
      conditionPerItem: mockItemConditions,
      setConditionPerItem: () => {},
    }));
  });

  test("Mount Radio.", () => {
    const render = shallow(<Radio itemId={1} conditionId={1} />);
    const element = render.find("input[type='radio']");
    element.first().simulate("click");
  });
});

const mockItems = [
  {
    id: 0,
    name: "EMFレベル5",
  },
  {
    id: 1,
    name: "ゴーストオーブ",
  },
  {
    id: 2,
    name: "スピリットボックス",
  },
] as Item[];

const mockConditions = [
  {
    id: 0,
    value: "undetermined",
    name: "未確定",
  },
  {
    id: 1,
    value: "determined",
    name: "確定",
  },
  {
    id: 2,
    value: "exclued",
    name: "除外",
  },
] as Condition[];

const mockItemConditions = mockItems.map<ItemCondition>(item => ({
  item,
  condition: mockConditions[0],
}));

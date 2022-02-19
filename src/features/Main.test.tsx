import { shallow } from "enzyme";
import Main from "@/features/Main";
import { Item, Condition, Ghost, ItemCondition } from "@/stores/stores";
import { useItems, useConditions, useGhosts, useConditionPerItem } from "@/features/hooks/hooks";

jest.mock("recoil");
jest.mock("@/features/hooks/hooks");

const mockUseItems = useItems as jest.Mock;
const mockUseConditions = useConditions as jest.Mock;
const mockUseGhosts = useGhosts as jest.Mock;
const mockUseConditionPerItem = useConditionPerItem as jest.Mock;

describe("Mount Main.", () => {
  beforeEach(() => {
    mockUseItems.mockImplementation(() => mockItems);
    mockUseConditions.mockImplementation(() => mockConditions);
    mockUseGhosts.mockImplementation(() => mockGhosts);
    mockUseConditionPerItem.mockImplementation(() => ({
      conditionPerItem: mockItemConditions,
      setConditionPerItem: () => {},
    }));
  });

  test("Mount Main.", () => {
    shallow(<Main />);
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

const mockGhosts = [
  {
    id: 0,
    name: "スピリット",
    itemIds: [0, 2, 5],
  },
  {
    id: 1,
    name: "レイス",
    itemIds: [0, 2, 6],
  },
  {
    id: 2,
    name: "シェード",
    itemIds: [0, 3, 5],
  },
] as Ghost[];

const mockItemConditions = mockItems.map<ItemCondition>(item => ({
  item,
  condition: mockConditions[0],
}));

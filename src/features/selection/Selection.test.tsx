import { shallow } from "enzyme";
import Selection from "@/features/selection/Selection";
import { Item, Condition } from "@/stores/stores";
import { useItems, useConditions } from "@/features/hooks/hooks";

jest.mock("recoil");
jest.mock("@/features/hooks/hooks");

const mockUseItems = useItems as jest.Mock;
const mockUseConditions = useConditions as jest.Mock;

describe("Mount Selection.", () => {
  beforeEach(() => {
    mockUseItems.mockImplementation(() => mockItems);
    mockUseConditions.mockImplementation(() => mockConditions);
  });

  test("Mount Selection.", () => {
    shallow(<Selection />);
    expect(mockUseItems).toBeCalledTimes(1);
    expect(mockUseConditions).toBeCalledTimes(1);
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

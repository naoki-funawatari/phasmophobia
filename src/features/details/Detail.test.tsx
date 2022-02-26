import { shallow } from "enzyme";
import Detail from "@/features/details/Detail";
import { ItemCondition } from "@/features/common/stores";
import { useConditionPerItem } from "@/features/common/hooks";

jest.mock("recoil");
jest.mock("@/features/common/hooks");

const mockUseConditionPerItem = useConditionPerItem as jest.Mock;

describe("Mount Detail.", () => {
  beforeEach(() => {
    mockUseConditionPerItem.mockImplementation(() => ({
      conditionPerItem: mockItemConditions,
      setConditionPerItem: () => {},
    }));
  });

  test("Mount Detail.", () => {
    const ghost = {
      id: 0,
      name: "スピリット",
      items: [
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
      ],
    };
    const result = shallow(<Detail {...{ ghost, index: 1 }} />);
    const style1 = result.find("#ghost-table-data-0-1-0").props().style;
    expect(style1?.["backgroundColor"]).toEqual("white");
    const style2 = result.find("#ghost-table-data-0-1-1").props().style;
    expect(style2?.["backgroundColor"]).toBe("#ffffc1");
  });
});

const mockItemConditions: ItemCondition[] = [
  {
    item: {
      id: 0,
      name: "EMFレベル5",
    },
    condition: {
      id: 0,
      value: "undetermined",
      name: "未確定",
    },
  },
  {
    item: {
      id: 1,
      name: "ゴーストオーブ",
    },
    condition: {
      id: 1,
      value: "determined",
      name: "確定",
    },
  },
  {
    item: {
      id: 2,
      name: "スピリットボックス",
    },
    condition: {
      id: 0,
      value: "undetermined",
      name: "未確定",
    },
  },
];

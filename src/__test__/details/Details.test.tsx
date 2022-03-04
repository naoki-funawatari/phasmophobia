import { shallow } from "enzyme";
import Details from "@/features/details/Details";
import { Ghost, ItemCondition } from "@/features/common/stores";
import { useGhosts, useItemConditions } from "@/features/common/hooks";

jest.mock("recoil");
jest.mock("@/features/common/hooks");

const mockUseGhosts = useGhosts as jest.Mock;
const mockUseItemConditions = useItemConditions as jest.Mock;

describe("Mount Details.", () => {
  beforeEach(() => {
    mockUseGhosts.mockImplementation(() => mockGhosts);
    mockUseItemConditions.mockImplementation(() => ({
      itemConditions: mockItemConditions,
    }));
  });

  test("Mount Details.", () => {
    shallow(<Details />);
    expect(mockUseGhosts).toBeCalledTimes(1);
    expect(mockUseItemConditions).toBeCalledTimes(1);
  });
});

const mockGhosts = [
  {
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
  },
  {
    id: 1,
    name: "レイス",
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
  },
  {
    id: 2,
    name: "シェード",
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
  },
] as Ghost[];

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

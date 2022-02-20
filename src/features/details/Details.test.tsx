import { shallow } from "enzyme";
import Details from "@/features/details/Details";
import { Item, Ghost } from "@/features/common/stores";
import { useItems, useGhosts } from "@/features/common/hooks";

jest.mock("recoil");
jest.mock("@/features/common/hooks");

const mockUseItems = useItems as jest.Mock;
const mockUseGhosts = useGhosts as jest.Mock;

describe("Mount Details.", () => {
  beforeEach(() => {
    mockUseItems.mockImplementation(() => mockItems);
    mockUseGhosts.mockImplementation(() => mockGhosts);
  });

  test("Mount Details.", () => {
    shallow(<Details />);
    expect(mockUseItems).toBeCalledTimes(1);
    expect(mockUseGhosts).toBeCalledTimes(1);
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

import { shallow } from "enzyme";
import Details from "@/features/details/Details";
import { Ghost } from "@/features/common/stores";
import { useGhosts } from "@/features/common/hooks";

jest.mock("recoil");
jest.mock("@/features/common/hooks");

const mockUseGhosts = useGhosts as jest.Mock;

describe("Mount Details.", () => {
  beforeEach(() => {
    mockUseGhosts.mockImplementation(() => mockGhosts);
  });

  test("Mount Details.", () => {
    shallow(<Details />);
    expect(mockUseGhosts).toBeCalledTimes(1);
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

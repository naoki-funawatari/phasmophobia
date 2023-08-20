import { shallow } from "enzyme";
import Details from "@/features/details/Details";
import { Ghost, EvidenceCondition } from "@/features/common/stores";
import { useGhosts, useEvidenceConditions } from "@/features/common/hooks";

jest.mock("recoil");
jest.mock("@/features/common/hooks");

const mockUseGhosts = useGhosts as jest.Mock;
const mockUseEvidenceConditions = useEvidenceConditions as jest.Mock;

describe("Mount Details.", () => {
  beforeEach(() => {
    mockUseGhosts.mockImplementation(() => mockGhosts);
    mockUseEvidenceConditions.mockImplementation(() => ({
      evidenceConditions: mockEvidenceConditions,
    }));
  });

  test("Mount Details.", () => {
    shallow(<Details />);
    expect(mockUseGhosts).toBeCalledTimes(1);
    expect(mockUseEvidenceConditions).toBeCalledTimes(1);
  });
});

const mockGhosts = [
  {
    id: 0,
    name: "スピリット",
    evidenceList: [
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
    evidenceList: [
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
    evidenceList: [
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

const mockEvidenceConditions: EvidenceCondition[] = [
  {
    evidence: {
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
    evidence: {
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
    evidence: {
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

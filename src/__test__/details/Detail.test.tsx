import { shallow } from "enzyme";
import Detail from "@/features/details/Detail";
import { EvidenceCondition } from "@/features/common/stores";
import { useEvidenceConditions } from "@/features/common/hooks";

jest.mock("recoil");
jest.mock("@/features/common/hooks");

const mockUseConditionPerEvidence = useEvidenceConditions as jest.Mock;

describe("Mount Detail.", () => {
  beforeEach(() => {
    mockUseConditionPerEvidence.mockImplementation(() => ({
      evidenceConditions: mockEvidenceConditions,
      setConditionPerEvidence: () => {},
    }));
  });

  test("Mount Detail.", () => {
    const ghost = {
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
    };
    const result = shallow(<Detail {...{ ghost, index: 1 }} />);
    const style1 = result.find("#ghost-table-data-0-1-0").props().style;
    expect(style1?.["backgroundColor"]).toEqual("white");
    const style2 = result.find("#ghost-table-data-0-1-1").props().style;
    expect(style2?.["backgroundColor"]).toBe("#ffffc1");
  });
});

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

import { shallow } from "enzyme";
import Radio from "@/features/selection/Radio";
import {
  Evidence,
  Condition,
  EvidenceCondition,
} from "@/features/common/stores";
import {
  useEvidenceList,
  useConditions,
  useEvidenceConditions,
} from "@/features/common/hooks";

jest.mock("recoil");
jest.mock("@/features/common/hooks");

const mockUseEvidenceList = useEvidenceList as jest.Mock;
const mockUseConditions = useConditions as jest.Mock;
const mockUseConditionPerEvidence = useEvidenceConditions as jest.Mock;

describe("Mount Radio.", () => {
  const setConditionPerEvidence = jest.fn();

  beforeEach(() => {
    mockUseEvidenceList.mockImplementation(() => mockEvidenceList);
    mockUseConditions.mockImplementation(() => mockConditions);
    mockUseConditionPerEvidence.mockImplementation(() => ({
      evidenceConditions: mockEvidenceConditions,
      setConditionPerEvidence,
    }));
  });

  test("Mount Radio.", () => {
    shallow(<Radio evidenceId={1} conditionId={1} />);
    expect(mockUseEvidenceList).toBeCalledTimes(1);
    expect(mockUseConditions).toBeCalledTimes(1);
    expect(mockUseConditionPerEvidence).toBeCalledTimes(1);
  });

  test("Change Radio.", () => {
    const render = shallow(<Radio evidenceId={1} conditionId={1} />);
    const element = render.find("input[type='radio']");
    element.first().simulate("change");
    expect(setConditionPerEvidence).toBeCalledTimes(1);
  });
});

const mockEvidenceList = [
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
] as Evidence[];

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

const mockEvidenceConditions = mockEvidenceList.map<EvidenceCondition>(
  evidence => ({
    evidence,
    condition: mockConditions[0],
  }),
);

import { shallow } from "enzyme";
import Selection from "@/features/selection/Selection";
import { Evidence, Condition } from "@/features/common/stores";
import { useEvidenceList, useConditions } from "@/features/common/hooks";

jest.mock("recoil");
jest.mock("@/features/common/hooks");

const mockUseEvidenceList = useEvidenceList as jest.Mock;
const mockUseConditions = useConditions as jest.Mock;

describe("Mount Selection.", () => {
  beforeEach(() => {
    mockUseEvidenceList.mockImplementation(() => mockEvidenceList);
    mockUseConditions.mockImplementation(() => mockConditions);
  });

  test("Mount Selection.", () => {
    shallow(<Selection />);
    expect(mockUseEvidenceList).toBeCalledTimes(1);
    expect(mockUseConditions).toBeCalledTimes(1);
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

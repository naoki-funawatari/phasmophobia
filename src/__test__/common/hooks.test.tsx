import { useRecoilValue, useRecoilState } from "recoil";
import {
  useEvidenceList,
  useConditions,
  useGhosts,
  useEvidenceConditions,
  useDeterminCount,
} from "@/features/common/hooks";

const mockUseRecoilValue = useRecoilValue as jest.Mock;
const mockUseRecoilState = useRecoilState as jest.Mock;

jest.mock("recoil", () => ({
  ...jest.requireActual("recoil"),
  useRecoilValue: jest.fn(() => mockUseRecoilValue()),
  useRecoilState: jest.fn(() => mockUseRecoilState()),
}));

describe("Call Function.", () => {
  beforeEach(() => {
    mockUseRecoilValue.mockImplementation(() => {});
    mockUseRecoilState.mockImplementation(() => [0, 1]);
  });

  test("Call useEvidenceList.", () => {
    useEvidenceList();
    expect(mockUseRecoilValue).toBeCalledTimes(1);
  });

  test("Call useConditions.", () => {
    useConditions();
    expect(mockUseRecoilValue).toBeCalledTimes(1);
  });

  test("Call useGhosts.", () => {
    useGhosts();
    expect(mockUseRecoilValue).toBeCalledTimes(1);
  });

  test("Call useEvidenceConditions.", () => {
    useEvidenceConditions();
    expect(mockUseRecoilState).toBeCalledTimes(1);
  });

  test("Call useDeterminCount.", () => {
    useDeterminCount(1);
    expect(mockUseRecoilValue).toBeCalledTimes(1);
  });
});

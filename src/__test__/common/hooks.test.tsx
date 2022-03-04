import { useRecoilValue, useRecoilState } from "recoil";
import {
  useItems,
  useConditions,
  useGhosts,
  useItemConditions,
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

  test("Call useItems.", () => {
    useItems();
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

  test("Call useItemConditions.", () => {
    useItemConditions();
    expect(mockUseRecoilState).toBeCalledTimes(1);
  });

  test("Call useDeterminCount.", () => {
    useDeterminCount(1);
    expect(mockUseRecoilValue).toBeCalledTimes(1);
  });
});

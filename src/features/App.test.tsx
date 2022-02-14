import { shallow } from "enzyme";
import App from "@/features/App";

describe("Mount App.", () => {
  test("Mount App.", () => {
    shallow(<App />);
  });
});

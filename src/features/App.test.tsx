import { RecoilRoot } from "recoil";
import { render } from "@testing-library/react";
import App from "@/features/App";

describe("Mount App.", () => {
  test("Mount App.", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );
  });
});

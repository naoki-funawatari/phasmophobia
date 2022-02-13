import { RecoilRoot } from "recoil";
import Header from "@/features/Header";
import Main from "@/features/Main";

export default function App() {
  return (
    <RecoilRoot>
      <Header />
      <hr />
      <Main />
    </RecoilRoot>
  );
}

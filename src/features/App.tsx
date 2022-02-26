import { Suspense } from "react";
import Selection from "@/features/selection/Selection";
import Details from "@/features/details/Details";
import "@/assets/styles.scss";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Selection />
      <br />
      <Details />
    </Suspense>
  );
}

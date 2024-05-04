import { RecoilRoot } from "recoil";
import Todos from "./components/Todos/Todos";
import { Suspense } from "react";
import DateSection from "./components/DateSection/DateSection";

function App() {
  return (
    <RecoilRoot>
      <div className="p-24">
        <DateSection />
        <Suspense fallback={<div>Loading...</div>}>
          <Todos />
        </Suspense>
      </div>
    </RecoilRoot>
  );
}

export default App;

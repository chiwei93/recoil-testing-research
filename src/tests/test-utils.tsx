import { Suspense, type ReactNode } from "react";
import { type RenderOptions, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestRecoilRoot, { AtomTuple } from "./TestRecoilRoot";
import { RecoilCacheReset } from "./RecoilCacheReset";

export async function customRender(
  element: ReactNode,
  initialStates: AtomTuple[] = [],
  renderOptions: RenderOptions = {}
) {
  function TestProvider({ children }: { children: ReactNode }) {
    return (
      <TestRecoilRoot initialStates={initialStates}>
        <RecoilCacheReset />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </TestRecoilRoot>
    );
  }

  const defaultOptions: RenderOptions = {
    wrapper: TestProvider,
    ...renderOptions,
  };

  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const result = render(element, defaultOptions);
  await act(async () => {});

  return {
    ...result,
    user,
  };
}

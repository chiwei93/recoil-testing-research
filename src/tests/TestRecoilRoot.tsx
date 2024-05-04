/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import { type MutableSnapshot, RecoilRoot, type RecoilState } from "recoil";

export type AtomTuple = [RecoilState<any>, any];

export default function TestRecoilRoot({
  children,
  initialStates,
}: {
  children: ReactNode;
  initialStates: AtomTuple[];
}) {
  function initializeStates({ set }: MutableSnapshot) {
    initialStates.forEach(([atom, mockState]) => {
      set(atom, mockState);
    });
  }

  return <RecoilRoot initializeState={initializeStates}>{children}</RecoilRoot>;
}

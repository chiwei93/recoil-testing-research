import { atom } from "recoil";

export const dateAtom = atom<Date | null>({
  key: "dateAtom",
  default: null,
});

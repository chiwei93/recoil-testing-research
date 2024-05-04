import { atom } from "recoil";
import { todosSelector } from "../selectors/todosSelector";

export const todosAtom = atom({
  key: "todosAtom",
  default: todosSelector,
});

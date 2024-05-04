import { selector } from "recoil";
import { userIdAtom } from "../atoms/userIdAtom";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const todosSelector = selector({
  key: "todosSelector",
  get: async ({ get }) => {
    const userId = get(userIdAtom);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    const data = (await response.json()) as Todo[];
    return data;
  },
});

import { useRecoilValue } from "recoil";
import { todosAtom } from "../../atoms/todosAtom";

export default function Todos() {
  const todos = useRecoilValue(todosAtom);

  if (todos.length === 0) {
    return <div>No todo found.</div>
  }

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="mb-4">
            <div>userId: {todo.userId}</div>
            <div>title: {todo.title}</div>
            <div>completed: {todo.completed ? "Completed" : "Not complete"}</div>
          </div>
        );
      })}
    </div>
  );
}

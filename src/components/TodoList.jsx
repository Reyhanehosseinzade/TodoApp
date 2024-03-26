import { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { TodoContext } from "../App";

export function TodoList() {
  const {todos} = useContext(TodoContext)
  return (
      <ul className="mt-5 flex flex-col overflow-y-auto h-[400px]">
          {todos.map((todo) => {
              return <TodoItem key={todo.id} {...todo} />
          })}
    </ul>
  );
}

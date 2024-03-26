import { useContext, useRef } from "react";
import { TodoContext } from "../App";

export function NewTodoForm() {
  const { addNewTodo } = useContext(TodoContext)
  const nameRef = useRef()
  function handleSubmit(e) {
    e.preventDefault()
    addNewTodo(nameRef.current.value)
    nameRef.current.value = ""
  }
  return (
    <section className="grid gap-2">
      <h1 className="text-indigo-700 font-semibold text-center text-lg">
        My Todo List :)
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-2">
        <input
          type="text"
          autoFocus
          ref={nameRef}
          className="border rounded-md p-2 focus:outline-indigo-400 focus:shadow-sm col-span-2  placeholder:text-sm"
          placeholder="new todo..."
        />
        <button
          type="submit"
          className="bg-violet-700 hover:bg-violet-500 duration-100 rounded-md text-white p-2 shadow-md shadow-indigo-50"
        >
          Add Todo
        </button>
      </form>
    </section>
  );
}

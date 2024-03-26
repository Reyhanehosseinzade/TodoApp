import { useContext, useId, useRef, useState } from "react";
import { TodoContext } from "../App";

export function TodoItem({ name, id, completed }) {
  const todoItem = useId();
  const { toggleTodo, deleteItem, updateTodo } = useContext(TodoContext);
  const nameRef = useRef();
  // State to track whether the todo item is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Checking if the input is not empty before updating
    if (nameRef.current.value === "") {
      return alert("Please enter a valid todo");
    }
      updateTodo(id, nameRef.current.value);
      setIsEditing(false);
  }

  return (
    <li className="p-2 border-b border-violet-300 flex items-center justify-between">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex justify-between w-full">
          <input
            type="text"
            id="addnew"
            name="addnew"
            autoFocus
            defaultValue={name}
            ref={nameRef}
            className="border rounded-sm px-2 outline-none focus:shadow-sm col-span-2"
          />
          <button
            className="bg-violet-500 hover:bg-violet-400 text-sm duration-100 rounded-md text-white p-1 
            px-4 shadow-sm shadow-red-50"
          >
            Edit
          </button>
        </form>
      ) : (
        <>
          <label
            htmlFor={todoItem}
            className="flex items-center cursor-pointer"
          >
            <input
              className="h-[15px] w-[15px] mr-2 accent-violet-500 check-todo"
              checked={completed}
              onChange={(e) => toggleTodo(id, e.target.checked)}
              type="checkbox"
              name={todoItem}
              id={todoItem}
            />
            <span className="capitalize">{name}</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-violet-500 hover:bg-violet-400 text-sm duration-100 rounded-md text-white p-1 px-2 shadow-sm shadow-red-50"
            >
              Edit
            </button>
            <button
              onClick={() => deleteItem(id)}
              className="bg-red-500 hover:bg-red-400 text-sm duration-100 rounded-md text-white p-1 px-2 shadow-sm shadow-red-50"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";
import FilterForm from "./components/FilterForm";

// Constant for local storage key
const LOCAL_STORAGE_KEY = "todos";

// Creating a context for Todo operations
export const TodoContext = createContext();
// Action types for the reducer
const ACTIONS = {
  ADD: "ADD",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
};
// Reducer function to handle different actions
function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      // Adding a new todo
      return [
        ...todos,
        { name: payload.name, id: crypto.randomUUID(), completed: false },
      ];
    case ACTIONS.DELETE:
      // Deleting a todo by filtering out the specified id
      return todos.filter((todo) => todo.id !== payload.id);
    case ACTIONS.TOGGLE:
      // Toggling the completion status of a todo
      return todos.map((todo) =>
        todo.id === payload.id
          ? { ...todo, completed: payload.completed }
          : todo
      );
    case ACTIONS.UPDATE:
      // Updating the name of a todo
      return todos.map((todo) =>
        todo.id === payload.id ? { ...todo, name: payload.name } : todo
      );
  }
}
function App() {
  // Using useReducer for managing state with local storage initialization
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value === null) return initialValue;
    return JSON.parse(value);
  });
  // State for filtering todos by name
  const [filterName, setFilterName] = useState("");
  // State for showing completed todos
  const [showCompletedFilter, setShowCompletedFilter] = useState("");
  // useEffect to save todos to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  // Filtering todos based on name and completion status
  const filteredTodos = todos.filter((todo) => {
    if (showCompletedFilter && !todo.completed) return false;
    return todo.name.includes(filterName);
  });
  function addNewTodo(name) {
    if (name.trim() !== "") {
      dispatch({ type: ACTIONS.ADD, payload: { name } });
    } else {
      alert("Please enter a valid todo");
    }
  }
  function deleteItem(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }
  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }
  function updateTodo(todoId, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id: todoId, name } });
  }
  return (
    <main className="p-2">
      <div className="w-full sm:w-full md:w-10/12 lg:w-6/12 rounded-md border shadow-sm shadow-slate-50 p-5 m-auto todo-card">
        <TodoContext.Provider
          value={{
            deleteItem,
            toggleTodo,
            todos: filteredTodos,
            addNewTodo,
            updateTodo,
          }}
        >
          <NewTodoForm />
          <TodoList />
          <FilterForm
            name={filterName}
            setName={setFilterName}
            showCompleted={showCompletedFilter}
            setshowCompleted={setShowCompletedFilter}
          />
        </TodoContext.Provider>
      </div>
    </main>
  );
}

export default App;

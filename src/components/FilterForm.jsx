export default function FilterForm({ name, setName, setshowCompleted, showCompleted }) {
  return (
    <>
      <div className="grid grid-cols-3 justify-between gap-1">
        <input
          type="text"
          id="search"
          name="search"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md p-2 focus:outline-indigo-400 focus:shadow-sm col-span-2"
          placeholder="Search Todo"
        />

        <label
          htmlFor="showCompleted"
          className="flex justify-center items-center text-sm p-0 text-violet-600 cursor-pointer"
        >
          <input
            type="checkbox"
            name="showCompleted"
            id="showCompleted"
            className="h-[15px] w-[15px] mr-2 accent-violet-500 check-todo"
            checked={showCompleted}
            onChange={(e) => setshowCompleted(e.target.checked)}
          />
          Completed
        </label>
      </div>
    </>
  );
}

import { createStore } from "redux";

const initialState = {
  tasks: localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [],
  // New property for completed task IDs (optional for persistence)
  completedTaskIds: new Set(
    localStorage.getItem("completedTaskIds")
      ? JSON.parse(localStorage.getItem("completedTaskIds"))
      : []
  ),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "DELETE_TASK":
      // Check if task is completed before deleting
      if (!state.completedTaskIds.has(action.payload)) {
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
      }
      return state;
    case "TOGGLE_COMPLETED":
      return {
        ...state,
        completedTaskIds: new Set(
          state.completedTaskIds.has(action.payload)
            ? state.completedTaskIds.delete(action.payload)
            : state.completedTaskIds.add(action.payload)
        ),
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

// Function to save tasks to local storage
store.subscribe(() => {
  localStorage.setItem("tasks", JSON.stringify(store.getState().tasks));
  // Optional: Persist completedTaskIds in local storage
  localStorage.setItem(
    "completedTaskIds",
    JSON.stringify(Array.from(store.getState().completedTaskIds))
  );
});

export default store;

import React from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div
      style={{
        margin: 0,
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        To-Do Application
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
};

export default App;

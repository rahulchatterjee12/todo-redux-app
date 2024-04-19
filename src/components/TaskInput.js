import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../actions/actions";
import { Button, TextField } from "@mui/material";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task) {
      dispatch(addTask(task));
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
      <TextField
        size="small"
        type="text"
        value={task}
        onChange={handleChange}
        placeholder="Add Task"
        style={{}}
      />
      <Button variant="outlined" type="submit">
        Add
      </Button>
    </form>
  );
};

export default TaskInput;

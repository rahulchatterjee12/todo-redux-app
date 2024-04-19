import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../actions/actions";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  // New state to store completed task IDs
  const [completedTaskIds, setCompletedTaskIds] = useState(new Set());

  const handleDelete = (id) => {
    // Check if task is completed before deleting
    if (!completedTaskIds.has(id)) {
      dispatch(deleteTask(id));
    }
  };

  const handleToggleCompleted = (id) => {
    setCompletedTaskIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div
      style={{
        marginTop: "15px",
      }}
    >
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "250px",
            padding: 5,
            border: "1px solid gray",
            marginTop: "8px",
            borderRadius: "10px",
            alignContent: "start",
            boxShadow: "1px 1px 15px .5px #e7e7e7",
          }}
        >
          <input
            type="checkbox"
            checked={completedTaskIds.has(task.id)}
            onChange={() => handleToggleCompleted(task.id)}
          />
          <span
            style={{
              textDecoration: completedTaskIds.has(task.id)
                ? "line-through"
                : "none",
              marginTop: "10px",
            }}
          >
            {task.text}
          </span>
          <IconButton
            onClick={() => handleDelete(task.id)}
            disabled={completedTaskIds.has(task.id)}
            color="error"
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

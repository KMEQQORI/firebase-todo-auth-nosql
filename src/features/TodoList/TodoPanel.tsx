import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { BiMessageSquareAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  AddNewTodoToUserList,
  deleteUserTodo,
  fetchUserTodoList,
  markUserTodoAsDone,
  selectDoneList,
  selectTodoList,
} from "./todoSlice";
import { selectUser } from "../authentication/authenticationSlice";
import { todoStatus } from "./domain/todoStatus";
import "./TodoPanel.css";
import "./TodoPanelMobile.css";

function TodoPanel() {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(selectTodoList);
  const doneList = useAppSelector(selectDoneList);
  const user = useAppSelector(selectUser);

  const [text, setText] = useState("");

  const handleNewTodo = () => {
    const newTodo = {
      text,
      userId: user?.uid || "",
      status: todoStatus.TODO,
    };

    dispatch(AddNewTodoToUserList(newTodo)).then(() => {
      dispatch(fetchUserTodoList(user?.uid as string));
      setText("");
    });
  };

  const handleDeleteTodo = (documentId: string) => {
    dispatch(deleteUserTodo(documentId)).then(() => {
      dispatch(fetchUserTodoList(user?.uid as string));
    });
  };

  const handleMarkAsDone = (documentId: string) => {
    dispatch(markUserTodoAsDone(documentId)).then(() => {
      dispatch(fetchUserTodoList(user?.uid as string));
    });
  };

  useEffect(() => {
    dispatch(fetchUserTodoList(user?.uid as string));
  }, [dispatch, user?.uid]);

  return (
    <>
      <div className="todo-new-container">
        <input
          className="todo-new-input"
          name="text"
          onChange={(event) => setText(event.target.value)}
          placeholder="add new todo"
          value={text}
        />
        <div className="todo-new-button" onClick={handleNewTodo}>
          <BiMessageSquareAdd />
        </div>
      </div>

      <div className="todo-list-container">
        {todoList.map((todo) => (
          <div className="todo-tile">
            <div
              className="todo-done-button"
              onClick={() => handleMarkAsDone(todo.id as string)}
            >
              <IoCheckmarkDoneCircleSharp />
            </div>
            <div>{todo.text}</div>
          </div>
        ))}
      </div>

      <div className="todo-list-container">
        {doneList.map((todo) => (
          <div className="done-tile">
            <div
              className="todo-delete-button"
              onClick={() => handleDeleteTodo(todo.id as string)}
            >
              <TiDelete />
            </div>
            <div>{todo.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoPanel;

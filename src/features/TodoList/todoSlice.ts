import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { RootState } from "../../app/store";
import { firestore } from "../../firebase/firebaseConfig";
import { Todo } from "./domain/todo";
import { todoStatus } from "./domain/todoStatus";

export interface TodoState {
  todoList: Todo[];
  status: "idle" | "pending" | "failed";
}

export const AddNewTodoToUserList = createAsyncThunk(
  "todos/AddNewTodoToUserList",
  async (todo: Todo) => {
    try {
      const addedTodo = await addDoc(collection(firestore, "todos"), todo);
      return addedTodo;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUserTodoList = createAsyncThunk(
  "todos/fetchUserTodoList",
  async (userId: string) => {
    const todoList: Todo[] = [];

    const querySnapShot = await getDocs(
      query(collection(firestore, "todos"), where("userId", "==", userId))
    );
    querySnapShot.forEach((element) => {
      console.log(`${element.id} => ${element.data()}`);
      todoList.push({
        ...element.data(),
        id: element.id,
      } as Todo);
    });
    return todoList;
  }
);

export const markUserTodoAsDone = createAsyncThunk(
  "todos/markUserTodoAsDone",
  async (todoId: string) => {
    await updateDoc(doc(firestore, "todos", todoId), {
      status: todoStatus.DONE,
    });
  }
);

export const deleteUserTodo = createAsyncThunk(
  "todos/deleteUserTodo",
  async (todoId: string) => {
    await deleteDoc(doc(firestore, "todos", todoId));
  }
);

const initialState: TodoState = {
  todoList: [],
  status: "idle",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<Todo[]>) => {
      state.todoList = action.payload;
    },
    resetTodoList: (state) => {
      state.todoList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodoList.pending, (state) => {
        state.todoList = [];
        state.status = "pending";
      })
      .addCase(fetchUserTodoList.fulfilled, (state, action) => {
        state.status = "idle";
        state.todoList = action.payload;
      })
      .addCase(fetchUserTodoList.rejected, (state, action) => {
        state.todoList = [];
        state.status = "failed";
      });

    builder
      .addCase(AddNewTodoToUserList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(AddNewTodoToUserList.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(AddNewTodoToUserList.rejected, (state, action) => {
        state.status = "failed";
      });

    builder
      .addCase(deleteUserTodo.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteUserTodo.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { setTodoList, resetTodoList } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodo = (state: RootState, id: string) =>
  state.todos.todoList.find((todo) => todo.id === id);

export const selectTodoList = (state: RootState) =>
  state.todos.todoList.filter((todo) => todo.status === todoStatus.TODO);

export const selectDoneList = (state: RootState) =>
  state.todos.todoList.filter((todo) => todo.status === todoStatus.DONE);

export default todoSlice.reducer;

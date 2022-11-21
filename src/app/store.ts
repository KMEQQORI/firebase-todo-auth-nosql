import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import todoReducer from "../features/TodoList/todoSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    todos: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

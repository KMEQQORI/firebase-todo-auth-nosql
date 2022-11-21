import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import mainRouter from "./router/mainRouter";
import registrationRouter from "./router/registrationRouter";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  selectUser,
  setAuthenticationUser,
} from "./features/authentication/authenticationSlice";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(setAuthenticationUser(user));
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user !== null ? (
        <RouterProvider router={mainRouter} />
      ) : (
        <RouterProvider router={registrationRouter} />
      )}
    </div>
  );
}
export default App;

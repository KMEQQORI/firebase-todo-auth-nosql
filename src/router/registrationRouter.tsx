import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../features/authentication/Login";
import Register from "../features/authentication/Register";

const registrationRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default registrationRouter;

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../features/Home/Home";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default mainRouter;

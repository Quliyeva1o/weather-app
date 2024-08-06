import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function App() {
  const rooter = createBrowserRouter(routes);
  return (
    <>
      <RouterProvider router={rooter} />
    </>
  );
}

export default App;

import React from "react";

import Home from "../pages/Home";
import Detail from "../pages/Detail";

export const rootRoutes = [
  { index: true, element: <Home /> },
  { path: "/detail:id", element: <Detail /> },
];

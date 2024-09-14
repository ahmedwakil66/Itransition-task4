import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router";
import "./index.css";
import MeProvider from "./providers/MeProvider";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MeProvider>
      <RouterProvider router={router} />
    </MeProvider>
  </React.StrictMode>
);

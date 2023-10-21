import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { GlobalStyles } from "./styles/GlobalStyle.ts";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-center" />
      <GlobalStyles />
  </React.StrictMode>
);

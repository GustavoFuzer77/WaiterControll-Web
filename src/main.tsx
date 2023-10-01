import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.tsx";
import { GlobalStyles } from "./styles/GlobalStyle.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <GlobalStyles />
  </React.StrictMode>
);

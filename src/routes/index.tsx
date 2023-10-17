import { createBrowserRouter } from "react-router-dom";
// import React from "react";
import Home from "../pages/Home/index-home";
import Config from "../pages/Config/index-configPage";
import CreateCategory from "../pages/Config/CreateCategory/index-createCategory";
import CreateProduct from "../pages/Config/CreateProduct/index-createProduct";
import GrupoIngredientes from "../pages/Config/GrupoIngredientes/index-GrupoIngredientes";
import CreateIngredient from "../pages/Config/CreateIngredient/index-CreateIngredient";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <React.Suspense fallback={<>...</>}>
      <Home />
      // </React.Suspense>
    ),
  },
  {
    path: "/config",
    element: (
      // <React.Suspense fallback={<>...</>}>
      <Config />
      // </React.Suspense>
    ),
    children: [
      {
        path: "/config/produtos",
        element: (
          // <React.Suspense fallback={<>...</>}>
          <CreateProduct />
          // </React.Suspense>
        ),
      },
      {
        path: "/config/categorias",
        element: (
          // <React.Suspense fallback={<>...</>}>
          <CreateCategory />
          // </React.Suspense>
        ),
      },
      {
        path: "/config/grupos",
        element: (
          // <React.Suspense fallback={<>...</>}>
          <GrupoIngredientes />
          // </React.Suspense>
        ),
      },
      {
        path: "/config/ingredientes",
        element: (
          // <React.Suspense fallback={<>...</>}>
          <CreateIngredient />
          // </React.Suspense>
        ),
      },
    ],
  },
]);

export default router;

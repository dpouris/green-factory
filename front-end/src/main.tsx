import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Materials from "./pages/Materials.tsx";
import Material from "./pages/Material.tsx";
import AddMaterial from "./pages/AddMaterial.tsx";
import Home from "./pages/Home.tsx";
import CheckMaterial from "./pages/CheckMaterial.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/materials",
        element: <Materials/>,
        children: [
          {
            path: "/materials/all",
            element: <Materials/>
          },
          {
            path: "/materials/:id",
            element: <Material/>
          }
        ]
      },
      {
        path: "/materials/add",
        element: <AddMaterial/>
      },
      {
        path: "/materials/check",
        element: <CheckMaterial/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

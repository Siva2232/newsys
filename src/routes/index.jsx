import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import LaunchPage from "../pages/LaunchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path:"launch",
        element:<LaunchPage />
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

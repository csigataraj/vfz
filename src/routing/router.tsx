import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import MediaDetailPage from "../pages/MediaDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/:id",
        element: <MediaDetailPage />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/notFound/NotFound";
// import Cart from "../pages/Cart";
import HomePage from "../pages/HomePage";

import Shop from "../pages/Shop";
import SingleProduct from "../pages/SingleProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/product/:productId",
        element: <SingleProduct />,
      },
      {
        path: "product/:productId",
        element: <SingleProduct />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;

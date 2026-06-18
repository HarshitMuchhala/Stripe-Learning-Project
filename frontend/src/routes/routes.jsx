import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Membership from "../pages/Membership";
import Success from "../pages/Success";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/membership",
    element: <Membership />,
  },
  {
  path: "/success",
  element: <Success />,
},
]);
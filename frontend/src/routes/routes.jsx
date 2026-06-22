import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Membership from "../pages/Membership";
import Processing from "../pages/Processing";
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
  path: "/processing",
  element: <Processing />,
},
  {
  path: "/success",
  element: <Success />,
},
]);
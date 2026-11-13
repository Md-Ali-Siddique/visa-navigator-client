import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllVisas from "../pages/AllVisas";
import AddVisa from "../pages/AddVisa";
import VisaDetails from "../pages/VisaDetails";
import MyAddedVisas from "../pages/MyAddedVisas";
import MyVisaApplications from "../pages/MyVisaApplications";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [

      {
        index: true,
        element: <Home />
      },

      {
        path: "all-visas",
        element: <AllVisas />
      },

      {
        path: "login",
        element: <Login />
      },

      {
        path: "register",
        element: <Register />
      },

      {
        path: "add-visa",
        element: (
          <PrivateRoute>
            <AddVisa />
          </PrivateRoute>
        )
      },

      {
        path: "visa-details/:id",
        element: (
          <PrivateRoute>
            <VisaDetails />
          </PrivateRoute>
        )
      },

      {
        path: "my-added-visas",
        element: (
          <PrivateRoute>
            <MyAddedVisas />
          </PrivateRoute>
        )
      },

      {
        path: "my-visa-applications",
        element: (
          <PrivateRoute>
            <MyVisaApplications />
          </PrivateRoute>
        )
      }

    ]
  }
]);

export default router;

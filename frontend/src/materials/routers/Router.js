import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import PrivateRoute from "../routers/PrivateRoute";
import Dashboard from "../components/Dashboard";
import MyProfile from "../components/MyProfile";

const route = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: (
      <Layout>
        <SignIn />
      </Layout>
    ),
  },
  {
    path: "/signup",
    exact: true,
    element: (
      <Layout>
        <SignUp />
      </Layout>
    ),
  },
  {
    path: "/myprofile",
    exact: true,
    element: (
      <Layout>
        <PrivateRoute>
          <MyProfile />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    exact: true,
    element: (
      <Layout>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Layout>
    ),
  },
]);

export default route;

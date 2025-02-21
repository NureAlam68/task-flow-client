import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AddTask from "../pages/AddTask";
import AllTask from "../pages/AllTask";
import UpdateTask from "../pages/UpdateTask";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/addTask",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/tasks",
        element: (
          <PrivateRoute>
            <AllTask></AllTask>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateTask/:id",
        element: (
          <PrivateRoute>
            <UpdateTask></UpdateTask>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://task-flow-server-pied.vercel.app/tasks/${params.id}`),
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AddTask from "../pages/AddTask";
import AllTask from "../pages/AllTask";


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
        element: <AddTask></AddTask>,
      },
      {
        path: "/tasks",
        element: <AllTask></AllTask>
      }
    ],
  },
]);

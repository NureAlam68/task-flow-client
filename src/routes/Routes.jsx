import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AddTask from "../pages/AddTask";
import AllTask from "../pages/AllTask";
import UpdateTask from "../pages/UpdateTask";


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
      },
      {
        path: '/updateTask/:id',
        element: <UpdateTask></UpdateTask>,
        loader: ({ params }) => fetch(`http://localhost:5000/tasks/${params.id}`)
      },
    ],
  },
]);

import React from "react"
import {createBrowserRouter} from "react-router-dom"
import ProtectedRoute from "./layout/ProtectedRoute"
import NotFound from "./routes/notFound"
import Users from "./routes/users"
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <NotFound />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
])

export default router

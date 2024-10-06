import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/auth/Login"
import MainLayout from "./layout/MainLayout"
import Signup from "./pages/auth/Signup"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import VerifyEmail from "./pages/auth/VerifyEmail"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import SearchPage from "./pages/SearchPage"
import RestaurantPage from "./pages/RestaurantPage"
import Cart from "./pages/Cart"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/search/:text",
        element: <SearchPage />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantPage />
      },
      {
        path: "/cart",
        element: <Cart />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />
  }
])

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  )
}

export default App
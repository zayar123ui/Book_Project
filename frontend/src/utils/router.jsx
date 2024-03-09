import ErrorPage from "../components/layouts/ErrorPage";
import RootLayout from "../components/layouts/RootLayout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Home from "../views/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "../views/Auth/Login";
// import FreedomRoute from "./FreedomRoute";
import AdminRoute from "./AdminRoute";
import AdminHome from "../views/admin/AdminHome";
import AdminLogin from "../views/Auth/AdminLogin"
import AddBook from "../views/books/AddBook";
import BorrowBooks from "../views/books/BorrowBooks";
import Register from "../views/Auth/Register";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="/borrow" element={<BorrowBooks />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route
          path="/library"
          element={<RootLayout />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<AdminHome />} />
          <Route path="addBook" element={<AddBook />} />
        </Route>
      </Route>

        <Route
          path="/login"
          element={<RootLayout />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<Login />} />
        </Route>

        <Route
          path="/adminLogin"
          element={<RootLayout />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<AdminLogin />} />
        </Route>

        <Route
          path="/register"
          element={<RootLayout />}
          errorElement={<ErrorPage />}
        >
          <Route index element={<Register />} />
        </Route>
    </>
  )
);

export default router;

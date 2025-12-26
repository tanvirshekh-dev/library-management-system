import AddBook from "@/components/dashboard/AddBook";
import EditBook from "@/components/dashboard/EditBook";
import { MainLayout } from "@/components/Layout/MainLayout";
import ChangedPassword from "@/components/Profile/ChangedPassword";
import EditProfileInfo from "@/components/Profile/EditProfileInfo";
import AddDepartment from "@/pages/AddDepartment";
import { AddSemester } from "@/pages/AddSemester";
import BookManagement from "@/pages/BookManagement";
import Categories from "@/pages/Categories";
import Issue from "@/pages/Issue";
import Profile from "@/pages/Profile";
import Return from "@/pages/Return";
import ForgotPassword from "@/components/Profile/ForgotPassword"
import EmailOtp from "@/components/Profile/EmailOtp"
import SetNewPassword from "@/components/Profile/SetNewPassword"
import StudentManagement from "@/pages/StudentManagement";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/books/addbook"}></Navigate>
    }, 
      {
        path: "/books",
        element: <BookManagement></BookManagement>,
        children: [
          {
            index: true,
            element: <Navigate to={"/addbook"} replace ></Navigate>
          },
          {
            path: "addbook",
            element: <AddBook></AddBook>,
            loader: () => fetch("/bookManagement.json"),
          },
          {
            path: "editbook",
            element: <EditBook></EditBook>,
            loader: () => fetch("/bookManagement.json"),
          },
        ],
      },
      {
        path: "/issue",
        element: <Issue />,
        loader: () => fetch("/bookIssueReturn.json"),
      },
      {
        path: "/return",
        element: <Return />,
        loader: () => fetch("/bookIssueReturn.json"),
      },
      {
        path: "/categories",
        element: <Categories />,
        children: [
          {
            path: "department",
            element: <AddDepartment />,
            loader: () => fetch("/addDepartment.json"),
          },
          {
            path: "semester",
            element: <AddSemester />,
            loader: () => fetch("/addSemester.json"),
          },
        ],
      },
      {
        path: "/students",
        element: <StudentManagement />,
        loader: () => fetch("/studentManagement.json"),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/edit-profile",
        element: <EditProfileInfo />,
      },
      {
        path: "/profile/changed-password",
        element: <ChangedPassword />,
      },
      {
        path: "/profile/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/profile/email-otp",
        element: <EmailOtp />,
      },
      {
        path: "/profile/set-new-password",
        element: <SetNewPassword />,
      },
      {
        path: "/*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { MainLayout } from "./components/Layout/MainLayout";

// Placeholder components 
const Books = () => <div className="p-8">Book Management Content</div>;
const IssueReturn = () => <div className="p-8">Issue and return</div>;
const Students = () => <div className="p-8">Student Management Content</div>;
const Profile = () => <div className="p-8">User Profile Content</div>;
const Categories = () => <div className="p-8">Categories</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        index: true, 
        element: <Dashboard />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "issue",
        element: <IssueReturn />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        // path: "*", 
        // element: <Navigate to="/" />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
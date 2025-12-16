import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login3 from "./Pages/Login3";
import Home from "./Pages/Home";
import CategorySearch from "./Pages/CategorySearch";
import CasteSearch from "./Pages/CasteSearch";
import SurnameSimilarSearch from "./Pages/InArea/SurnameSimilarSearch";
import BySurname from "./Pages/InArea/BySurname";
import ByCaste from "./Pages/InArea/ByCaste";
import ByCategory from "./Pages/InArea/ByCategory";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login3 />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/category-search",
    element: (
      <PrivateRoute>
        <CategorySearch />
      </PrivateRoute>
    ),
  },
  {
    path: "/caste-search",
    element: (
      <PrivateRoute>
        <CasteSearch />
      </PrivateRoute>
    ),
  },
  {
    path: "/surname-similar-search",
    element: (
      <PrivateRoute>
        <SurnameSimilarSearch />
      </PrivateRoute>
    ),
  },
  {
    path: "/in-area/by-surname",
    element: (
      <PrivateRoute>
        <BySurname />
      </PrivateRoute>
    ),
  },
  {
    path: "/in-area/by-caste",
    element: (
      <PrivateRoute>
        <ByCaste />
      </PrivateRoute>
    ),
  },
  {
    path: "/in-area/by-category",
    element: (
      <PrivateRoute>
        <ByCategory />
      </PrivateRoute>
    ),
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;

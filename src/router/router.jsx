import { createBrowserRouter } from "react-router-dom";
import Main from "../layOut/Main";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AddFood from "../pages/AddFood";
import MyFoods from "../pages/MyFoods";
import MyOrders from "../pages/MyOrders";
import Gallery from "../pages/Gallery";
import AllFoods from "../pages/AllFoods";
import FoodCard from "../components/FoodCard";
import FoodPurchase from "../pages/FoodPurchase";
import UpdateFood from "../pages/UpdateFood";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contract";
import JobPage from "../pages/JobPage";
import PressKitPage from "../pages/PresskitPage";
import Faq from "../pages/Faq";
import Terms from "../pages/Terms";
import PrivacyPolicy from "../pages/PrivacyPolicy";
// import CookiePolicyPage from "../pages/CookiePolicyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-foods",
        element: (
          <PrivateRoute>
            <MyFoods></MyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/foods",
        element: <AllFoods></AllFoods>,
      },
      {
        path: "/food/:id",
        element: <FoodCard></FoodCard>,
      },
      {
        path: "/foodPurchase/:id",
        element: (
          <PrivateRoute>
            <FoodPurchase></FoodPurchase>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-Food/:id",
        element: <UpdateFood></UpdateFood>,
      },
      {
        path: '/aboutus',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/contract',
        element: <Contact></Contact>
      },
      {
        path: '/jobs',
        element: <JobPage></JobPage>
      },
      {
        path: '/press',
        element: <PressKitPage></PressKitPage>
      },
      {
        path: '/faq',
        element: <Faq></Faq>
      },
      {
        path: '/terms',
        element: <Terms></Terms>
      },
      {
        path: '/privacy',
        element: <PrivacyPolicy></PrivacyPolicy>
      },
      // {
      //   path: '/cookies',
      //   element: <CookiePolicyPage></CookiePolicyPage>
      // }
    ],
  },
]);

export default router;

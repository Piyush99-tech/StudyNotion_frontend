import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./Components/common/NavBar";
//import Footer from "./Components/common/Footer";
import { setProgress } from "./slices/LoadingBarSlice";
import { useSelector } from "react-redux";
 import { useDispatch } from "react-redux";
import OpenRoute from "./Components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Catalog from "./pages/Catalog";

import MyProfile from "./Components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import { ACCOUNT_TYPE } from "./utils/constants";
import Settings from "./Components/core/Dashboard/Settings";

import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses";
import Cart from "./Components/core/Dashboard/Cart";


import AddCourse from "./Components/core/Dashboard/AddCourse";
import MyCourses from "./Components/core/Dashboard/MyCourses";
import EditCourse from "./Components/core/Dashboard/EditCourse";
import Instructor from "./Components/core/Dashboard/InstructorDashboard/Instructor";
import CourseDetails from "./pages/CourseDetails";



import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./Components/core/ViewCourse/VideoDetails";



import Error from "./pages/Error"



function App() {

     const user = useSelector((state) => state.profile.user);
  const progress = useSelector((state) => state.loadingBar);
  const dispatch = useDispatch();

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

         <NavBar setProgress={setProgress}></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />

<Route path="courses/:courseId" element={<CourseDetails/>} />


 <Route path="*" element={<Error />} />
            <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />


         <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/update-password/:id" element={<ResetPassword />} />

        <Route path="/verify-email" element={<VerifyOtp />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} /> 

                <Route path="catalog/:catalogName" element={<Catalog/>} />

            <Route 
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
>
  <Route path="my-profile" element={<MyProfile />} />
  <Route path="settings" element={<Settings />} />
  {user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <>
      <Route path="cart" element={<Cart />} />
      <Route path="enrolled-courses" element={<EnrolledCourses />} />
    </>
  )}




   {
  user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
    <>
      <Route path="instructor" element={<Instructor />} />
      <Route path="add-course" element={<AddCourse />} />
      <Route path="my-courses" element={<MyCourses />} />
      <Route path="edit-course/:courseId" element={<EditCourse />} />
    </>
  )
}


</Route>


         <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>


      </Routes>
    </div>
  );
}

export default App;

import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import CheckLogin from "./pages/CheckLogin"
import CheckRegister from "./pages/CheckRegister"
import UserRegister from "./pages/User/UserRegister"
import UserLogin from "./pages/User/UserLogin"
import InstructorRegister from "./pages/Instructor/InstructorRegister"
import InstructorLogin from "./pages/Instructor/InstructorLogin"
import UserLanding from "./pages/User/UserLanding"
import InstructorLanding from "./pages/Instructor/InstructorLanding"
import SeeAllCourses from "./pages/SeeAllCourses"
import { UserProfile } from "./pages/User/UserProfile"
import { InstructorProfile } from "./pages/Instructor/InstructorProfile"
import { CreateCourse } from "./pages/Instructor/Createcourse"
import UserEnrolled from "./pages/User/UserEnrolled"
import CourseDetailPage from "./pages/CourseDetailPage"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/checklogin' element={<CheckLogin/>}></Route>
        <Route path='/checkregister' element={<CheckRegister/>}></Route>
        <Route path='/userregister' element={<UserRegister/>}></Route>
        <Route path='/userlogin' element={<UserLogin/>}></Route>
        <Route path='/userlanding' element={<UserLanding/>}></Route>
        <Route path='/userprofile' element={<UserProfile/>}></Route>
        <Route path='/userenrolled' element={<UserEnrolled/>}></Route>
        <Route path='/instructorregister' element={<InstructorRegister/>}></Route>
        <Route path='/instructorlogin' element={<InstructorLogin/>}></Route>
        <Route path="/instructorlanding" element={<InstructorLanding/>}></Route>
        <Route path="/instructorprofile" element={<InstructorProfile/>}></Route>
        <Route path='/createcourse' element={<CreateCourse/>}></Route>
        <Route path="/seeallcourses" element={<SeeAllCourses/>}></Route>
        <Route path="/coursedetail/:id" element={<CourseDetailPage/>}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

import { Navbar } from '@/components/Navbar'
// import UserLanding from './User/UserLanding'
// import CourseDetailPage from './CourseDetailPage.jsx'
// import SeeAllCourses from './SeeAllCourses.js'
import AdminDashboard from './Admin/AdminDashboard.tsx'
function Home() {
  return (
    <>
      <Navbar />
      {/* <UserLanding/> */}
      {/* {<CourseDetailPage/>} */}
      {/* {<SeeAllCourses/>} */}
      {/* <InstructorLanding/> */}
      {<AdminDashboard/>}
      </>
  )
}

export default Home
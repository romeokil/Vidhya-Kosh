import { Navbar } from '@/components/Navbar'
import UserLanding from './User/UserLanding'
import CourseDetailPage from './CourseDetailPage.jsx'
import SeeAllCourses from './SeeAllCourses.js'
import InstructorLanding from './Instructor/InstructorLanding.js'
import { Dashboard } from './Admin/Dashboard.js'
function Home() {
  return (
    <>
        <Navbar/>
        {/* <UserLanding/> */}
        {/* {<CourseDetailPage/>} */}
        {/* {<SeeAllCourses/>} */}
        {/* <InstructorLanding/> */}
        {<Dashboard/>}
    </>
  )
}

export default Home
import { Navbar } from '@/components/Navbar'
import UserLanding from './User/UserLanding'
import CourseDetailPage from './CourseDetailPage.jsx'
import SeeAllCourses from './SeeAllCourses.js'
import InstructorLanding from './Instructor/InstructorLanding.js'
function Home() {
  return (
    <>
        {/* <Navbar/> */}
        {/* <UserLanding/> */}
        {/* {<CourseDetailPage/>} */}
        {/* {<SeeAllCourses/>} */}
        <InstructorLanding/>
    </>
  )
}

export default Home
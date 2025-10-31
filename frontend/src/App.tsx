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
        <Route path='/instructorregister' element={<InstructorRegister/>}></Route>
        <Route path='/instructorlogin' element={<InstructorLogin/>}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

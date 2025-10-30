import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import CheckLogin from "./pages/CheckLogin"
import CheckRegister from "./pages/CheckRegister"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/checklogin' element={<CheckLogin/>}></Route>
        <Route path='/checkregister' element={<CheckRegister/>}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

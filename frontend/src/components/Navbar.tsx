import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { logout } from '@/redux/authSlice.ts';
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react" // Import the hamburger icon
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
// Assuming ModeToggle is your custom component
import { ModeToggle } from "@/components/mode-toggle"
import { Link } from "react-router-dom"

export function Navbar() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [alert,setalert]=useState(null);
  const activeUser = useSelector((state) => state.auth.activeUser);
  console.log("activeUser ka role", activeUser?.role);
  const role = (activeUser?.role)?.toLowerCase();
  const HandleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/${role}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        credentials: 'include'
      })
      const data=await response.json();
      if(response.ok){
        dispatch(logout(''));
        navigate('/');
        setalert({
          variant:"default",
          title:"Success!!",
          description:data.message
        })

      }
      else{
        setalert({
          variant:"destructive",
          title:"Failure",
          description:data.message
        })
      }
  }
  catch(error){
    setalert({
      variant:"destructive",
      title:"Failure",
      description:"Unkown Error happened!!"
    })
    console.log(`Error while ${role} logout`,error);
  }
}
  // Define the mobile content as a separate block/component for clarity
  const MobileNavContent = () => (
    <div className="flex flex-col space-y-4 p-4">
      {alert && (
                    <Alert variant={alert.variant} className="mb-4">
                        {/* Use an icon for visual impact */}
                        {alert.variant === 'destructive' ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>{alert.description}</AlertDescription>
                    </Alert>
                )}
      {/* These will be stacked vertically in the Sheet */}
      {
        !activeUser ?
          (
            <>
              <Button asChild className="w-full"><Link to="/checklogin">Login</Link></Button>
              <Button asChild className="w-full"><Link to="/checkregister">Register</Link></Button>
            </>

          ) : (
            <>
              <Button asChild className="w-full"><Link to="/checklogin">Profile</Link></Button>
              <Button onClick={HandleLogout} className="w-full">Logout</Button>
              {
                activeUser.role === "User" ? (
                  <Button asChild className="w-full"><Link to="/checklogin">Enrolled Course</Link></Button>
                ) :
                  (
                    <Button asChild className="w-full"><Link to="/checklogin">Create Course</Link></Button>
                  )
              }
              <Button asChild className="w-full"><Link to="/seeallcourses">See All Courses</Link></Button>
            </>
          )}

      {/* ModeToggle might need slight styling adjustments inside the sheet */}
      <div className="flex justify-center pt-2">
        <ModeToggle />
      </div>
    </div>
  )

  return (
    // Outer container for the Navbar
    <nav className="flex justify-between items-center h-16 px-4 border-b">

      {/* 1. App Name/Logo (Always visible) */}
      <div className="text-xl font-bold dark:text-white text-black">
        Vidhya-Kosh
      </div>

      {/* 2. Desktop Navigation (Visible on medium screens and up) */}
      {/* Use 'hidden' on small screens, and 'flex' on 'md' screens (768px and up by default) */}
      <div className="hidden md:flex items-center gap-2">
        {alert && (
                    <Alert variant={alert.variant} className="mb-4">
                        {/* Use an icon for visual impact */}
                        {alert.variant === 'destructive' ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>{alert.description}</AlertDescription>
                    </Alert>
                )}
      {/* These will be stacked vertically in the Sheet */}
      {
        !activeUser ?
          (
            <>
              <Button asChild className="w-full"><Link to="/checklogin">Login</Link></Button>
              <Button asChild className="w-full"><Link to="/checkregister">Register</Link></Button>
            </>

          ) : (
            <>
              <Button asChild><Link to="/checklogin">Profile</Link></Button>
              <Button onClick={HandleLogout}>Logout</Button>
              {
                activeUser.role === "User" ? (
                  <Button asChild><Link to="/checklogin">Enrolled Course</Link></Button>
                ) :
                  (
                    <Button asChild><Link to="/checklogin">Create Course</Link></Button>
                  )
              }
              <Button asChild><Link to="/seeallcourses">See All Courses</Link></Button>
            </>
          )}
        <ModeToggle />
      </div>

      {/* 3. Mobile Navigation (The Hamburger Menu/Sheet) */}
      {/* Use 'flex' on small screens, and 'hidden' on 'md' screens and up */}
      <div className="md:hidden flex items-center">
        <Sheet>
          {/* SheetTrigger is the Hamburger Button */}
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          {/* SheetContent is the Dialogue Box that slides in */}
          {/* side="right" makes it slide from the right side, typical for mobile menus */}
          <SheetContent side="right" className="w-[250px] sm:w-[300px] p-0">
            {/* The Mobile Content is placed inside the SheetContent */}
            <MobileNavContent />
          </SheetContent>
        </Sheet>
      </div>

    </nav>
  )
}

// Example usage: <Navbar />
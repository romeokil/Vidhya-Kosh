import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react" // Import the hamburger icon
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
// Assuming ModeToggle is your custom component
import { ModeToggle } from "@/components/mode-toggle"
import { Link } from "react-router-dom"

export function Navbar() {
  // Define the mobile content as a separate block/component for clarity
  const MobileNavContent = () => (
    <div className="flex flex-col space-y-4 p-4">
      {/* These will be stacked vertically in the Sheet */}
      <Button asChild className="w-full"><Link to="/checklogin">Login</Link></Button>
      <Button asChild className="w-full"><Link to="/checkregister">Register</Link></Button>
      
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
        <Button asChild><Link to="/checklogin">Login</Link></Button>
        <Button asChild><Link to="/checkregister">Register</Link></Button>
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
import { Navbar } from "@/components/Navbar";

// Dummy data for component visualization
const dummyCourse = {
  id: 1,
  name: "Mastering React & Next.js: The Complete Guide",
  description: "Dive deep into the modern web development stack. Build scalable, high-performance applications using the latest features of React, Next.js, and TypeScript. This course covers everything from basic components to server-side rendering and deployment.",
  price: 499.99,
  imageUrl: "/images/mastering-react.jpg",
  registeredUsers: 1245,
  instructor: {
    name: "Alex Thompson",
    bio: "Alex is a Senior Software Architect with 10+ years of experience building high-traffic applications for Fortune 500 companies. He is passionate about clean code and teaching complex concepts simply. Alex has trained over 50,000 developers globally.",
    rating: 4.8,
    coursesCount: 7,
  }
};

// Assume you have an icon library like Heroicons installed for the checkmark and star
// Example: import { Users, Star, ArrowRight } from 'lucide-react'; 

const CourseDetailPage = () => {
  const course = dummyCourse; // Use dummy data for display
  return (
    <>
    <Navbar/>
    <div className={`bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">


        {/* --------------------------- MAIN LAYOUT GRID --------------------------- */}
        {/* On large screens (lg), the layout becomes a 2/3 (details) and 1/3 (sidebar/enroll) split */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          
          {/* --------------------------- COLUMN 1: COURSE DETAILS & INSTRUCTOR (2/3 width) --------------------------- */}
          <div className="lg:col-span-2">

            {/* ============== COURSE DETAILS SECTION (TOP) ============== */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Image */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <img
                    src={"https://www.photoshopvideotutorial.com/freepsdmock/wp-content/uploads/2024/10/AdobeStock_640654498-1-708x400-1.jpeg"}
                    alt={course.name}
                    className="rounded-lg object-cover w-full aspect-video md:aspect-square shadow-md"
                  />
                </div>

                {/* Text Content */}
                <div className="md:w-2/3">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-3">
                    {course.name}
                  </h1>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {course.description}
                  </p>

                  {/* Registered Users Count */}
                  <div className="flex items-center text-gray-500 dark:text-gray-300 mb-6">
                    <span className="mr-2 text-indigo-500">
                      {/*  */}
                    </span>
                    <span className="font-semibold">{course.registeredUsers.toLocaleString()}</span> 
                    <span className="ml-1">students have already enrolled!</span>
                  </div>
                  
                  {/* Enroll Row (Price and Button) */}
                  <div className="flex items-center justify-between border-t pt-4 border-gray-200 dark:border-gray-700">
                    <span className="text-4xl font-black text-green-600 dark:text-green-400">
                      ${course.price}
                    </span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md transform hover:scale-[1.02] focus:ring-4 focus:ring-indigo-300">
                      Enroll Now
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* ============== INSTRUCTOR DETAILS SECTION (BOTTOM) ============== */}
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
                About Your Instructor
              </h2>
              
              <div className="flex items-start space-x-6">
                <img 
                  src="/images/instructor-avatar.jpg" 
                  alt={course.instructor.name} 
                  className="w-20 h-20 rounded-full object-cover shadow-lg flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{course.instructor.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center my-2">
                    <span className="text-yellow-500 mr-1 text-xl">⭐</span>
                    <span className="text-gray-700 dark:text-gray-300 font-bold">{course.instructor.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">(Certified Expert)</span>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{course.instructor.bio}</p>

                  {/* See Other Courses Button */}
                  <button className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition">
                    See {course.instructor.coursesCount} other courses by this instructor 
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            </div>
            
          </div>

          {/* --------------------------- COLUMN 2: SIDEBAR / STICKY ENROLL (1/3 width) --------------------------- */}
          {/* You can add extra course info here, like a table of contents or reviews */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
             <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Course Highlights
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 40+ Hours of Video Lessons</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Certificate of Completion</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Lifetime Access</li>
                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Downloadable Resources</li>
                </ul>
                
                {/* Re-iterate price and enroll button for visibility */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400 block mb-3">
                        ${course.price}
                    </span>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-lg transition duration-300">
                      I Want This Course!
                    </button>
                </div>
             </div>
          </div>
          {/* --------------------------- END OF GRID --------------------------- */}
        </div>
      </div>
    </div>
    </>
    // Outer Container: Sets the background, min height, and applies dark mode class
    
  );
};

export default CourseDetailPage;
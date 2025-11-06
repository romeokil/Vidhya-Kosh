import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import NoCoursesYet from "./NoCoursesYet.tsx";
import { setallcourses } from "@/redux/courseSlice";
import CourseGrid from "../CourseGrid";
import AnimatedCounter from './AnimatedCounter'; // Import the new component
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// --- Dummy Data (Replace with real data fetching) ---
const INSTRUCTOR_STATS = {
    coursesCreated: 15,
    registeredStudents: 52458,
};

function InstructorLanding() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const activeUser = useSelector((state) => state.auth.activeUser);
    useEffect(() => {
        async function getallcourses() {
            const response = await fetch('http://localhost:8000/api/course/getallcourse');
            const data = await response.json();
            console.log("data", data.getallCourses);
            dispatch(setallcourses(data.getallCourses));
        }
        getallcourses();
    }, [dispatch])
    return (
        // Global Container: Applies background color and smooth transition
        <div className={`bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-500`}>
            <Navbar />

            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

                {/* -------------------- FIRST DIV: Heading & Counters -------------------- */}
                <div className='flex flex-col flex-wrap pb-12 sm:pb-20 border-b border-gray-200 dark:border-gray-700'>

                    {/* Heading Section (Responsive Text Styling) */}
                    <div className="text-center mb-12">
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-red-600 dark:text-red-400 mb-4 transition-colors duration-300'>
                            Your Knowledge, Their Future.
                        </h1>
                        <h2 className='text-xl sm:text-2xl lg:text-3xl font-medium text-blue-600 dark:text-blue-300 transition-colors duration-300 max-w-4xl mx-auto'>
                            Every course you launch expands your reach and transforms lives around the globe. Keep sharing your expertise!
                        </h2>
                    </div>

                    {/* Counters Section (Flexbox for side-by-side alignment) */}
                    <div className='flex flex-col sm:flex-row justify-center gap-8'>

                        <AnimatedCounter
                            endValue={INSTRUCTOR_STATS.coursesCreated}
                            title="Total Courses Created"
                        />

                        <AnimatedCounter
                            endValue={INSTRUCTOR_STATS.registeredStudents}
                            title="Students Registered Globally"
                        />

                    </div>
                </div>

                {/* -------------------- SECOND DIV: Course Grid -------------------- */}
                <div className='mt-10'>
                    <h1 className='text-left pl-2 text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300'>
                        Courses Published By You
                    </h1>
                    <div>
                        {
                            activeUser?.publishedcourses && activeUser?.publishedcourses.length > 0 ? (
                                <>
                                    <CourseGrid courses={activeUser?.publishedcourses} />
                                </>
                            ) : (
                                <>
                                    <NoCoursesYet
                                        instructorName={activeUser?.name}
                                        onCreateCourse={() => navigate(`/createcourse`)}
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorLanding
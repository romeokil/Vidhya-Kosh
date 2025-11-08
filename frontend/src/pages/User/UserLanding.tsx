import { Navbar } from '@/components/Navbar'
import { useEffect, useMemo } from 'react'
import CourseGrid from '../CourseGrid'
import { setallcourses } from '@/redux/courseSlice.ts'
import { useSelector, useDispatch } from 'react-redux'
export default function UserLanding() {
    const dispatch = useDispatch();
    const allcourses = useSelector((state) => state.course.allcourses);
    useEffect(() => {
        async function getallcourses() {
            const response = await fetch('http://localhost:8000/api/course/getallcourse');
            const data = await response.json();
            console.log("data", data.getallCourses);
            dispatch(setallcourses(data.getallCourses));
        }
        getallcourses();
    }, [dispatch])


    const getfiveCourses = useMemo(() => {

        if(!allcourses ||  allcourses.length==0){
            return [];
        }
        const copycourses=[...allcourses];
        const sortedcourses = copycourses?.sort((a, b) => {
            const dateA = Date.parse(a.createdAt);
            const dateB = Date.parse(b.createdAt);
            return dateB - dateA;
        })

        const recentFive = sortedcourses?.slice(0, 5);
        console.log(recentFive);

        return recentFive;
    },[allcourses])
    
    return (
        <>
            {/* this must consist of dark mode and light mode ,user profile ,logout user enrolled course , see all courses. */}
            <Navbar />
            <div className="w-3/4 mx-auto">

                {/* Gyaan ki baatien */}
                <div className='flex flex-col flex-wrap m-10 pt-5'>
                    <h1 className='text-red-500 font-bold text-5xl text-center mb-10'>Unlock Your Potential</h1>
                    <h2 className='text-blue-500 font-bold text-center text-4xl mb-10'>Stop dreaming, start doing. Get the skills you need to succeed in This Competitive Market.</h2>
                </div>
                {/* search bar add krne ka plan tha baad me krege. */}
                <div>
                    <h1 className='text-left pl-8 text-red-300 font-semibold text-3xl '>Recent Published Courses</h1>
                    <div>
                        {
                            allcourses && allcourses.length > 0 ? (
                                <CourseGrid courses={getfiveCourses} />
                            ) : (
                                <>
                                    <h1>Courses ni hai bhai!</h1>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

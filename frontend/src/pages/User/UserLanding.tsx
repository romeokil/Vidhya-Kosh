import { Navbar } from '@/components/Navbar'
import React from 'react'
import CourseGrid from '../CourseGrid'

export default function UserLanding() {
  return (
    <>
        {/* this must consist of dark mode and light mode ,user profile ,logout user enrolled course , see all courses. */}
        <Navbar/>
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
                <CourseGrid/>
            </div>
        </div>
    </div>
    </>
    
  )
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import CourseGrid from './CourseGrid'; 
import { useSelector } from 'react-redux';

export default function SeeAllCourses() {
    const initialCourses=useSelector((state)=>state.course.allcourses);
    const activeUser=useSelector((state)=>state.auth.activeUser);
    const navigate=useNavigate();
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: 500 });
    const [filteredCourses, setFilteredCourses] = useState(initialCourses);
    const handlePriceChange = (e) => {
        setPriceFilter({
            ...priceFilter,
            [e.target.name]: Number(e.target.value),
        });
    };

    const applyFilter = () => {
        const { min, max } = priceFilter;
        
        const results = initialCourses.filter(course => {
            return course.price >= min && course.price <= max;
        });

        setFilteredCourses(results);
    };


    const handleGoBack=()=>{
        if(activeUser.role==="User"){
            navigate('/userlanding');
        }
        else{
            navigate('/instructorlanding');
        }
    }

    useEffect(() => {
        setFilteredCourses(initialCourses);
        
        // Optional: Check system preference on mount (requires configuration in tailwind.config.js)
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
             // setIsDarkMode(true); // Uncomment if you want to initialize based on system preference
        }
    }, []); 

    return (
        // Global Container: Applies background color and smooth transition
        <div className={`bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-500`}>
            <Navbar />
            
            <div className='max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
                
                <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
                    <Button
                        variant="outline"
                        onClick={handleGoBack}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        See All courses
                    </h1>
                </div>
                
                {/* ----------- MAIN LAYOUT: Filter on Left, Courses on Right ----------- */}
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* LEFT PART: Filter Sidebar */}
                    <aside className="lg:w-1/4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg sticky top-4 z-10 transition-colors duration-300">
                        <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-5 border-b pb-2 border-gray-200 dark:border-gray-700'>
                            Filter Courses
                        </h2>
                        
                        {/* Price Filter Section */}
                        <div className='mb-6'>
                            <label className='block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3'>
                                Price Range
                            </label>
                            
                            {/* Minimum Price Input */}
                            <div className="mb-4">
                                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-500 dark:text-gray-400">Min Price: ${priceFilter.min}</label>
                                <input
                                    type="range"
                                    id="minPrice"
                                    name="min"
                                    min="0"
                                    max="500"
                                    step="10"
                                    value={priceFilter.min}
                                    onChange={handlePriceChange}
                                    // Range input styling for dark mode
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
                                />
                            </div>

                            {/* Maximum Price Input */}
                            <div className="mb-4">
                                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-500 dark:text-gray-400">Max Price: ${priceFilter.max}</label>
                                <input
                                    type="range"
                                    id="maxPrice"
                                    name="max"
                                    min="0"
                                    max="500" 
                                    step="10"
                                    value={priceFilter.max}
                                    onChange={handlePriceChange}
                                    // Range input styling for dark mode
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
                                />
                            </div>
                        </div>

                        {/* Apply Filter Button */}
                        <button
                            onClick={applyFilter}
                            className='w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md'
                        >
                            Apply Filter
                        </button>
                        
                    </aside>
                    
                    {/* RIGHT PART: Course Results Grid */}
                    <main className="lg:w-3/4">
                        {filteredCourses.length > 0 ? (
                            // NOTE: You must update the CourseGrid and CourseCard components 
                            // to also include dark mode classes for their backgrounds/text.
                            <CourseGrid courses={filteredCourses}/> 
                        ) : (
                            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300">
                                <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
                                    No courses found matching your criteria. Try adjusting the filters.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
import {act, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { setuserenrolledcourses } from '@/redux/courseSlice.ts';
import { ArrowLeft, BookOpen, User, DollarSign,Star, Calendar } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const isLoading = false;
export default function UserEnrolled() {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const activeUser=useSelector((state)=>state.auth.activeUser);
    const userenrolledcourses=useSelector((state)=>state.course.userenrolledcourses);
    // Function to handle the back button click
    const handleGoBack = () => {
        // Redirects the user to the user's main dashboard/landing page
        navigate('/userlanding'); 
    };

    useEffect(()=>{
        async function getuserenrolledcourses(){
            const response=await fetch(`http://localhost:8000/api/enrolledcourse/getuserenrolledcourses/${activeUser._id}`);
            const data=await response.json();
            dispatch(setuserenrolledcourses(data.getuserenrolledCourse));
        }
        getuserenrolledcourses();
    },[dispatch])
    
  return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* 1. Navbar */}
            <Navbar />

            {/* 2. Main Content Container */}
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header Row: Back Button and Page Title */}
                <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
                    <Button 
                        variant="outline" 
                        onClick={handleGoBack} 
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                        <BookOpen className="h-7 w-7 text-red-500 dark:text-red-400" /> My Enrolled Courses
                    </h1>
                </div>

                {/* Conditional Content Display */}
                {isLoading ? (
                    <div className="text-center py-10 text-lg text-gray-500 dark:text-gray-400">
                        Loading enrollments...
                    </div>
                ) : userenrolledcourses.length > 0 ? (
                    // --- Enrolled Courses Card (Table) ---
                    <Card className="shadow-2xl border border-gray-200 dark:border-gray-700">
                        <CardHeader className="p-6">
                            <CardTitle className="text-xl text-blue-600 dark:text-indigo-400">
                                Current Enrollments ({userenrolledcourses.length})
                            </CardTitle>
                            <Separator className="mt-2 dark:bg-gray-600" />
                        </CardHeader>

                        <CardContent className="p-0 overflow-x-auto">
                            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                
                                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                                    <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <TableHead className="w-[35%] text-gray-700 dark:text-gray-300 font-bold">Course Title</TableHead>
                                        <TableHead className="w-[20%] text-gray-700 dark:text-gray-300 font-bold hidden sm:table-cell">Instructor</TableHead>
                                        <TableHead className="w-[15%] text-gray-700 dark:text-gray-300 font-bold text-right hidden sm:table-cell">Price</TableHead>
                                        <TableHead className="w-[15%] text-gray-700 dark:text-gray-300 font-bold text-center">Rating</TableHead>
                                        <TableHead className="w-[15%] text-gray-700 dark:text-gray-300 font-bold text-right">Enrolled At</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {userenrolledcourses.map((enrollment) => (
                                        // The 'enrollment' object is the Mongoose document returned by your API
                                        <TableRow 
                                            key={enrollment._id} 
                                            className="hover:bg-blue-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                                        >
                                            {/* Course Title */}
                                            <TableCell className="font-semibold text-gray-900 dark:text-white">
                                                {enrollment.course?.name || 'N/A'}
                                            </TableCell>
                                            
                                            {/* Instructor */}
                                            <TableCell className="text-sm text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                                                <User className="h-4 w-4 inline mr-1 text-red-500" />
                                                {enrollment.course?.author?.name || 'Unknown'}
                                            </TableCell>
                                            
                                            {/* Course Price */}
                                            <TableCell className="text-sm font-medium text-gray-800 dark:text-gray-200 text-right hidden sm:table-cell">
                                                <DollarSign className="h-4 w-4 inline mr-0.5 text-green-500" />
                                                {enrollment.course?.price?.toFixed(2) || 'FREE'}
                                            </TableCell>
                                            
                                            {/* Course Rating */}
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                    <span className="font-semibold text-gray-900 dark:text-white">
                                                        {enrollment.course?.rating?.toFixed(1) || '0.0'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            
                                            {/* Enrolled At */}
                                            <TableCell className="text-sm text-gray-500 dark:text-gray-400 text-right">
                                                <Calendar className="h-4 w-4 inline mr-1 text-blue-500" />
                                                {formatDate(enrollment.enrolledAt)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <h1 className='text-3xl font-bold text-red-500 dark:text-red-400 mb-4'>
                            Enrolled courses ni hai bhai!
                        </h1>
                        <p className='text-gray-600 dark:text-gray-400'>
                            It looks like you haven't started any courses yet.
                        </p>
                        <Button 
                            onClick={() => navigate('/seeallcourses')}
                            className="mt-6 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                        >
                            Explore Courses
                        </Button>
                    </div>
                )}
                
                {/* Removed extra CTA section to simplify the page, replaced by empty state CTA */}
            </div>
        </div>
  )
}

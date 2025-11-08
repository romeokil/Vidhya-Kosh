import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, DollarSign, List, Star, FileText, CheckCircle,PictureInPicture } from 'lucide-react';
import { useSelector ,useDispatch} from 'react-redux';
import { update } from '@/redux/authSlice.ts';

// --- SHADCN/UI COMPONENTS (Assuming you have these) ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

// --- Your Navbar Component ---
import { Navbar } from '../../components/Navbar.tsx'; // Adjust path as needed

export function CreateCourse() {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    // Assuming you still want to use the active user's ID for the course creator
    const activeUser = useSelector((state) => state.auth.activeUser);

    // 1. Course State Management
    const [courseDetails, setCourseDetails] = useState({
        name: '',
        description: '',
        price: '', // Store as string initially
        rating: 0,
        logo:null // Default rating (can be hidden or made read-only for creation)
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState(null); // For success/error messages

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCourseDetails(prevDetails => ({
            ...prevDetails,
            [id]: value
        }));
    };

    // for file change

    const handlefileChange=(e)=>{
        setCourseDetails((prevDetails)=>({...prevDetails,logo:e.target.files?.[0]}));
    }
    // 2. Handle Form Submission
    const handleCreateCourse = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setAlert(null);

        // --- Basic Form Validation ---
        if (!courseDetails.name || !courseDetails.description || !courseDetails.price) {
            setAlert({
                variant: "destructive",
                title: "Validation Error",
                description: "Please fill in all required fields (Name, Description, and Price)."
            });
            setIsSubmitting(false);
            return;
        }

        // Prepare data for API (Assuming the backend expects JSON)
        const courseData = {
            ...courseDetails,
            instructorId: activeUser?._id || 'UNKNOWN_INSTRUCTOR', // Use active user ID
            price: parseFloat(courseDetails.price), // Convert price to number
            // Rating is typically set by users, so we can omit or initialize it to 0/5
        };

        // --- API Call Placeholder ---
        try {
            const response=await fetch('http://localhost:8000/api/course/register',{
                method:'POST',
                headers:{
                    'Content-Type':'Application/JSON'
                },
                body:JSON.stringify(courseData),
                credentials:'include'
            })
            // Simulating a successful API response
            await new Promise(resolve => setTimeout(resolve, 1500));
            const data=await response.json();
            if(response.ok){
                 setAlert({
                variant: "default",
                title: "Success!",
                description: `Course "${courseDetails.name}" has been successfully created.`,
            });
            if(data.updatedinstructor){
                dispatch(update(data.updatedinstructor))
            }

              await new Promise(resolve => setTimeout(resolve, 1500));
              navigate('/instructorlanding')
            }
            else{
                setAlert({
                    variant:"destructive",
                    title:"Failure!!",
                    description:data.message
                })
            }
            // Optionally clear the form after success
            setCourseDetails({ name: '', description: '', price: '', rating: 0 });

        } catch (error) {
            setAlert({
                variant: "destructive",
                title: "Creation Failed",
                description: "An error occurred while trying to create the course. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // 3. Back Button Navigation
    const handleGoBack = () => {
        // Navigate back to the instructor dashboard
        navigate('/instructorlanding');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Navbar */}
            <Navbar />

            {/* Main Content Container */}
            <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

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
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Create New Course
                    </h1>
                </div>

                {/* Status Alert */}
                {alert && (
                    <Alert variant={alert.variant} className={`mb-6 ${alert.variant === 'destructive' ? 'border-red-500' : 'border-green-500'}`}>
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>{alert.description}</AlertDescription>
                    </Alert>
                )}

                {/* --- Course Creation Card --- */}
                <Card className="shadow-2xl border border-gray-200 dark:border-gray-700">
                    <CardHeader className="p-6">
                        <CardTitle className="text-xl flex items-center gap-2 text-blue-600 dark:text-indigo-400">
                            <BookOpen className="h-6 w-6" />
                            Course Details
                        </CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fill out the essential information for your new course.</p>
                        <Separator className="mt-2" />
                    </CardHeader>

                    <CardContent className="p-6 pt-0">
                        <form onSubmit={handleCreateCourse} className="space-y-6">

                            {/* Course Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center gap-1 font-semibold dark:text-gray-200">
                                    <FileText className="h-4 w-4 text-orange-500" /> Course Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., The Complete Full-Stack Web Development Bootcamp"
                                    value={courseDetails.name}
                                    onChange={handleInputChange}
                                    required
                                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="flex items-center gap-1 font-semibold dark:text-gray-200">
                                    <List className="h-4 w-4 text-green-500" /> Course Description <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Provide a detailed overview of what students will learn."
                                    value={courseDetails.description}
                                    onChange={handleInputChange}
                                    rows={5}
                                    required
                                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                />
                            </div>

                            {/* Price & Rating (Grid for responsiveness) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Price */}
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="flex items-center gap-1 font-semibold dark:text-gray-200">
                                        <DollarSign className="h-4 w-4 text-blue-500" /> Price (USD) <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="29.99"
                                        value={courseDetails.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        required
                                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    />
                                </div>

                                {/* Rating (Read-only as it's user-driven) */}
                                <div className="space-y-2">
                                    <Label htmlFor="rating" className="flex items-center gap-1 font-semibold dark:text-gray-200">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> Initial Rating
                                    </Label>
                                    <Input
                                        id="rating"
                                        type="number"
                                        placeholder="29.99"
                                        value={courseDetails.rating}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        required
                                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="logo" className="flex items-center gap-1 font-semibold dark:text-gray-200">
                                        <PictureInPicture className="h-4 w-4 text-yellow-500 fill-red-500" /> Logo
                                    </Label>
                                    <Input
                                        id="logo"
                                        name="logo"
                                        type="file"
                                        placeholder="29.99"
                                        onChange={handlefileChange}
                                        step="0.01"
                                        required
                                        className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Create Course Button */}
                            <Button
                                type="submit"
                                className="w-full py-6 text-lg font-bold bg-blue-600 hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating Course..." : "Create Course"}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Camera, Star, BookOpen } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '@/redux/authSlice.ts';
// --- SHADCN/UI COMPONENTS (Assuming you have these) ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from 'lucide-react';

// --- Your Navbar Component ---
import { Navbar } from '../../components/Navbar.tsx'; // Adjust path as needed

// Placeholder for the Profile Update Form component
const UpdateProfileForm = ({ activeUser, setIsDialogOpen, setParentAlert }) => {
    const dispatch = useDispatch();
    // Local state to manage form inputs, initialized with activeUser data
    const [formData, setFormData] = useState({
        name: activeUser?.name || '',
        // NOTE: Never pre-fill passwords in a real app, 
        // but for demonstrating control, we use the property here.
        // In reality, this field would just be empty or for confirming the old password.
        password: activeUser?.password || '',
        bio:activeUser?.bio || '',
        rating:activeUser?.rating || 0,
        profile_picture:activeUser?.profile_picture
    });

    // Handler to update local state on every keystroke
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    // for handling file change

    const handlefileChange=(e)=>{
        setFormData((prev)=>({...prev,profile_picture:e.target.files?.[0]}));
    }

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 1. Perform client-side validation here
        console.log("Submitting updated data:", formData);

        try {
            const formdata=new FormData();
            formdata.append('name',formData.name);
            formdata.append('password',formData.password);
            formdata.append('bio',formData.bio);
            formdata.append('rating',formData.rating);
            if(formData.profile_picture) formdata.append('file',formData?.profile_picture);
            const response = await fetch(`http://localhost:8000/api/instructor/update/${activeUser._id}`, {
                method: 'POST',
                body:formdata,
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                setParentAlert({
                    variant: "default",
                    title: "Success!!",
                    description: "User Profile Successfully Updated!!!"
                })
                dispatch(update(data.updateduser));
            }
            else {
                setParentAlert({
                    variant: 'destructive',
                    title: "Failure!",
                    description: "Sorry Profile Updation Failed!!"
                })
            }
        }
        catch (error) {
            setParentAlert({
                variant: "destructive",
                title: "Failure",
                description: `Unkonwn Error Occurred! || ${error}`
            })
        }
        finally {
            setIsDialogOpen(false);
        }

        // 2. Dispatch an action or call your API here to update the user data
        // Example: dispatch(updateUser(formData));

        // 3. Close the dialog after submission

    }
    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name-input" className="text-right">Name</Label>
                    <Input
                        id="name-input"
                        name="name"
                        value={formData.name}
                        onChange={handleChange} // 👈 FIX: onChange handler is required
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password-input" className="text-right">Password</Label>
                    <Input
                        id="password-input"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password} // Should only be used for demonstration
                        onChange={handleChange} // 👈 FIX: onChange handler is required
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="bio" className="text-right">Bio</Label>
                    <Input
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange} // 👈 FIX: onChange handler is required
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rating" className="text-right">Rating</Label>
                    <Input
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange} // 👈 FIX: onChange handler is required
                        className="col-span-3"
                    />
                </div>
                {/* why i am not able to change the value of this field */}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="profile_picture" className="text-right">Profile Picture:</Label>
                    <Input
                        id="profile_picture"
                        name="profile_picture"
                        type="file"
                        onChange={handlefileChange} // 👈 FIX: onChange handler is required
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
    );
}
export function InstructorProfile() {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog
    const [alert, setAlert] = useState(null);
    // 1. Fetch User Data
    const activeUser = useSelector((state) => state.auth.activeUser);

    // Placeholder data customized for an Instructor
    const instructor = activeUser || {
        name: "Dr. Evelyn Reed",
        role: "Instructor",
        profilePictureUrl: "https://i.pravatar.cc/150?img=49", // Example image
        bio: "Experienced professional educator specializing in full-stack development and data science. Dedicated to creating high-quality, practical course content.",
        rating: 4.8, // New field for instructor
    };


    // Function to handle the back button click
    const handleGoBack = () => {
        // Replace '/instructordashboard' with the actual path to your instructor's landing page
        navigate('/instructorlanding');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* 1. Navbar */}
            <Navbar />
            {alert && (
                <div className='w-3/5 mx-auto'>
                    <Alert variant={alert.variant} className="mb-4">
                        {/* Use an icon for visual impact */}
                        {alert.variant === 'destructive' ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>{alert.description}</AlertDescription>
                    </Alert>
                </div>
            )}

            {/* 2. Main Content Container */}
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                {/* Header Row: Back Button and Page Title */}
                <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
                    <Button
                        variant="outline"
                        onClick={handleGoBack}
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Instructor Profile
                    </h1>
                </div>

                {/* --- Profile Card --- */}
                <Card className="shadow-2xl border border-gray-200 dark:border-gray-700">
                    <CardHeader className="p-6 pb-0">
                        <CardTitle className="text-2xl flex items-center justify-between">
                            Instructor Details
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}> {/* Control Dialog visibility */}
                                <DialogTrigger asChild>
                                    <Button variant="outline">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    {/* Render the controlled form component here */}
                                    <UpdateProfileForm
                                        activeUser={activeUser}
                                        setIsDialogOpen={setIsDialogOpen}
                                        setParentAlert={setAlert}// Pass state setter to close dialog
                                    />
                                </DialogContent>
                            </Dialog>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 pt-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                        {/* 3. Profile Picture & Name (Left Column) */}
                        <div className="flex flex-col items-center space-y-4 md:col-span-1 border-r md:border-r-0 border-b md:border-b-0 pb-6 md:pb-0 md:pr-8">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-4 border-orange-400 dark:border-yellow-400 shadow-lg">
                                    <AvatarImage src={instructor.profile_picture|| "default_avatar.jpg"} alt={instructor.name} />
                                    <AvatarFallback className="text-3xl bg-orange-100 dark:bg-yellow-900 text-orange-700 dark:text-yellow-200">
                                        {instructor.name ? instructor.name.charAt(0) : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mt-2 text-gray-800 dark:text-gray-100">{instructor.name}</h2>
                        </div>

                        {/* 4. Main Instructor Content (Right Columns) */}
                        <div className="md:col-span-2 space-y-4 pt-4 md:pt-0">

                            {/* Role */}
                            <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                                <Briefcase className="h-5 w-5 text-orange-500 dark:text-yellow-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
                                    <p className="font-bold text-lg text-gray-900 dark:text-white capitalize">{instructor.role}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                                <Star className="h-5 w-5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Instructor Rating</p>
                                    <p className="font-bold text-lg text-gray-900 dark:text-white">{instructor.rating} out of 5</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                                    <BookOpen className="h-4 w-4" /> Professional Bio
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 italic whitespace-pre-line">
                                    {instructor.bio}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
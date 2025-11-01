import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, Camera, Edit } from 'lucide-react';
import { useSelector } from 'react-redux';

// --- SHADCN/UI COMPONENTS (Assuming you have these) ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- Your Navbar Component ---
import { Navbar } from '../../components/Navbar.tsx'; // Adjust path as needed

// Placeholder for the Profile Update Form component
const UpdateProfileForm = () => (
    <div className="text-sm text-gray-500 dark:text-gray-400 p-4 border rounded-lg mt-4 bg-gray-50 dark:bg-gray-800">
        <p>Your profile update form component will go here (e.g., fields for Name, Picture).</p>
        <p>For now, this is a placeholder to show where the 'Update Profile' action leads.</p>
    </div>
);


export function UserProfile() {
    const navigate = useNavigate();
    
    // 1. Fetch User Data
    const activeUser = useSelector((state) => state.auth.activeUser);

    // Placeholder data in case Redux state is null (for testing purposes)
    const user = activeUser || {
        name: "Guest User",
        role: "Visitor",
        profilePictureUrl: "https://i.pravatar.cc/150?img=65", // Example image
    };

    // State to toggle the update form visibility
    const [isEditing, setIsEditing] = React.useState(false);
    
    // Function to handle the back button click
    const handleGoBack = () => {
        // Replace '/userlanding' with the actual path to your user's landing page
        navigate('/userlanding'); 
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* 1. Navbar */}
            <Navbar />

            {/* 2. Main Content Container */}
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header Row: Back Button and Page Title */}
                <div className="flex justify-between items-center mb-6">
                    <Button 
                        variant="outline" 
                        onClick={handleGoBack} 
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        My Profile
                    </h1>
                </div>

                {/* --- Profile Card --- */}
                <Card className="shadow-2xl border border-gray-200 dark:border-gray-700">
                    <CardHeader className="p-6 pb-0">
                        <CardTitle className="text-2xl flex items-center justify-between">
                            User Information
                            <Button 
                                variant="default" 
                                size="sm" 
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                {isEditing ? "Cancel Update" : "Update Profile"}
                            </Button>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6 pt-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        
                        {/* 3. Profile Picture (Left Column) */}
                        <div className="flex flex-col items-center space-y-4 md:col-span-1 border-r md:border-r-0 border-b md:border-b-0 pb-6 md:pb-0 md:pr-8">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-4 border-blue-400 dark:border-indigo-400 shadow-lg">
                                    <AvatarImage src={user.profilePictureUrl || "default_avatar.jpg"} alt={user.name} />
                                    <AvatarFallback className="text-3xl bg-blue-100 dark:bg-indigo-900 text-blue-700 dark:text-indigo-200">
                                        {user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                {/* Placeholder for a picture upload overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mt-2 text-gray-800 dark:text-gray-100">{user.name}</h2>
                        </div>

                        {/* 4. Main User Content (Right Columns) */}
                        <div className="md:col-span-2 space-y-4 pt-4 md:pt-0">
                            {/* Name */}
                            <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                                <User className="h-5 w-5 text-blue-500 dark:text-indigo-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                                    <p className="font-bold text-lg text-gray-900 dark:text-white">{user.name}</p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                                <Briefcase className="h-5 w-5 text-blue-500 dark:text-indigo-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
                                    <p className="font-bold text-lg text-gray-900 dark:text-white capitalize">{user.role}</p>
                                </div>
                            </div>
                            
                            {/* Profile Details (Placeholder for more complex data) */}
                            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">About Me</p>
                                <p className="text-gray-700 dark:text-gray-300 italic">
                                    {/* Placeholder for a detailed profile description */}
                                    "A passionate {user.role.toLowerCase()} dedicated to learning and growth."
                                </p>
                            </div>

                            {/* 5. Profile Update Section (Conditional Rendering) */}
                            {isEditing && <UpdateProfileForm />}
                        </div>
                        
                    </CardContent>
                </Card>
                
            </div>
        </div>
    );
}
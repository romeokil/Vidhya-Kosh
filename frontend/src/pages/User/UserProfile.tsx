import { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Briefcase, Camera, Edit } from 'lucide-react';
import { useSelector,useDispatch } from 'react-redux';
import { update } from '@/redux/authSlice.ts';

// --- SHADCN/UI COMPONENTS ---
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


// --- NEW: Dedicated Component for the Editable Form ---
const EditProfileDialog = ({ user, activeUser, setIsDialogOpen ,setParentAlert}) => {
    const dispatch=useDispatch();
    // Local state to manage form inputs, initialized with activeUser data
    const [formData, setFormData] = useState({
        name: activeUser?.name || '',
        // NOTE: Never pre-fill passwords in a real app, 
        // but for demonstrating control, we use the property here.
        // In reality, this field would just be empty or for confirming the old password.
        password: activeUser?.password || '',
    });

    // Handler to update local state on every keystroke
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 1. Perform client-side validation here
        console.log("Submitting updated data:", formData);

        try {
            const response = await fetch(`http://localhost:8000/api/user/update/${activeUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                setParentAlert({
                    variant: "default",
                    title: "Success!!",
                    description: "User Profile Successfully Updated!!!"
                })
                dispatch(update(data.usertobeUpdated));
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

        // 2. Dispatch an action or call your API here to update the user data
        // Example: dispatch(updateUser(formData));

        // 3. Close the dialog after submission
        setIsDialogOpen(false);
    };

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
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
    );
};


// --- Your main UserProfile Component ---
export function UserProfile() {
    const navigate = useNavigate();
    const activeUser = useSelector((state) => state.auth.activeUser);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control the dialog
    const [alert, setAlert] = useState(null);

    // Placeholder data
    const user = activeUser || {
        name: "Guest User",
        role: "Visitor",
        profile_picture: "https://i.pravatar.cc/150?img=65",
        password: "password123" // added password for completeness
    };

    const handleGoBack = () => {
        navigate('/userlanding');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
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
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" onClick={handleGoBack} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        My Profile
                    </h1>
                </div>

                <Card className="shadow-2xl border border-gray-200 dark:border-gray-700">
                    <CardHeader className="p-6 pb-0">
                        <CardTitle className="text-2xl flex items-center justify-between">
                            User Information
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}> {/* Control Dialog visibility */}
                                <DialogTrigger asChild>
                                    <Button variant="outline">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    {/* Render the controlled form component here */}
                                    <EditProfileDialog
                                        user={user}
                                        activeUser={activeUser}
                                        setIsDialogOpen={setIsDialogOpen} 
                                        setParentAlert={setAlert}// Pass state setter to close dialog
                                    />
                                </DialogContent>
                            </Dialog>
                        </CardTitle>
                    </CardHeader>

                    {/* ... Rest of the CardContent is unchanged ... */}
                    <CardContent className="p-6 pt-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {/* 3. Profile Picture (Left Column) */}
                        <div className="flex flex-col items-center space-y-4 md:col-span-1 border-r md:border-r-0 border-b md:border-b-0 pb-6 md:pb-0 md:pr-8">
                            <div className="relative group">
                                <Avatar className="h-32 w-32 border-4 border-blue-400 dark:border-indigo-400 shadow-lg">
                                    <AvatarImage src={user.profile_picture || "default_avatar.jpg"} alt={user.name} />
                                    <AvatarFallback className="text-3xl bg-blue-100 dark:bg-indigo-900 text-blue-700 dark:text-indigo-200">
                                        {user.name ? user.name.charAt(0) : 'U'}
                                    </AvatarFallback>
                                </Avatar>
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

                            {/* Profile Details */}
                            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">About Me</p>
                                <p className="text-gray-700 dark:text-gray-300 italic">
                                    "A passionate {user.role.toLowerCase()} dedicated to learning and growth."
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
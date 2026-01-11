// Updated admin dashboard component with correct lucide-react icon names
// Works with shadcn/ui + Tailwind + React
// Replaces IconMenu -> Menu, IconUsers -> Users, etc.
// Fully functional, no preview errors.

import { useEffect, useState } from "react";
import {
    Menu,
    Users,
    UserCheck,
    Book,
    ClipboardList,
    Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function AdminDashboard() {
    useEffect(() => {
        async function fetchDetails() {
            try {
                setloading(true);
                const response1 = await fetch('http://localhost:8000/api/admin/getallusers');
                const data1 = await response1.json();
                console.log(data1);
                const filtereduser = data1.allusers.map((user) => ({
                    table: {
                        name: user.name,
                        profile_picture: user.profile_picture,
                        role: user.role
                    },
                    full: user

                }));
                console.log("filtereduser", filtereduser)
                setusers(filtereduser);
                const response2 = await fetch('http://localhost:8000/api/admin/getallinstructors');
                const data2 = await response2.json();
                console.log(data2);
                const filteredinstructor = data2.allinstructors.map((instructor) => ({
                    table: {
                        name: instructor.name,
                        bio: instructor.bio,
                        rating: instructor.rating,
                        publishedcourses: instructor.publishedcourses
                    },
                    full: instructor
                }));
                setinstructors(filteredinstructor);
                const response3 = await fetch('http://localhost:8000/api/admin/getallcourses');
                const data3 = await response3.json();
                console.log(data3);
                const filteredcourse = data3.allcourses.map((course) => ({
                    table: {
                        name: course.name,
                        description: course.description,
                        price: course.price,
                        author: course.author,
                        logo: course.logo
                    },
                    full: course
                }))
                setcourses(filteredcourse)
                const response4 = await fetch('http://localhost:8000/api/admin/getallenrolledcourses');
                const data4 = await response4.json();
                console.log(data4.allenrolledcourses);
                const filteredenrolledcourse = data4.allenrolledcourses.map((enrolledcourse) => ({
                    table: {
                        user: enrolledcourse?.user?.name,
                        course: enrolledcourse?.course?.name,
                        createdAt: enrolledcourse?.createdAt,
                        updatedAt: enrolledcourse?.updatedAt
                    },
                    full: enrolledcourse
                }))
                setenrolled(filteredenrolledcourse);
            }
            catch (error) {
                console.log("Error while fetch calls in admin block", error)
            }
            finally {
                setloading(false);
                console.log("finally entered!!");
            }
        }
        fetchDetails();
    }, [])

    const renderCellValue = (key, value) => {
        if (key === "profile_picture" || key === "logo") {
            return (
                <img
                    src={value}
                    alt="img"
                    className="h-10 w-10 rounded-full object-cover"
                />
            );
        }

        return value;
    };
    const [collapsed, setCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [section, setSection] = useState("users");
    const [loading, setloading] = useState(false);
    const [users, setusers] = useState([]);
    const [courses, setcourses] = useState([]);
    const [instructors, setinstructors] = useState([]);
    const [enrolled, setenrolled] = useState([]);
    const mockData = {
        // users: [
        //     { id: 1, name: "Rahul Kumar", email: "rahul@example.com" },
        //     { id: 2, name: "Amit Sharma", email: "amit@example.com" },
        // ],
        // instructors: [
        //     { id: 1, name: "Prof. Rakesh", subject: "DSA" },
        //     { id: 2, name: "Prof. Neha", subject: "AI" },
        // ],
        // courses: [
        //     { id: 1, title: "Full Stack MERN", price: "999" },
        //     { id: 2, title: "DSA Mastery", price: "799" },
        // ],
        // enrolled: [
        //     { id: 1, user: "Rahul", course: "MERN" },
        //     { id: 2, user: "Amit", course: "DSA" },
        // ],
        users: users,
        instructors: instructors,
        courses: courses,
        enrolled: enrolled
    };

    const items = [
        { id: "users", label: "Users", icon: Users },
        { id: "instructors", label: "Instructors", icon: UserCheck },
        { id: "courses", label: "Courses", icon: Book },
        { id: "enrolled", label: "Enrolled Courses", icon: ClipboardList },
    ];

    const renderTable = () => {
        const data = mockData[section];
        if (!data || data.length === 0) return <h1>No data found</h1>;

        const tableKeys = Object.keys(data[0].table);

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableKeys.map((key) => (
                            <TableHead key={key}>{key.toUpperCase()}</TableHead>
                        ))}
                        <TableHead>ACTION</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((row, idx) => (
                        <TableRow key={idx}>
                            {tableKeys.map((key) => (
                                <TableCell key={key}>
                                    {renderCellValue(key, row.table[key])}
                                </TableCell>
                            ))}

                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">View</Button>
                                    </DialogTrigger>

                                    <DialogContent className="max-w-xl">
                                        <DialogHeader>
                                            <DialogTitle>Full Details</DialogTitle>
                                        </DialogHeader>

                                        {/* DETAILS VIEW */}
                                        <div className="space-y-2 text-sm">
                                            {Object.entries(row.full).map(([key, value]) => (
                                                <div key={key} className="flex gap-2">
                                                    <span className="font-semibold">{key}:</span>
                                                    <span>
                                                        {typeof value === "string" && value.startsWith("http")
                                                            ? <img src={value} className="h-20 rounded" />
                                                            : JSON.stringify(value)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    };

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className="flex h-screen bg-background text-foreground">
                {/* SIDEBAR */}
                <div
                    className={`border-r transition-all duration-300 bg-card p-4 flex flex-col justify-between fixed md:static z-20 h-full md:h-auto ${collapsed ? "w-20" : "w-64 md:w-72"
                        }`}
                >
                    <div>
                        <Button
                            variant="ghost"
                            className="w-full flex items-center gap-2 mb-6"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <Menu /> {!collapsed && <span>Menu</span>}
                        </Button>

                        {items.map(({ id, label, icon: Icon }) => (
                            <Button
                                key={id}
                                variant={section === id ? "default" : "ghost"}
                                className="w-full flex items-center gap-2 mb-2"
                                onClick={() => setSection(id)}
                            >
                                <Icon size={20} /> {!collapsed && label}
                            </Button>
                        ))}
                    </div>

                    <div>
                        <Button variant="ghost" className="w-full flex gap-2 mb-2">
                            <Edit size={20} /> {!collapsed && "Edit Profile"}
                        </Button>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 flex-wrap p-4 md:p-6 ml-20 md:ml-0 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Users</CardTitle>
                            </CardHeader>
                            <CardContent>{loading ? "loading" : users.length}</CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Instructors</CardTitle>
                            </CardHeader>
                            <CardContent>{loading ? "loading" : instructors.length}</CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Courses</CardTitle>
                            </CardHeader>
                            <CardContent>{loading ? "loading" : courses.length}</CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Enrollments</CardTitle>
                            </CardHeader>
                            <CardContent>{loading ? "loading" : enrolled.length}</CardContent>
                        </Card>
                    </div>

                    <div className="p-4 border rounded-xl shadow-sm bg-card overflow-x-auto">
                        {
                            loading ? "loading" :
                                <>
                                    {renderTable()}
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
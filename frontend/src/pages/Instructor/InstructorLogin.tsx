import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from 'lucide-react';
function InstructorLogin() {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [alert, setalert] = useState(null);
    const SubmitHandler = async (e) => {
        e.preventDefault();
        console.log(name);
        console.log(password);
        try {
            const response = await fetch(`http://localhost:8000/api/instructor/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/JSON'
                },
                body: JSON.stringify({ name, password }),
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                setalert({
                    variant: "default",
                    title: "Success!!",
                    description: data.message
                })
                navigate('/instructorlanding')
            }
            else {
                setalert({
                    variant: "destructive",
                    title: "Failure",
                    description: data.message
                })
            }
        }
        catch (error) {
            setalert({
                variant: "destructive",
                title: "Failure",
                description: "Unknown Error occured!!"
            })
            console.log("Error while Instructor Login", error);
        }


    }
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-3/5 mx-auto'>
                {alert && (
                    <Alert variant={alert.variant} className="mb-4">
                        {/* Use an icon for visual impact */}
                        {alert.variant === 'destructive' ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertDescription>{alert.description}</AlertDescription>
                    </Alert>
                )}
                <Button variant="outline"><Link to="/checklogin">Back Button</Link></Button>
                <form onSubmit={SubmitHandler} className='flex flex-col gap-3 p-2'>
                    <div>
                        <label>
                            Enter Your Name:
                        </label>
                        <Input placeholder='rahul..' type="text" onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div>
                        <label>
                            Enter Your Password:
                        </label>
                        <Input placeholder='rahul..' type="password" onChange={(e) => setpassword(e.target.value)} />
                    </div>
                    <Button>Submit</Button>
                    <h2>If Not Registered!  <span className='hover:text-lg hover:underline'><Link to="/instructorregister">Register</Link></span></h2>
                </form>
            </div>
        </div>
    )
}

export default InstructorLogin
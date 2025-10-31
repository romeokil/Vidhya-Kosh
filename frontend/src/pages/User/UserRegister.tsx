import { use, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from 'lucide-react';
export default function UserRegister() {
    const navigate=useNavigate();
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [alert, setalert] = useState(null);
    const HandleSubmit = async (e) => {
        e.preventDefault();
        setalert(null);
        console.log("name->", name);
        console.log("password->", password);
        // fetch call 
        try {
            const response = await fetch('http://localhost:8000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify({ name, password, "role": "User" }),
                credentials: 'include'
            })
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setalert({
                    variant:"default",
                    title:'Success',
                    description:data.message
                })
                navigate('/userlogin')
            }
            else {
                setalert({
                    variant:"destructive",
                    title:"Failure" ,
                    description:data.message
                })
            }
        }
        catch (error) {
            setalert({
                variant:"destructive",
                title:"Failure",
                description:"Error while registering User!"
            })
            console.log("Error while registering User!!", error);
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
                <Button variant="outline"><Link to="/checkregister">Back Button</Link></Button>
                <form onSubmit={HandleSubmit} className='flex flex-col gap-3 p-2'>
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
                    <div>

                    </div>
                    <h2>If Already Registered!  <span className='hover:text-lg hover:underline'><Link to="/userlogin">Login</Link></span></h2>
                </form>
            </div>
        </div>
    )
}

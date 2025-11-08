import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from 'lucide-react';
export default function InstructorRegister() {
    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [bio, setbio] = useState('');
    const [rating, setrating] = useState('');
    const [file,setfile]=useState(null);
    const [alert, setalert] = useState('');
    const SubmitHandler = async (e) => {
        e.preventDefault();
        console.log(name);
        console.log(password);
        console.log(bio);
        console.log(rating);
        console.log(file);
        try {
            const formdata=new FormData();
            formdata.append('name',name);
            formdata.append('password',password);
            formdata.append('bio',bio);
            formdata.append('rating',rating);
            formdata.append('file',file);
            const response = await fetch(`http://localhost:8000/api/instructor/register`, {
                method: 'POST',
                body: formdata,
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok) {
                setalert({
                    variant: "default",
                    title: "Success",
                    description: data.message
                })
                navigate('/instructorlogin')
            }
            else {
                setalert({
                    variant: "destructive",
                    title: "Failure!!",
                    description: data.message
                })
            }
        }
        catch (error) {
            setalert({
                variant: "destructive",
                title: "Failure!",
                description: "Unknown Error Happened!!"
            })
            console.log("Error while registering Instructor", error);
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
                    <div>
                        <label>
                            Bio:
                        </label>
                        <Input placeholder="Having an experince for 10+ years in IT industry.." type="text" onChange={(e) => setbio(e.target.value)} />
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input type="number" name="number" id="number" onChange={(e) => setrating(e.target.value)} />
                    </div>
                    <div>
                        <label>Profile Picture:</label>
                        <input type="file" onChange={(e)=>setfile(e.target.files?.[0])} placeholder='Profile photo'/>
                    </div>
                    <Button>Submit</Button>
                    <h2>If Already Registered!  <span className='hover:text-lg hover:underline'><Link to="/instructorlogin">Login</Link></span></h2>

                </form>
            </div>
        </div>
    )
}

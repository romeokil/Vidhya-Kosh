import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export default function InstructorRegister() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-3/5 mx-auto'>
                <form className='flex flex-col gap-3 p-2'>
                    <div>
                        <label>
                            Enter Your Name:
                        </label>
                        <Input placeholder='rahul..' />
                    </div>
                    <div>
                        <label>
                            Enter Your Password:
                        </label>
                        <Input placeholder='rahul..' />
                    </div>
                    <div>
                        <label>
                            Bio:
                        </label>
                        <Input placeholder="Having an experince for 10+ years in IT industry.." />
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input type="number" name="number" id="number" />
                    </div>
                    <Button>Submit</Button>
                </form>
            </div>
        </div>
    )
}

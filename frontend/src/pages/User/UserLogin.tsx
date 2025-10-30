import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
export default function UserLogin() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-3/5 mx-auto'>
            <form className='flex flex-col gap-3 p-2'>
                <div>
                    <label>
                        Enter Your Name:
                    </label>
                    <Input placeholder='rahul..'/>
                </div>
                <div>
                    <label>
                        Enter Your Password:
                    </label>
                    <Input placeholder='rahul..'/>
                </div>
                <Button>Submit</Button>
            </form>
        </div>
    </div>
  )
}

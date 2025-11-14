import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
export default function CheckRegister() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-2'>
            <Button asChild variant="secondary">
              <Link to='/userregister'>With User</Link>
            </Button>
            <Button variant="secondary">
              <Link to='/instructorregister'>With Instructor</Link>
            </Button>
        </div>
    </div>
  )
}

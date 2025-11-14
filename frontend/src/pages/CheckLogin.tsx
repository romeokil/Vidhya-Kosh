import { Button } from '@/components/ui/button'
import {Link} from 'react-router-dom'
export default function CheckLogin() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-2'>
            <Button variant="secondary">
              <Link to="/userlogin">With User</Link>
            </Button>
            <Button variant="secondary">
              <Link to="/instructorlogin">With Instructor</Link>
            </Button>
            <Button variant="secondary">
              <Link to='/adminlogin'>With Admin</Link>
            </Button>
        </div>
    </div>
  )
}

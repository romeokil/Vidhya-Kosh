import { Button } from '@/components/ui/button'
export default function CheckRegister() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-wrap'>
            <Button variant="secondary">With User</Button>
            <Button variant="secondary">With Instructor</Button>
            <Button variant="secondary">With Admin</Button>
        </div>
    </div>
  )
}

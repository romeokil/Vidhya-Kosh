import { Button } from '@/components/ui/button'
export default function CheckLogin() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-2'>
            <Button variant="secondary">With User</Button>
            <Button variant="secondary">With Instructor</Button>
            <Button variant="secondary">With Admin</Button>
        </div>
    </div>
  )
}

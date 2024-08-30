import Button from '@/Utils/Button'

export default function NotFound() {
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <h2 className='text-3xl center font-[600]'>404 Not Found</h2>
      <p>Could not find requested resource</p>
      <Button href='/' borderColor='black' bgColor='black' color='white' text='Go back home' round='2xl' />
    </div>
  )
}
import Button from '@/Utils/Button'

export default function NotFound() {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col gap-y-4'>
      <h2 className='text-3xl flex items-end font-[600]'><span className='text-red-600 text-4xl flex justify-center'>404&nbsp;</span> Not Found</h2>
      <p>Could not find requested resource</p>
      <Button href='/' borderColor='black' bgColor='black' color='white' text='Go back home' round='2xl' />
    </div>
  )
}
import React from 'react'
import Button from '@/Utils/Button'

const Footer = () => {
  return (
    <div className='flex flex-col gap-y-4 justify-center'>
      <div className='flex flex-col gap-y-2'>
        <h1>Join Our Community of Lifelong Learners</h1>
        <Button padding='2' borderColor='black' bgColor='white' text='Sign Up' href='/auth' round='3xl' />
      </div>
      <div className='flex flex-col gap-y-2'>
        <p>Already one of us?</p>
        <Button borderColor='black' bgColor='black' text='Log in' href='/auth' round='3xl' color='white' />
      </div>
    </div>
  )
}

export default Footer
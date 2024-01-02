import Hero from "@/Components/hero";
import Carousel from "@/Utils/Carousel";
import Trending from "@/Components/trending";
import Footer from "@/Components/footer";


export const metadata = {
  title: 'BloggED',
  description: 'An online platform to read and write your favourite educational blogs',
}


export default function Home() {
  return (
    <>
      <div className="text-center" >
        <Hero />
      </div>
      <div style={{ backgroundColor: '#000700' }} className='p-[10rem] h-[125vh] flex justify-center flex-col items-center'>
      <h1 className='text-6xl text-white'>Read what's</h1>
        
        <Carousel />
      </div>
      <div className='flex flex-col justify-center  h-full'>
        <Trending />
        <div className='flex justify-center w-full'>
          <Footer />
        </div>
      </div>
    </>

  )
}

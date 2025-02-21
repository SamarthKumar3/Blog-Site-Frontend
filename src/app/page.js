import Hero from "@/Components/hero";
import Carousel from "@/Utils/Carousel";
import Footer from "@/Components/footer";
import Header from "@/Components/header";
import Articles from "@/Components/Articles";

export const metadata = {
  title: 'BloggED',
  description: 'An online platform to read and write your favourite educational blogs',
}

export default function Home() {
  return (
    <>
      <Header />
      <div id="modal-hook"></div>
      <div className="h-full">
        <Hero />
      </div>
      <div style={{ backgroundColor: '#000700' }} className='p-[5rem]  flex justify-center flex-col items-center h-[120vh]'>
        <h1 className='text-6xl text-white'>Read what&apos;s</h1>
        <Carousel />
      </div>
      <div className='flex flex-col p-10'>
        <Articles />
      </div>
      <div className='flex justify-center w-full bg-blue-400 p-8'>
        <Footer />
      </div>
    </>

  )
}

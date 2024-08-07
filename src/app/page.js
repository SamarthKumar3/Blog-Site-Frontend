import Hero from "@/Components/hero";
import Carousel from "@/Utils/Carousel";
import Trending from "@/Components/trending";
import Footer from "@/Components/footer";
import Header from "@/Components/header"; 


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
      <div style={{ backgroundColor: '#000700' }} className='p-[10rem]  flex justify-center flex-col items-center h-screen'>
        <h1 className='text-6xl text-white'>Read what's</h1>
        <Carousel />
      </div>
      <div className='flex flex-col p-10'>
        <Trending />
      </div>
      <div className='flex justify-center w-full bg-blue-400 p-8'>
        <Footer />
      </div>
    </>

  )
}

//frontend:
// 1. Improve landing page, Posts, write page
// 2. Add Modals for user interaction 
// 3. Add more features like search, categories, tags, comments, likes  \/
// 4. Add user profile page : profile picture, bio, posts, "talks about" section


// backend:
// 1. Allow file upload \/
// 2. Allow user to upload pictures (profile picture, post images) \/
// 3. Add JWT authentication for passwords
// 4. Optimise queries and secure passwords
// 5. Connect user and posts
// 6. Change schema to include post likes \/, comments \/; user Bio, profile picture \/
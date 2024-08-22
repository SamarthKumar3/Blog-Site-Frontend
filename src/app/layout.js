// import Header from '@/Components/header'
import './globals.css'
import { openSans } from '@/fonts/fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} font-[400]`} >
        {/* <Header/> */}
        {children}
      </body>
    </html>
  )
}

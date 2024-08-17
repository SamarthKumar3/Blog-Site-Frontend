// import Header from '@/Components/header'
import './globals.css'




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='' >
        {/* <Header/> */}
        {children}
      </body>
    </html>
  )
}

// import Header from '@/Components/header'
import './globals.css'
import { openSans } from '@/fonts/fonts'
// src/app/layout.js
import { AuthProvider } from '@/Components/AuthProvider'; // Import the AuthProvider

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} font-[400]`}>
        <AuthProvider>
          {children} {/* Now all children have access to AuthContext */}
        </AuthProvider>
      </body>
    </html>
  );
}


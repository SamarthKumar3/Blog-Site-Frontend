import './globals.css'
import { openSans } from '@/fonts/fonts'
import { AuthProvider } from '@/Components/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} font-[400]`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <div id="backdrop-hook"></div>
        <div id="modal-hook"></div>
      </body>
    </html>
  );
}


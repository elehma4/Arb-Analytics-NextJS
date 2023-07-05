import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Arb Analytics',
  description: 'Arbitrum Ecosystem Analytics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-gray-800'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import './globals.css'
import { Inter } from 'next/font/google'
import {Providers} from './globalRedux/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Arbitrum Analytics',
  description: 'Arbitrum Ecosystem Analytics',
}

export default function RootLayout({ children }) {
  return (

    <Providers children = {children}>

    <html lang="en" className='bg-gray-800'>
      <body className={inter.className}>
          {children}
      </body>

    </html>

    </Providers>

  )
}

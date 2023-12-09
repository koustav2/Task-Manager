
import './globals.css'
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider, auth } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import Sidebar from '@/components/Sidebar';
import GlobalProviders from '@/components/providers/GlobalProviders';
import Providers from '@/components/providers/Providers';
import { ThemeProvider } from '@/context/ThemeProvider';
import { useTheme } from 'next-themes';
import ToasterProvider from '@/context/ToastProvider';
import getCurrentUser from '@/utils/getCurrentUser';



const nunito = Nunito({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A simple task manager',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getCurrentUser();
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${nunito.className}`} >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <NextTopLoader
            height={2}
            color="#27AE60"
            easing="cubic-bezier(0.53,0.21,0,1)"
          />
          <Providers>
            <GlobalProviders>
              {
                session ? (
                  <Sidebar />
                ) : null
              }
              <div className='w-full'>
                {children}
              </div>
            </GlobalProviders>
          </Providers>
        </ThemeProvider>
        <ToasterProvider />
      </body>
    </html>
  )
}

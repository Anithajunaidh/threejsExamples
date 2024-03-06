'use client'

import { ThemeProvider } from 'next-themes'


export function ThemeProviders({ children } : {children: React.ReactNode}) {
  return <ThemeProvider themes={['pink', 'red','blue', 'light', 'dark']}>{children}</ThemeProvider>
}


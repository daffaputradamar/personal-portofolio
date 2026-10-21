'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Dark by default whatever the OS is set to; the toggle still switches it
    // and next-themes remembers the visitor's choice.
    <ThemeProvider
      enableSystem={false}
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      {children}
      <ToasterProvider />
    </ThemeProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position='bottom-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}

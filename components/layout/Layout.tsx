import React from 'react'
import { useRouter } from 'next/router'
import HomeLayout from './HomeLayout'
import DashboardLayout from './DashboardLayout'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const isDashboard = router.pathname.startsWith('/dashboard')

  if (isDashboard) {
    return <DashboardLayout>{children}</DashboardLayout>
  }

  return <HomeLayout>{children}</HomeLayout>
}
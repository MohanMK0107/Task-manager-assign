"use client"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

interface SessionproviderProps {
  children:React.ReactNode;
  session:Session | null
}
export const SessionProviderWrapper = ({children , session}:SessionproviderProps)=>{
  return <SessionProvider session={session}>{children}</SessionProvider>
}
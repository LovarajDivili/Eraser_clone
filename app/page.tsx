"use client"
import React from 'react'
import { Hero } from "./_components/Hero";
import { Header } from "./_components/Header";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
export default function Home() {
  const {user} = useKindeBrowserClient()

  React.useEffect(() => {
    console.log(user)
  }, [user])

  return (
   <div>
    <Header />
    <Hero />
   </div>
  );
}

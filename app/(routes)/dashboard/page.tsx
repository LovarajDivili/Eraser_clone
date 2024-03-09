'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useQuery, useMutation, useConvex} from 'convex/react'
import {api} from '@/convex/_generated/api'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Header from './_components/Header';
import FileList from './_components/FileList'
 const Dashboard = () => {

  const convex = useConvex();

  const {user}:any = useKindeBrowserClient();
  // const getUser = useQuery(api.user.getUser, {email:user?.email})

  const createUser = useMutation(api.user.createUser)

  

  React.useEffect(() => {
    if(user) {
      checkUser();
    }
    
  },[user])

const checkUser = async() => {
  const result = await convex.query(api.user.getUser,{email:user?.email})
  if(!result?.length) {
    createUser({
      name: user?.given_name,
      email: user?.email,
      image: user?.picture

    }).then(resp => {
      console.log(resp, "RESP")
    })
  }

}


  return (
    <div className='p-8'>
      <Header />
      <FileList />
    </div>
  )
}

export default Dashboard



// React.useEffect(() => {
  //   if(user) {
  //     if(getUser === undefined || getUser?.length) {
  //       createUser({
  //         name: user?.given_name,
  //         email: user?.email,
  //         image: user?.picture

  //       }).then(resp => {
  //         console.log(resp, "RESP")
  //       })
  //     }
  //   }
  // },[user])

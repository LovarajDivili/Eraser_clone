import { Archive, ChevronDown, Flag, Github } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'
// import { FileListContext } from '@/app/_context/FilesListContext'
import SideNavTopSection,  { TEAM }  from './SideNavTopSection';
import SideNavBottomSection from './SideNavBottomSection';
import { FileListContext } from '@/app/_useContext/FilesListContext'

const SideNav = () => {
  const {user}:any=useKindeBrowserClient();
  const convex=useConvex();
  const [activeTeam,setActiveTeam]=useState<TEAM|any>();
  const [totalFiles,setTotalFiles]=useState<Number>();
  const {fileList_,setFileList_}=useContext(FileListContext);

  const createFile=useMutation(api.files.createFile);

  const onFileCreate = (fileName:string) => {
    console.log("fileName", fileName)
    createFile({
      fileName:fileName,
      teamId:activeTeam?._id,
      createdBy:user?.email,
      archive:false,
      document:'',
      whiteboard:''
    }).then(resp=>{
      if(resp)
      {
        getFiles();
        toast('File created successfully!')
      }
    },(e)=>{
      toast('Error while creating file')

    })
  }

  React.useEffect(() => {
    activeTeam&&getFiles();
  },[activeTeam])

  const getFiles=async()=>{
    const result=await convex.query(api.files.getFiles,{teamId:activeTeam?._id});
    console.log(result, "getFiles");
    setFileList_(result);
    setTotalFiles(result?.length)
  }

  return(
    <div 
    className="h-screen fixed w-72 border-r border-[1px] p-6
    flex flex-col"
    >
       <div className='flex-1'>
    <SideNavTopSection 
    user={user} 
    setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}
    />
    </div>
    <div>
    <SideNavBottomSection
    totalFiles={totalFiles}
    onFileCreate={onFileCreate}
    />
    </div>

    </div>
  )
}

export default SideNav
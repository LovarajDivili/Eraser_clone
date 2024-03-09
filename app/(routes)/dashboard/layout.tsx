"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNav from "./_components/SideNav";
import { FileListContext } from '@/app/_useContext/FilesListContext';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const convex = useConvex();
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const [fileList_,setFileList_]=React.useState();

  React.useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result: any = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      router.push("teams/create");
    }
  };

  return (
    <div>
      <FileListContext.Provider value={{fileList_,setFileList_}}>
      <div className="grid grid-cols-4">
        <div className="bg-white h-screen w-72 fixed">
          {" "}
          <SideNav />{" "}
        </div>
        <div className="col-span-4 ml-72">{children}</div>
      </div>
      </FileListContext.Provider>
    </div>
  );
};

export default DashboardLayout;

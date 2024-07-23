'use client'

import Header from "@/app/components/Header";
import TasksContainer from "@/app/components/TasksContainer";
import WithAuth from "../hocs/WthAuth";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import ProfileModal from "../components/ProfileUpdateModal";

// export const metadata: Metadata = {
//   title: "Chainthink Grants Program | Dashboard",
// };

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  

  const toogleModal =() => setIsOpen(!isOpen)

  return (
    <main className="h-screen w-screen flex relative flex-col items-center justify-between text-gray-300">
      <ProfileModal isOpen={isOpen} toogelModal={toogleModal}/>
      {WithAuth(Header, toogleModal)}
      <TasksContainer />
    </main>
  );
}

export default Dashboard;

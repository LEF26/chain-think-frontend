'use client';

import Header from "@/app/components/Header";
import TasksContainer from "@/app/components/TasksContainer";
import WithAuth from "../hocs/WithAuth";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import ProfileModal from "../components/ProfileUpdateModal";
import UploadReceiptModal from "../components/UploadReceiptModal";

// export const metadata: Metadata = {
//   title: "Chainthink Grants Program | Dashboard",
// };

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  

  const toogleModal =() => setIsOpen(!isOpen)
  const toogleReceiptModal =() => setIsReceiptOpen(!isReceiptOpen)

  return (
    <main className="h-screen w-screen flex relative flex-col items-center justify-between text-gray-300">
      <UploadReceiptModal isOpen={isReceiptOpen} toogelModal={toogleReceiptModal}/>
      <ProfileModal isOpen={isOpen} toogelModal={toogleModal}/>
      {WithAuth(Header, toogleModal, toogleReceiptModal)}
      <TasksContainer />
    </main>
  );
}

export default Dashboard;

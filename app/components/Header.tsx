import Image from "next/image";
import ActivityBoard from "./ActivityBoard";
import { User } from "@/types";

function Header({user, toogleModal}: {user:any, toogleModal: () => void}) {

  const getFullName = () => {
      return user?.displayName ? user?.displayName : user?.email
  }

  return (
    <header className=" h-[35%] w-full flex flex-col gap-[10%] justify-between rounded-b-[15px] bg-[#1b1b24]/70  p-4">
      <div onClick={toogleModal} className=" h-[40px] cursor-pointer flex items-center  rounded-[30px] w-[50%] md:w-[20%]">
        <Image
          className="h-[40px]  w-[40px]  rounded-full"
          height={300}
          width={300}
          alt="Cryto Logo"
          src={"/pngs/logo-main.png"}
        />
        <h2 className="text-end pr-[3px] text-[12px]"> {getFullName()}</h2>
      </div>

      {/* ActicityMenu */}
      <ActivityBoard toogleModal={toogleModal}/>
    </header>
  );
}

export default Header;

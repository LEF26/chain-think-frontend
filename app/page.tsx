import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex font-sans text-textColor min-h-screen w-screen  flex-col items-center justify-between p-10 md:p-20">
      <div className="flex flex-col w-full items-center gap-[10px]">
        <h1 className="text-md text-center md:text-3xl font-bold">
          Own, Control and Leverage Your Assets
        </h1>
        <span className="text-[10px] w-[80%] px-[10px] text-center md:text-sm">
          Own, Control and Leverage Your Digital Assets to maximize their value
          and drive growth
        </span>
      </div>

      <Image
        className=""
        height={300}
        width={300}
        alt="Cryto Logo"
        src={"/pngs/logo-main.png"}
      />

      <div className="flex flex-col items-center w-[80%] gap-2">
        <Link
          href={"/sign-in"}
          className=" w-full md:w-[30%] text-backgroundColor text-center bg-primaryColor rounded-[10px] border py-[10px]"
        >
          Get Started
        </Link>
        <span className="text-[10px] text-center px-[5px]">
          By tapping 'Get Started' you agree and adhere to out{" "}
          <span className="text-primaryColor">Terms of Service</span> and{" "}
          <span className="text-primaryColor">Privacy Policy</span>
        </span>
      </div>
    </main>
  );
}

"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import FormButton from "../components/FormButton";
import { FormEvent, FormEventHandler } from "react";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//     title: 'Chainthink Grants Program | Sign In'
// }

function SignUp() {
  const { loading, signIn, signInDetails, onTextChange, error } = useAuth();
 const router = useRouter()

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn(() => {
      router.push('/dashboard')
    });
  }

  return (
    <>
      <Head>
        <title>Chainthink Grants Program | Sign In</title>
      </Head>
      <main className="h-screen w-screen flex text-gray-700 items-center justify-center">
        <div className=" w-[80%] md:w-[35%] flex rounded-[15px] shadow-md py-[2%] gap-[5%] shadow-black flex-col items-center h-[60%] md:h-[80%] bg-white">
          <Image
            className="md:w-[100px] w-[70px] h-[70px] md:h-[100px]"
            height={300}
            width={300}
            alt="Cryto Logo"
            src={"/pngs/logo-main.png"}
          />
          <form
            onSubmit={handleOnSubmit}
            className=" w-[80%] md:w-[60%] flex flex-col h-[50%] justify-start items-center"
          >
            <h1 className=" text-xl md:text-2xl font-bold">Sign In</h1>

            <label className="text-sm text-start mt-[5%] w-full font-semibold">
              Email Address
            </label>
            <input
              value={signInDetails["email"]}
              onChange={(e) => onTextChange(e)}
              type="email"
              name="email"
              required
              className="w-full text-sm focus:outline-primaryColor border-gray-400 bg-transparent border rounded-md p-2"
              placeholder="Enter email address"
            />

            <label className="text-sm text-start mt-[5%] w-full font-semibold">
              Password
            </label>
            <input
              value={signInDetails["password"]}
              onChange={(e) => onTextChange(e)}
              type="password"
              name="password"
              required
              className="w-full text-sm focus:outline-primaryColor border-gray-400 bg-transparent border rounded-md p-2"
              placeholder="Enter correct password"
            />

            <div className="mt-[10%] w-full gap-[5px] flex flex-col items-center">
              {error?.error && (
                <span className="text-red-600 text-[10px]">{error?.error}</span>
              )}
              <FormButton text="Sign In" loading={loading} />
            </div>
          </form>
        </div>

        {/* <div className="w-[50%] flex flex-col items-center justify-center">
        <Image
          className="w-[50%] h-[60%]"
          height={300}
          width={300}
          alt="Cryto Logo"
          src={"/pngs/logo-main.png"}
        />
        <span className="text-[10px] w-[80%] px-[10px] text-center md:text-sm">
          Login/Sign up into your account to get access to daily tasks
        </span>
      </div> */}
      </main>
    </>
  );
}

export default SignUp;

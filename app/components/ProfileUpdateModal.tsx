import { Dispatch, FormEvent, SetStateAction } from "react";
import useAuth from "../hooks/useAuth";
import FormButton from "./FormButton";
import useFirestore from "../hooks/useFirestore";

interface ProfileModalType {
  isOpen: boolean;
  toogelModal: () => void;
}

function ProfileModal({ isOpen, toogelModal }: ProfileModalType) {
  const { loading, updateDetails, updateUserInfoToUserBucket, onTextChange, error } =
    useFirestore();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserInfoToUserBucket(() => {
      toogelModal()
    });
  };

  return (
    isOpen && (
      <div className="fixed flex items-center justify-center w-full bg-white/30 h-full">
        <div className=" md:w-[45%] w-[90%] h-[90%] flex flex-col items-center p-4 rounded-[10px] bg-white to">
          <button
            onClick={toogelModal}
            className="font-bold place-self-end border rounded-full h-[30px] flex items-center justify-center w-[30px] p-1 text-md"
          >
            X
          </button>
          <form
            onSubmit={handleOnSubmit}
            className="w-[80%] md:w-[60%] flex flex-col text-black h-[50%] justify-between items-center"
          >
            <h1 className=" text-xl md:text-2xl font-bold">
              {" "}
              Upgrade your account
            </h1>

            <label className="text-sm text-start mt-[5%] w-full font-semibold">
              Full Name
            </label>
            <input
              value={updateDetails["displayName"]}
              onChange={(e) => onTextChange(e)}
              type="text"
              name="displayName"
              required
              className="w-full text-sm focus:outline-primaryColor border-gray-400 bg-transparent border rounded-md p-2"
              placeholder="Enter Full Name "
            />

            <label className="text-sm text-start mt-[5%] w-full font-semibold">
              Bank Account Number
            </label>
            <input
              value={updateDetails["bankAccountNumber"]}
              onChange={(e) => onTextChange(e)}
              type="text"
              name="bankAccountNumber"
              required
              className="w-full text-sm focus:outline-primaryColor border-gray-400 bg-transparent border rounded-md p-2"
              placeholder="Enter your account number"
            />
            <label className="text-sm text-start mt-[5%] w-full font-semibold">
              Etheruem Address
            </label>
            <input
              value={updateDetails["eth"]}
              onChange={(e) => onTextChange(e)}
              type="text"
              name="eth"
              required
              className="w-full text-sm focus:outline-primaryColor border-gray-400 bg-transparent border rounded-md p-2"
              placeholder="(optional) Enter eth address"
            />
            <label className="text-sm text-start mt-[5%] w-full font-semibold">
              Tron Address
            </label>
            <input
              value={updateDetails["tron"]}
              onChange={(e) => onTextChange(e)}
              type="text"
              name="tron"
              required
              className="w-full text-sm focus:outline-primaryColor border-gray-400 bg-transparent border rounded-md p-2"
              placeholder="(optional) Enter tron address"
            />
            <label className="text-sm text-start mt-[5%] w-full font-semibold">
              Bitcoin network Address
            </label>
            <input
              value={updateDetails["bsc"]}
              onChange={(e) => onTextChange(e)}
              type="text"
              name="bsc"
              required
              className="w-full text-sm focus:outline-primaryColor border-gray-400 bg-transparent border rounded-md p-2"
              placeholder="(optional) Enter Bitcoin network address"
            />

            <div className="mt-[10%] w-full gap-[5px] flex flex-col items-center">
              {error?.error && (
                <span className="text-red-600 text-[10px]">{error?.error}</span>
              )}
              <FormButton text="Update Profile" loading={loading} />
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default ProfileModal;

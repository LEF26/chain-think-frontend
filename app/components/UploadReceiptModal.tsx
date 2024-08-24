import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import useAuth from "../hooks/useAuth";
import FormButton from "./FormButton";
import useFirestore from "../hooks/useFirestore";

interface UploadReceiptModalType {
  isOpen: boolean;
  toogelModal: () => void;
}

function UploadReceiptModal({ isOpen, toogelModal }: UploadReceiptModalType) {
  const {
    loading,
    updateUserInfoToUserBucket,
    uploadImageToBucket,
    error,
  } = useFirestore();

  const [url, setUrl] = useState<string>();
  const [recieptFile, setReceiptFile] = useState<File>()

  const getPhotoURL = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files && e.target.files[0]; //filelist is an object carrying all details of file, .files[0] collects the value from key 0 (not array), and stores it in file

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // You can also perform additional actions with the valid file
      const generatedUrl = URL.createObjectURL(file);
      setUrl(generatedUrl);
      setReceiptFile(file)
    } else {
      // Handle invalid file type
      alert("Please select a valid JPEG or PNG file.");
    }
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(recieptFile){
      uploadImageToBucket(recieptFile, () => {
         alert('Receipt uploaded succesfullty')
         toogelModal()
      })
    } else{
      alert('Pleas upload a document')
    }
  };

  return (
    isOpen && (
      <div className="fixed flex z-10 items-center justify-center w-full bg-white/30 h-full">
        <div className=" md:w-[45%] w-[90%] h-fit flex flex-col items-center p-4 rounded-[10px] bg-white to">
          <button
            onClick={toogelModal}
            className="font-bold place-self-end border rounded-full h-[30px] flex items-center justify-center w-[30px] p-1 text-md"
          >
            X
          </button>
          <form
            onSubmit={handleOnSubmit}
            className="w-[80%] md:w-[60%] flex flex-col text-black  justify-center items-center"
          >
            <h1 className=" text-md md:text-lg font-bold">
              {" "}
              Upload your payment reciept
            </h1>

            <label
              htmlFor="receiptId"
              className="text-sm h-fit p-2 cursor-pointer flex flex-col items-center justify-center text-gray-500 hover:underline mt-[5%] w-[90%] "
            >
              Click to upload (Jpeg/png/pdf)
            </label>

            {url && (
              <img
                src={url}
                className="h-[150px] w-[150px] border border-dashed object-cover p-2"
              />
            )}
            <input
              onChange={getPhotoURL}
              type="file"
              required
              id="receiptId"
              className="w-full hidden text-sm focus:outline-primaryColor border-gray-400 bg-transparent border rounded-md p-2"
              placeholder="Enter Full Name "
            />

            <div className="mt-[10%] w-full gap-[5px] flex flex-col items-center">
              {error?.error && (
                <span className="text-red-600 text-[10px]">{error?.error}</span>
              )}
              <FormButton text="Upload Receipt" loading={loading} />
              <span className="text-sm text-gray-500">Payments verification typically takes 1 day</span>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default UploadReceiptModal;

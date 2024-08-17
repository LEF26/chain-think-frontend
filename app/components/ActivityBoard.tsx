import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import { MdSwapHorizontalCircle } from "react-icons/md";
import { AiFillCodepenCircle } from "react-icons/ai";

function ActivityBoard({
  toogleModal,
  user,
  toogleReceiptModal,
}: {
  toogleModal: () => void;
  user: any;
  toogleReceiptModal: () => void;
}) {
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText("05693993094995995059")
      .then(() => {
        alert("Address copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="w-full flex justify-center items-center h-[80%] rounded-[15px]">
      <div className="w-[95%] md:w-[50%] h-full flex flex-col md:flex-row bg-[#1b1b24]/50 shadow-black/30 shadow-sm rounded-[15px] px-5 md:px-10 py-2">
        {/* Left hand of activity */}
        <div className=" h-[50%] md:h-fit md:w-[50%] w-full flex flex-col gap-[10%]">
          <h1 className="text-lg font-semibold ">Total Balance</h1>

          <div className="flex md:flex-col items-end md:items-start gap-[10px]">
            <span className="text-gray-700 hidden md:block font-semibold text-sm">
              My Balance
            </span>
            <span className="text-xl md:text-3xl font-semibold ">
              ${user?.balance}.00
            </span>
            <span className="text-gray-700 font-semibold text-sm">
              {user?.balance * 0.000017} BTC
            </span>
          </div>
        </div>

        {/* Right hand of activity */}
        <div className=" w-full md:w-[50%] grid grid-cols-4 md:grid-cols-2 pt-5">
          <button
            onClick={handleCopyClick}
            className="flex flex-col hover:underline text-gray-700 text-sm items-center"
          >
            <FaCircleArrowUp className="text-primaryColor text-3xl" />
            Send
          </button>
          <button
            onClick={toogleReceiptModal}
            className="flex flex-col hover:underline text-gray-700 text-sm items-center"
          >
            <FaCircleArrowDown className="text-primaryColor text-3xl" />
            Receive
          </button>
          <button
            onClick={() => {
              window.location.href = "https://rar6inz1i6c.typeform.com/to/gbL1deEd";
            }}
            className="flex flex-col text-gray-700 hover:underline text-sm items-center"
          >
            <MdSwapHorizontalCircle className="text-primaryColor text-3xl" />
            KYC
          </button>

          <button
            onClick={toogleModal}
            className="flex flex-col cursor-pointer hover:underline text-gray-700 text-sm items-center"
          >
            <AiFillCodepenCircle className="text-primaryColor text-3xl" />
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivityBoard;

import { useContext, useEffect, useState } from "react";
import { Task } from "../../types";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "@/context/AuthContext";
import { FaCheckSquare } from "react-icons/fa";

function TaskItem({ data }: { data: any }) {
  const AuthHandler = useContext(AuthContext);
  const [currentUserTask, setCurrentUserTask] = useState<any>();
  const { makeUpdateToUserBucket } = useFirestore();

  const handleOnTaskClick = async () => {
    window.open(data?.link, '_blank');
    if (!currentUserTask?.data?.done) {
      await makeUpdateToUserBucket(
        {
          balance: AuthHandler?.authDetails?.balance + data.value,
          tasks_status: {
            ...AuthHandler?.authDetails?.tasks_status,
            [currentUserTask?.key]: { done: !currentUserTask?.data?.done },
          },
        },
        () => {
        }
      );
    } 
  };

  const checkTaskState = () => {
    let task;
    if (AuthHandler?.authDetails?.tasks_status) {
      Object.keys(AuthHandler?.authDetails?.tasks_status)?.map(
        (currentKey: string) => {
          if (currentKey === data.id) {
            task = {
              key: currentKey,
              data: { ...AuthHandler?.authDetails?.tasks_status[currentKey] },
            };
          }
        }
      );
    }

    return task;
  };

  useEffect(() => {
    setCurrentUserTask(() => checkTaskState());
  }, [AuthHandler?.authDetails]);

  return (
    <li className="w-full py-3 px-5 flex justify-between items-center">
      <div className="flex flex-col w-[75%]">
        <h3 className="text-sm flex text-white items-center font-semibold">
          {data.title}
          {currentUserTask?.data?.done && (
            <FaCheckSquare className="ml-[5px]" />
          )}
          <span className=" ml-[5px] text-gray-500 text-[10px]">
            (${data.value})
          </span>
        </h3>
        <span className="text-[11px] text-gray-700">{data.description}</span>
      </div>

      <button
        onClick={handleOnTaskClick}
        className={`w-[70px] h-[20px] flex items-center justify-center text-black text-center ${
          !currentUserTask?.data?.done
            ? "bg-primaryColor opacity-100"
            : "bg-primaryColor opacity-35"
        } text-[11px] font-semibold rounded-[15px]`}
      >
        Proceed
      </button>
    </li>
  );
}

export default TaskItem;

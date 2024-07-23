import { Task } from "../../types";

function TaskItem({data}: {data:Task}) {
  return (
    <li className="w-full py-3 px-5 flex justify-between items-center">
      <div className="flex flex-col w-[75%]">
        <h3 className="text-sm text-white font-semibold">{data.type}</h3>
        <span className="text-sm text-gray-700">{data.description}</span>
      </div>
      
      <button className="w-[70px] h-[20px] text-black text-center bg-primaryColor text-[11px] font-semibold rounded-[15px]  ">Proceed</button>
    </li>
  );
}

export default TaskItem;

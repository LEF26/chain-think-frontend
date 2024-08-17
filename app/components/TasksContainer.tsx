import { useContext } from "react";
import { tasks } from "../utils/dummies";
import TaskItem from "./TaskItem";
import { TaskContext } from "@/context/TaskContext";

function TasksContainer() {

  const TaskHandler = useContext(TaskContext)

  return (
    <div className="w-full overflow-y-auto flex justify-center h-[60%]">
      <ul className=" w-[90%] md:w-[60%]  text-gray-400 divide-gray-300/10 divide-y-[1px] ">
        <h2>Tasks for today </h2>
        {TaskHandler?.tasks?.map((currentTask: any) => (
          <TaskItem key={currentTask.id} data={currentTask} />
        ))}
      </ul>
    </div>
  );
}

export default TasksContainer;

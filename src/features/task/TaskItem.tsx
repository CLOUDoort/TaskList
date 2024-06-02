import React, { useState } from 'react';

import { Progress } from '@/components/ui/progress';
import Tag from '../../ui/Tag';
import type { Task } from 'Task';
import TaskDetails from '../details/Details';
import { TiDelete } from 'react-icons/ti';
import { calcProgressColor } from '@/utils/calcProgressColor';
import { deleteTask } from '@/services/apiTasks';
import { useNavigate } from 'react-router-dom';
import { filterSubtask } from '@/utils/filterSubtask';

const TaskItem = ({ type, task }: { type: string; task: Task }) => {
  const { title, progress, priority, difficulty, subtask } = task;
  const [detailsState, setDetailsState] = useState<boolean>(false);
  const handleDetailState = () => setDetailsState((state) => !state);
  const navigation = useNavigate();
  const progressColor = calcProgressColor(progress);
  const filtered = subtask && filterSubtask(subtask);

  const clickDelete = () => {
    deleteTask(type, task.id);
    navigation(`/app/${type}`);
  };
  return (
    <>
      <div className="flex items-center justify-between w-full px-3 transition-colors border-b-2 font-paragraph hover:bg-slate-200/50">
        <div
          onClick={handleDetailState}
          className="flex items-center w-full text-xs cursor-pointer whitespace-nowrap lg:text-base min-h-14 border-slate-200"
        >
          <div className="w-24 whitespace-pre-line sm:w-36 md:w-44">{title}</div>
          <div className="flex items-center gap-2 pr-5 rounded w-28 sm:w-40 md:w-48">
            <Progress value={progress} indicatorColor={progressColor} />
            <span>{progress}%</span>
          </div>
          <div className="w-28 sm:w-40 md:w-48">
            <Tag type={priority} button={false} />
          </div>
          {difficulty && (
            <div className="hidden xl:w-48 xl:block">
              <Tag type={difficulty} button={false} />
            </div>
          )}
          {filtered && (
            <div className="items-center hidden gap-2 xl:flex xl:w-48">
              {filtered.map((key: string) => (
                <React.Fragment key={key}>
                  <Tag type={key} button={false} /> x {subtask[key].length}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        <TiDelete className="cursor-pointer" size={25} onClick={clickDelete} />
      </div>
      {detailsState && <TaskDetails task={task} handleDetailState={handleDetailState} />}
    </>
  );
};

export default TaskItem;

import type { Focus, Task } from 'Task';

import Button from '@/ui/Button';
import FocusTask from '../FocusTask';
import { HiOutlineXMark } from 'react-icons/hi2';
import ItemLabel from '@/ui/ItemLabel';
import Modal from '@/ui/Modal';
import { Progress } from '@/components/ui/progress';
import Tag from '@/ui/Tag';
import TaskDetailsSubtask from './DetailsSubtask';
import { calcProgressColor } from '@/utils/calcProgressColor';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFinishSubtask, useFinishTask } from '../queries';
import { useAuthContext } from '@/authentication/AuthContext';

const initialState = {
  type: '',
  item: {
    id: '',
    taskId: '',
    title: '',
    details: '',
    priority: '',
    difficulty: '',
  },
};

interface TaskDetailsProps {
  task: Task;
  handleDetailState: () => void;
}

const TaskDetails = ({ task, handleDetailState }: TaskDetailsProps) => {
  const navigate = useNavigate();
  const [focus, setFocus] = useState(initialState);
  const {
    auth: { version },
  } = useAuthContext();

  const { mutate: finishTask } = useFinishTask(version);
  const { mutate: finishSubtask } = useFinishSubtask(version);

  const { id, title, details, progress, priority, difficulty, subtask, createdAt, updatedAt } = task;
  const { type, item } = focus;
  const taskType = task.progress === 100 ? 'done' : 'todo';
  const isComplete = progress === 100;
  const focusTask: Focus = {
    id,
    taskId: id,
    title,
    details,
    priority,
    difficulty: difficulty !== undefined ? difficulty : '',
  };
  const progressColor = calcProgressColor(progress);

  const focusHandler = (type: string, item: Focus) => setFocus({ type, item });

  const finishHandler = () => {
    if (type === 'task') finishTask(item);
    else finishSubtask(item);

    toast.success(`Finish ${item.title}`);
    setFocus(initialState);
  };

  return (
    <Modal handler={handleDetailState}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`min-w-[22rem] max-w-[35rem] w-[30%] inset-y-0 right-0 absolute border-l-2 border-slate-200 bg-white overflow-y-scroll pb-10`}
      >
        <div className="flex flex-col w-full gap-5 px-8 py-10">
          <div className="flex items-center justify-between">
            <h3 className="lg:text-h3 text-h4">Task Details</h3>
            <HiOutlineXMark size={25} className="cursor-pointer" onClick={handleDetailState} />
          </div>
          <ItemLabel name="Title">
            <span className="font-paragraph">{title}</span>
          </ItemLabel>
          <ItemLabel name="Details">
            <span className="break-all font-paragraph">{details}</span>
          </ItemLabel>
          <ItemLabel name="CreatedAt">
            <span className="font-paragraph">{createdAt}</span>
          </ItemLabel>
          <ItemLabel name="UpdatedAt">
            <span className="font-paragraph">{updatedAt}</span>
          </ItemLabel>
          <ItemLabel name="Progress">
            <div className="flex items-center gap-2 pr-5 rounded w-28 sm:w-40 md:w-48">
              <Progress value={progress} indicatorColor={progressColor} />
              <span className="font-paragraph">{progress}%</span>
            </div>
          </ItemLabel>
          <ItemLabel name="Priority">
            <span className="font-paragraph">
              <Tag type={priority} button={false} />
            </span>
          </ItemLabel>
          {difficulty && (
            <ItemLabel name="Difficulty">
              <span className="font-paragraph">
                <Tag type={difficulty} button={false} />
              </span>
            </ItemLabel>
          )}
          {subtask && (
            <div className="flex flex-col gap-5">
              <span className="w-20 font-semibold text-h5">Subtask</span>
              <TaskDetailsSubtask subtask={subtask} handler={focusHandler} />
            </div>
          )}
        </div>
        <div className="flex items-center w-full gap-2 px-8">
          <Button name="edit" handler={() => navigate(`/${version}/update/${taskType}/${id}`)}>
            Edit
          </Button>
          {difficulty && (
            <Button
              name={isComplete ? 'optionfalse' : 'focus'}
              handler={() => focusHandler('task', focusTask)}
              conditionStyle="w-full"
              disabled={isComplete}
            >
              {isComplete ? 'Completed' : 'Focus'}
            </Button>
          )}
        </div>
      </div>
      {focus.type !== '' && <FocusTask handleFinish={finishHandler} focus={focus.item} />}
    </Modal>
  );
};

export default TaskDetails;

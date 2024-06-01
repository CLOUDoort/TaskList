import { DetailsInput, TitleInput } from './FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../../ui/Button';
import CreateSubtask from '../CreateSubtask';
import FormLabel from '@/features/create/form/FormLabel';
import { createTask } from '../../../services/apiCreateTask';
import { formattedDate } from '@/utils/formattedDate';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useCreateSubtask } from '../CreateSubtaskContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Inputs } from 'Create';
import FormTag from './FormTag';
import { assignTaskId } from '@/utils/assignTaskId';
import { calcCompletedNum, calcSubtaskNum } from '@/utils/calcSubtaskNum';
import type { Task } from 'Task';
import { updateTask } from '@/services/apiTasks';

const CreateTaskForm = ({ update }: { update?: Task }) => {
  const navigate = useNavigate();
  const { subtask, clearSubtask } = useCreateSubtask();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: update ? update?.title : '',
      details: update ? update?.details : '',
    },
  });
  const [flashBorder, setFlashBorder] = useState(false);
  const [option, setOption] = useState(update && update?.subtask ? false : true);
  const [priority, setPriority] = useState((update && update?.priority) ?? 'high');
  const [difficulty, setDifficulty] = useState((update && update?.difficulty) ?? 'hard');

  const handleReset = () => {
    clearSubtask();
    setOption(update && update?.subtask ? false : true);
    setPriority((update && update?.priority) ?? 'high');
    setDifficulty((update && update?.difficulty) ?? 'hard');
    reset();
  };

  const handleCancel = () => {
    handleReset();
    navigate(-1);
  };

  const onSubmit: SubmitHandler<Inputs> = ({ title, details }) => {
    if (!title || !details) {
      toast.error('Not enough content!');
      return null;
    }

    // update
    if (update) {
      const { id, createdAt, difficulty, progress } = update;
      const updatedAt = formattedDate(new Date());
      const base = { id, title, details, priority, createdAt, updatedAt };
      let task;
      if (option) task = { ...base, difficulty, progress: Number(progress) };
      else {
        const subtaskNum = calcSubtaskNum(subtask);
        const completedSubtaskNum = calcCompletedNum(subtask);
        const progress = Math.trunc((completedSubtaskNum / subtaskNum) * 100);

        task = {
          ...base,
          progress,
          subtask: assignTaskId(subtask, id),
          subtaskNum,
          completedSubtaskNum,
        };
      }
      const next = updateTask(task);
      toast.success('Edit Task!');
      navigate(`/app/${next}`);
    } else {
      const taskId = nanoid(8);
      const createdAt = formattedDate(new Date());
      const base = { id: taskId, title, details, priority, progress: 0, createdAt, updatedAt: createdAt };

      let task;
      if (option && difficulty) task = { ...base, difficulty };
      else {
        const subtaskNum = calcSubtaskNum(subtask);
        if (!subtaskNum) {
          toast.error('Add subtask!');
          return null;
        }
        task = { ...base, subtask: assignTaskId(subtask, taskId), subtaskNum, completedSubtaskNum: 0 };
      }

      createTask('todo', task);

      toast.success('Create Task!');
      navigate('/app/todo');
    }
    handleReset();
  };

  return (
    <div className={`flex-1 flex gap-5 xl:flex-row flex-col pb-10`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-8 space-y-4 border rounded-md border-slate-200 xl:w-[29rem] min-w-[25rem] h-full"
      >
        <FormLabel name="Title" error={errors.title?.message}>
          <TitleInput register={register} />
        </FormLabel>
        <FormLabel name="Details" error={errors.details?.message}>
          <DetailsInput register={register} />
        </FormLabel>
        <FormLabel name="Priority">
          <FormTag tag="priority" select={priority} handler={setPriority} />
        </FormLabel>
        <FormLabel name="Options">
          <div className="flex gap-2">
            <Button name={`option${option}`} handler={() => setOption(true)}>
              Difficulty
            </Button>
            <Button
              name={`option${!option}`}
              handler={() => setOption(false)}
              conditionStyle={`${flashBorder ? 'border-red-400 bg-red-300' : ''}`}
            >
              Divide
            </Button>
          </div>
          {option && <FormTag tag="difficulty" select={difficulty} handler={setDifficulty} />}
        </FormLabel>
        <div className="flex justify-end gap-2">
          <Button name="cancel" handler={handleCancel}>
            Cancel
          </Button>
          <Button name="save" type="submit">
            Save
          </Button>
        </div>
      </form>
      <CreateSubtask priority={priority} option={option} flashHandler={setFlashBorder} />
    </div>
  );
};

export default CreateTaskForm;
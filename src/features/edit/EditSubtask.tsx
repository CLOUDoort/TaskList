import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Button from '@/ui/Button';
import { HiOutlinePlus } from 'react-icons/hi2';
import { SubtaskFormItem } from 'Form';
import Tag from '@/ui/Tag';
import EditSubtaskList from './EditSubtaskList';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { useEditSubtask } from './EditSubtaskContext';

const initialFormState: SubtaskFormItem = {
  title: '',
  details: '',
  difficulty: 'hard',
};

interface EditSubtaskProps {
  priority: string;
  option: boolean;
  flashHandler: Dispatch<SetStateAction<boolean>>;
}

const EditSubtask = ({ priority, option, flashHandler }: EditSubtaskProps) => {
  const [buttonState, setButtonState] = useState<boolean>(false);
  const [form, setForm] = useState(initialFormState);
  const { title, details, difficulty } = form;
  const { createSubtask } = useEditSubtask();

  const clickSubtask = () => {
    if (!option) setButtonState((state) => !state);
  };
  const handleState = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setButtonState(false);
    setForm(initialFormState);
  };

  const clickDisabledBtn = () => {
    if (option) {
      flashHandler(true);
      setTimeout(() => {
        flashHandler(false);
      }, 400);
      return;
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !details) {
      toast.error('Not enough content!');
      return;
    }
    const id = nanoid(8);
    createSubtask({
      id,
      title,
      details,
      difficulty,
      priority,
      complete: false,
      taskId: '',
    });
    reset();
  };

  useEffect(() => setButtonState(false), [option]);
  return (
    <div
      className={`flex-1 w-full p-8 space-y-5 border rounded-md min-w-96 min-h-[32.625rem] border-slate-200 h-full ${option ? 'opacity-60 cursor-not-allowed' : ''} overflow-y-scroll`}
      onClick={clickDisabledBtn}
    >
      <h1 className="text-h4">Subtask</h1>
      <EditSubtaskList option={option} />

      {/* New Subtask Button */}
      <Button type="subtask" conditionStyle={option ? 'cursor-not-allowed' : ''} handler={clickSubtask}>
        <HiOutlinePlus size={20} />
        <span>New Subtask</span>
      </Button>

      {buttonState && (
        <form className="w-full p-8 flex flex-col gap-2 border rounded-md border-slate-200 min-w-[25rem]">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              id="title"
              className="p-2 border-2 rounded-md border-slate-200"
              placeholder="Title"
              value={title}
              onChange={(e) => handleState('title', e.target.value)}
            />
            <textarea
              id="details"
              className="p-2 border-2 rounded-md border-slate-200 min-h-20"
              placeholder="details"
              value={details}
              onChange={(e) => handleState('details', e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Tag type="hard" select={difficulty} handler={() => handleState('difficulty', 'hard')} />
            <Tag type="normal" select={difficulty} handler={() => handleState('difficulty', 'normal')} />
            <Tag type="easy" select={difficulty} handler={() => handleState('difficulty', 'easy')} />
          </div>
          <div className="flex justify-end gap-2">
            <Button handler={reset} type="cancel">
              Cancel
            </Button>
            <Button submit={true} type="save" handler={submitHandler}>
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditSubtask;

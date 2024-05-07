import { LuDot } from 'react-icons/lu';
import { TiDelete } from 'react-icons/ti';
import { useSubtask } from './SubtaskContext';
import { useState } from 'react';
import Button from '../../ui/Button';
import Tag from '../../ui/Tag';
import { toast } from 'react-toastify';
import { SubtaskItemInterface } from 'Task';

const CreateSubtaskItem = ({ subtask }: { subtask: SubtaskItemInterface }) => {
  const { deleteSubtask, modifySubtask } = useSubtask();
  const [modifyState, setModifyState] = useState(false);
  const initialState: SubtaskItemInterface = {
    id: subtask.id,
    title: subtask.title,
    details: subtask.details,
    difficulty: subtask.difficulty,
  };
  const [form, setForm] = useState(initialState);
  const { id, title, details, difficulty } = form;
  const handleState = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const reset = () => {
    setModifyState(false);
    setForm(initialState);
  };
  const submitHandler = () => {
    if (!title || !details) {
      toast.error('Not enough content!');
      reset();
      return;
    }
    if (title === subtask.title && details === subtask.details && difficulty === subtask.difficulty) {
      toast.error('No changes have been made!');
      reset();
      return;
    }
    const modifiedSubtask = {
      id,
      title,
      details,
      difficulty,
    };
    modifySubtask(subtask, modifiedSubtask);
    toast.success('Modify Success!');
    reset();
  };
  return (
    <>
      {modifyState ? (
        <form className="w-full p-8 flex flex-col gap-2 border rounded-md border-slate-200 min-w-[25rem]">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              id="title"
              className="p-2 border-2 rounded-md border-slate-200"
              placeholder="Title"
              value={title}
              onChange={(e) => handleState('title', e.target.value)}
              required
            />
            <textarea
              id="details"
              className="p-2 border-2 rounded-md border-slate-200 min-h-20"
              placeholder="details"
              value={details}
              onChange={(e) => handleState('details', e.target.value)}
              required
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
            <Button handler={submitHandler} type="save">
              Save
            </Button>
          </div>
        </form>
      ) : (
        <li
          onClick={() => setModifyState(true)}
          className="flex items-center justify-between p-2 transition-all rounded cursor-pointer hover:bg-slate-100"
        >
          <div className="flex items-center w-full gap-1">
            <LuDot size={21} />
            <div>{subtask.title}</div>
          </div>
          <TiDelete className="cursor-pointer" size={25} onClick={() => deleteSubtask(subtask)} />
        </li>
      )}
    </>
  );
};

export default CreateSubtaskItem;
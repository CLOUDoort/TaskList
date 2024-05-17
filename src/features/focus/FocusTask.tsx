import Button from '@/ui/Button';
import Tag from '@/ui/Tag';
import type { Focus } from 'Task';

const FocusTask = ({ focus, handleFinish }: { focus: Focus; handleFinish: () => void }) => {
  const { title, details, priority, difficulty } = focus;

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col justify-between items-center bg-slate-50 max-w-[37.5rem] min-w-[25rem] min-h-[30rem] max-h-[40.625rem] w-[50%] h-[70%] rounded py-8 px-10">
        <div className="flex items-center justify-end w-full gap-2">
          <div className="flex flex-col w-full gap-7">
            <h1 className="text-[3.5rem] text-center mb-3">FOCUS</h1>
            <div className="flex items-center gap-5">
              <span className="w-28 text-h5">Title</span>
              <span className="font-paragraph">{title}</span>
            </div>
            <div className="flex items-center gap-5">
              <span className="w-28 text-h5">Details</span>
              <span className="font-paragraph">{details}</span>
            </div>
            <div className="flex items-center gap-5">
              <span className="w-28 text-h5">Priority</span>
              <span className="font-paragraph">
                <Tag type={priority} button={false} />
              </span>
            </div>
            <div className="flex items-center gap-5">
              <span className="w-28 text-h5">difficulty</span>
              <span className="font-paragraph">
                <Tag type={difficulty} button={false} />
              </span>
            </div>
          </div>
        </div>
        <Button type="focus" handler={handleFinish} conditionStyle="w-full">
          Finish
        </Button>
      </div>
    </div>
  );
};

export default FocusTask;
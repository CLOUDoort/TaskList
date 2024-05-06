import { ucFirst } from '../utils/ucFirst';

const base = 'px-3 py-2 rounded border-2 rounded-md transition-all ';

const style: { [key: string]: string } = {
  high: base + 'bg-High',
  hard: base + 'bg-High',
  medium: base + 'bg-Medium',
  normal: base + 'bg-Medium',
  low: base + 'bg-Low',
  easy: base + 'bg-Low',
  none: base + 'text-slate-400',
};

const Tag = ({
  type,
  select = type,
  button = true,
  handler,
}: {
  type: string;
  select?: string;
  button?: boolean;
  handler?: () => void;
}) => {
  const tagType = ucFirst(type);

  return (
    <span
      className={`${type === select ? style[type] : style['none']} ${button ? 'cursor-pointer' : ''} `}
      onClick={handler}
    >
      # {tagType}
    </span>
  );
};

export default Tag;

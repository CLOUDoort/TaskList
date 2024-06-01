import { ReactNode } from 'react';

const FocusLabel = ({ name, children }: { name: string; children: ReactNode }) => {
  return (
    <div className="flex items-center gap-5">
      <span className="min-w-28 text-h5">{name}</span>
      {children}
    </div>
  );
};

export default FocusLabel;

import { LabelFormProps } from 'Create';

const LabelForm = ({ name, children, error }: LabelFormProps) => {
  return (
    <div className={`flex flex-col gap-2`}>
      {name && (
        <label htmlFor={name} className="text-h5">
          {name}
        </label>
      )}
      {children}
      {error && <span className="ml-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default LabelForm;
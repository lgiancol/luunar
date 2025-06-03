import { useState } from 'react';

interface InputTextAreaProps {
  id?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  required?: boolean;
  rows?: number;
}
export default function InputTextarea({
  id,
  defaultValue = '',
  rows = 5,
  onChange,
  required = false,
}: InputTextAreaProps) {
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <textarea
      id={id}
      className="w-full rounded-sm border border-surface-border-500 bg-surface-500 px-2 py-1 text-text-primary-500 focus-within:border-primary-400 focus-within:outline-none"
      rows={rows}
      value={value}
      onChange={(evt) => {
        setValue(evt.target.value);

        if (onChange) {
          onChange(evt);
        }
      }}
      required={required}
    />
  );
}

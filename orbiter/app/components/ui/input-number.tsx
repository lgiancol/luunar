import { useState } from 'react';

interface InputNumberProps {
  id?: string;
  defaultValue?: number;
  onChange?: (value: number) => void;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
}
export default function InputNumber({
  id,
  defaultValue = 0,
  type = 'number',
  onChange,
  required = false,
}: InputNumberProps) {
  const [value, setValue] = useState<number>(defaultValue);

  return (
    <input
      id={id}
      type={type}
      className="w-full rounded-sm border border-surface-border-500 bg-surface-500 px-2 py-1 text-text-primary-500 focus-within:border-primary-400 focus-within:outline-none"
      value={value.toString()}
      onChange={(evt) => {
        const value = parseInt(evt.target.value);
        setValue(value);

        if (onChange) {
          onChange(value);
        }
      }}
      required={required}
    />
  );
}

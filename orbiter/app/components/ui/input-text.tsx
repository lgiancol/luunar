import clsx from 'clsx';
import { useState } from 'react';

interface InputTextProps {
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  className?: string;
}
export default function InputText({
  id,
  className,
  value: defaultValue = '',
  type = 'text',
  placeholder,
  onChange,
  onFocus,
  onBlur,
  required = false,
}: InputTextProps) {
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <input
      id={id}
      type={type}
      className={clsx(
        'w-full rounded-sm border border-surface-border-500 bg-surface-500 px-2 py-1 text-text-primary-500 focus-within:border-primary-400 focus-within:outline-none',
        className
      )}
      placeholder={placeholder}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
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

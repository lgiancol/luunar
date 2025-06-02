interface InputTextProps {
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
}
export default function InputText({ id, value = '', type = 'text', onChange, required = false }: InputTextProps) {
  return (
    <input
      id={id}
      type={type}
      className="w-full rounded-sm border border-surface-border-500 bg-surface-500 px-3 py-2 text-text-primary-500 focus-within:border-primary-400 focus-within:outline-none"
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

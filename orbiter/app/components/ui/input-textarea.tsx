interface InputTextAreaProps {
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  rows?: number;
}
export default function InputTextarea({ id, value = '', rows = 5, onChange, required = false }: InputTextAreaProps) {
  return (
    <textarea
      id={id}
      className="w-full rounded-sm border border-surface-border-500 bg-surface-500 px-3 py-2 text-text-primary-500 focus-within:border-primary-400 focus-within:outline-none"
      rows={rows}
      value={value}
      //   onChange={onChange}
      required={required}
    />
  );
}

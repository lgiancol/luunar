import clsx from 'clsx';

interface SurfaceProps {
  children: React.ReactNode;
  classname?: string;
}
export default function Surface({ children, classname }: SurfaceProps) {
  return <div className={clsx('rounded-md bg-surface-500 p-5 drop-shadow-sm', classname)}>{children}</div>;
}

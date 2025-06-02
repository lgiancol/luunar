import clsx from 'clsx';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}
export default function Panel({ children, className }: PanelProps) {
  return <div className={clsx('bg-primary-100 p-3 border border-surface-600 rounded-md', className)}>{children}</div>;
}

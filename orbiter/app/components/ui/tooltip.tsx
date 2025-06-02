import clsx from 'clsx';
import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: 'right' | 'left' | 'top' | 'bottom';
  classname?: string;
}

export default function Tooltip({ content, children, classname, placement = 'right' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const show = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      let top = rect.top;
      let left = rect.left;

      switch (placement) {
        case 'right':
          top += rect.height / 2;
          left += rect.width + 40;
          break;
        case 'left':
          top += rect.height / 2;
          left -= 8;
          break;
        case 'top':
          top -= 8;
          left += rect.width / 2;
          break;
        case 'bottom':
          top += rect.height + 8;
          left += rect.width / 2;
          break;
      }

      setCoords({ top, left });
    }
    setVisible(true);
  };

  const hide = () => setVisible(false);

  return (
    <div ref={ref} onMouseEnter={show} onMouseLeave={hide} className={clsx('inline-block', classname)}>
      {children}
      {createPortal(
        <div
          className={`text-surface-text-50 absolute z-50 rounded border border-surface-border-500 bg-surface-500 px-2 py-1 text-xs shadow-md transition-opacity duration-200 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import Button from './button';

interface ExpansionPanelProps {
  children: React.ReactNode;
  expanded?: boolean;
}

export default function ExpansionPanel({ children, expanded: expandedProp = false }: ExpansionPanelProps) {
  const header = React.Children.toArray(children).find((child: any) => child.type === ExpansionPanel.Header);
  const content = React.Children.toArray(children).find((child: any) => child.type === ExpansionPanel.Content);

  const [expanded, setExpanded] = useState<boolean>(expandedProp);
  const [height, setHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded && contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight + 'px';
      setHeight(fullHeight);
    } else {
      setHeight('0px');
    }
  }, [expanded]);

  return (
    <div className="rounded-md bg-surface-400">
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div>{header}</div>
          <div>
            <Button colour="surface" variant="icon" onClick={() => setExpanded((e) => !e)}>
              V
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden transition-all duration-300" style={{ height }}>
        <div ref={contentRef} className="p-4">
          {content}
        </div>
      </div>
    </div>
  );
}

ExpansionPanel.Header = ({ children }: { children: React.ReactNode }) => <>{children}</>;
ExpansionPanel.Content = ({ children }: { children: React.ReactNode }) => <>{children}</>;

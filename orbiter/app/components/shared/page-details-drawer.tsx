import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '~/components/ui/drawer';

interface PageDetailsDrawerProps {
  open?: boolean;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}
export default function PageDetailsDrawer({
  open = false,
  onOpenChange,
  title,
  subtitle,
  children,
}: PageDetailsDrawerProps) {
  const content = React.Children.toArray(children).find((child: any) => child.type === PageDetailsDrawer.Content);
  const footer = React.Children.toArray(children).find((child: any) => child.type === PageDetailsDrawer.Footer);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right" handleOnly>
      <DrawerContent className="w-full max-w-[900px]">
        {(title?.length || subtitle?.length) && (
          <DrawerHeader>
            {title?.length && <DrawerTitle>{title}</DrawerTitle>}
            {subtitle?.length && <DrawerDescription>This action cannot be undone.</DrawerDescription>}
          </DrawerHeader>
        )}

        <div className="p-3">{content}</div>

        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}

PageDetailsDrawer.Content = ({ children }: { children: React.ReactNode }) => <>{children}</>;
PageDetailsDrawer.Footer = ({ children }: { children: React.ReactNode }) => <>{children}</>;

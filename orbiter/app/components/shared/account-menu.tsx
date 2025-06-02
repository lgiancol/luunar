import clsx from 'clsx';
import { Building2Icon, ChevronDown, ChevronRight, LogOutIcon, UserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import type { AuthUser } from '~/services/auth/auth.model';

interface AccountMenuProps {
  collapsed: boolean;
  showLabels: boolean;
  currentOrg: string;
  organizations: string[];
  user: AuthUser;
  onSwitchOrg: (org: string) => void;
  onSignOut: () => void;
}

export default function AccountMenu({
  collapsed,
  showLabels,
  currentOrg,
  organizations,
  user,
  onSwitchOrg,
  onSignOut,
}: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setVisible(false);
        setTimeout(() => {
          setOpen(false);
        }, 200);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = () => {
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left });
    }

    if (!open) {
      setOpen(true);
      setVisible(true);
    } else {
      setVisible(false);
      setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  };

  return (
    <div ref={toggleRef} className="relative">
      <div
        className={clsx(
          'text-surface-text-500 flex cursor-pointer items-center justify-between rounded-md p-2 text-sm font-medium hover:bg-primary-300/20',
          { 'bg-primary-300/20': visible }
        )}
        onClick={toggle}
      >
        <div className="flex items-center gap-3">
          <div>
            <Building2Icon className="h-[20px] w-[20px] text-text-primary-500" />
          </div>

          {!collapsed && showLabels && (
            <span
              className={clsx(
                'transition-opacity duration-200',
                collapsed || !showLabels
                  ? 'pointer-events-none w-0 overflow-hidden opacity-0'
                  : 'ml-2 w-auto opacity-100'
              )}
            >
              <div className="font-semibold text-text-primary-500">{currentOrg}</div>
            </span>
          )}
        </div>

        {!collapsed && showLabels && (
          <span
            className={clsx(
              'transition-opacity duration-200',
              collapsed || !showLabels ? 'pointer-events-none w-0 overflow-hidden opacity-0' : 'ml-2 w-auto opacity-100'
            )}
          >
            <span>
              <ChevronDown className={clsx('h-3 w-3 transition-transform text-text-primary-500', { '-rotate-180': visible })} />
            </span>
          </span>
        )}
      </div>

      {open &&
        createPortal(
          <div
            ref={popupRef}
            className={`text-surface-text-400 z-50 w-[300px] overflow-hidden rounded-md border border-surface-border-500 bg-surface-500 text-sm drop-shadow-lg transition-opacity duration-200 ${
              visible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
            }}
          >
            <div className="flex flex-col gap-3 px-3 py-2">
              <div className="flex flex-col items-center gap-1">
                <div>
                  <Building2Icon className="h-10 w-10" />
                </div>
                <div className="font-semibold">{currentOrg}</div>
              </div>

              <button
                onClick={() => {
                  //   onSwitchOrg(org);
                  //   setVisible(false);
                  console.log('Switch orgs');
                }}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-primary-300/20"
              >
                <div className="flex items-center gap-3">
                  <Building2Icon className="h-4 w-4" />
                  <span>Switch organization</span>
                </div>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <hr className="border-surface-border-500" />

            <div className="p-3 pt-2">
              <div className="flex flex-col gap-1">
                <Link
                  onClick={() => {
                    setVisible(false);
                  }}
                  to={'/profile'}
                  className="rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-primary-300/20"
                >
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-4 w-4" />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={onSignOut}
                  className="cursor-pointer rounded-md px-2 py-2 text-sm font-medium transition-colors hover:bg-primary-300/20"
                >
                  <div className="flex items-center gap-3">
                    <LogOutIcon className="h-4 w-4" />
                    <span>Sign Out</span>
                  </div>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

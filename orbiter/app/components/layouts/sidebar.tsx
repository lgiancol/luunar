import clsx from 'clsx';
import { ChevronLeft, LayoutDashboard, TrendingDown, TrendingUp, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '~/contexts/auth-context';
import AccountMenu from '../shared/account-menu';
import Tooltip from '../ui/tooltip';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Income', path: '/income', icon: TrendingUp },
  { name: 'Expenses', path: '/expenses', icon: TrendingDown },
  { name: 'Clients', path: '/clients', icon: UsersIcon },
  //   { name: 'Assets', path: '/assets', icon: Briefcase },
  //   { name: 'Liabilities', path: '/liabilities', icon: Banknote },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [org, setOrg] = useState('Personal');
  const location = useLocation();

  useEffect(() => {
    if (collapsed) {
      setShowLabels(false); // hide immediately
    } else {
      const timeout = setTimeout(() => setShowLabels(true), 200); // delay showing
      return () => clearTimeout(timeout);
    }
  }, [collapsed]);

  return (
    <aside
      className={clsx(
        'bg-surface text-surface-text-500 relative flex h-screen flex-col border-r border-surface-border-300 bg-surface-500 transition-all duration-200',
        collapsed ? 'w-[53px]' : 'w-64'
      )}
    >
      <Tooltip
        content={collapsed ? 'Expand' : 'Collapse'}
        classname="absolute top-1/2 -right-7 -translate-y-1/2 transform"
      >
        <div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={clsx('cursor-pointer p-1 transition-transform duration-200', { 'rotate-y-180': collapsed })}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </Tooltip>

      {/* Org Switcher */}
      <div className="px-2 py-4">
        {user && (
          <AccountMenu
            collapsed={collapsed}
            showLabels={showLabels}
            user={user}
            currentOrg={org}
            organizations={['Personal', 'Slyce Golf']}
            onSignOut={logout}
            onSwitchOrg={() => {}}
          />
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {navItems.map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={clsx(
              'flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-primary-300/20',
              //   NOTE: This needs to be fixed and made prettier... maybe
              (path === '/' && location.pathname === path) || (path !== '/' && location.pathname.startsWith(path))
                ? 'bg-primary-100 font-medium text-primary-400'
                : 'text-text-primary-500'
            )}
          >
            <Icon className="h-[20px] w-[20px]" />
            {!collapsed && showLabels && (
              <span
                className={clsx(
                  'transition-opacity duration-200',
                  collapsed || !showLabels
                    ? 'pointer-events-none w-0 overflow-hidden opacity-0'
                    : 'ml-2 w-auto opacity-100'
                )}
              >
                {name}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

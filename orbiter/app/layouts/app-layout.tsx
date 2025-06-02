import { Outlet } from 'react-router';
import Sidebar from '~/components/layouts/sidebar';

export default function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* <Header /> */}
        <main className="overflow-y-auto p-6">
          <div className='w-full max-w-[1400px] mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

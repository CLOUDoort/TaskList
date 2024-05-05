import AppNav from './Navigation/AppNav';
import { Outlet } from 'react-router-dom';
import { SubtaskProvider } from '../features/create/SubtaskContext';

const AppLayout = () => {
  return (
    <div className="flex w-full h-screen">
      <AppNav />
      <main className="flex justify-center flex-1">
        <SubtaskProvider>
          <Outlet />
        </SubtaskProvider>
      </main>
    </div>
  );
};

export default AppLayout;
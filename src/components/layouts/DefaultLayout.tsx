import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div
      className={
        'bg-black text-white w-full h-full min-h-[100vh] flex flex-col font-notoSans'
      }
    >
       <Outlet />
    </div>
  );
};

export default DefaultLayout;
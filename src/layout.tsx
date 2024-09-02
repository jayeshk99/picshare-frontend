import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="layout">
      <div className="layout-content">
        <main className="layout-main">{<Outlet />}</main>
      </div>
    </div>
  );
};

export default Layout;

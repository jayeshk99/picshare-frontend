import { Outlet } from 'react-router-dom';
import { Header } from './components';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <main className="layout-main">{<Outlet />}</main>
      </div>
    </div>
  );
};

export default Layout;

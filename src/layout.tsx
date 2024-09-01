import { Outlet } from 'react-router-dom';
import { Header } from './components';

type LayoutProps = {
  children?: React.ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">
        <main className="layout-main">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

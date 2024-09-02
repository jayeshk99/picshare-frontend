import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';

const Layout = React.lazy(() => import('./layout'));
const HomePage = React.lazy(() => import('./pages/home/Home'));
const FavouritesPage = React.lazy(
  () => import('./pages/favourites/Favourites')
);
const Login = React.lazy(() => import('./pages/login/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingComponent text="Loading home page" />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'favourites',
        element: (
          <Suspense fallback={<div>Loading favourites page...</div>}>
            <FavouritesPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading login page...</div>}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.sass';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdministrationPage } from './components/pages/AdministrationPage';
import { MySurveysPage } from './components/pages/MySurveysPage';
import { PageNotFoundPage } from './components/pages/PageNotFoundPage';
import { ContextSelectionPage } from './components/pages/ContextSelectionPage';

const root = ReactDOM.createRoot(
    document.getElementById('react-page-root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <RouterProvider
          router={createBrowserRouter([
                {
                    path: '/administration',
                    element: <AdministrationPage />,
                },
                {
                    path: '/my-surveys',
                    element: <MySurveysPage />,
                },
                {
                    path: '/',
                    element: <ContextSelectionPage />,
                },
                {
                    path: '*',
                    element: <PageNotFoundPage />,
                },
            ])}
        />
    </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.sass';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdministrationPage } from './components/pages/AdministrationPage';
import { MySurveysPage } from './components/pages/MySurveysPage';
import { PageNotFoundPage } from './components/pages/PageNotFoundPage';
import { ContextSelectionPage } from './components/pages/ContextSelectionPage';
import { AddNewSubjectPage } from './components/pages/AddNewSubjectPage';
import { SubjectsListPage } from './components/pages/SubjectsListPage';
import { LecturersListPage } from './components/pages/LecturersListPage';
import { AddNewLecturerPage } from './components/pages/AddNewLecturerPage';
import { AddNewStudentPage } from './components/pages/AddNewStudentPage';

const root = ReactDOM.createRoot(
    document.getElementById('react-page-root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <RouterProvider
          router={createBrowserRouter([
                {
                    path: '/administration/lecturers-list',
                    element: <LecturersListPage />,
                },
                {
                    path: '/administration/add-new-lecturer',
                    element: <AddNewLecturerPage />,
                },
                {
                    path: '/administration/subjects-list',
                    element: <SubjectsListPage />,
                },
                {
                    path: '/administration/add-new-subject',
                    element: <AddNewSubjectPage />,
                },
                {
                  path: '/administration/add-new-student',
                  element: <AddNewStudentPage />,
                },
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

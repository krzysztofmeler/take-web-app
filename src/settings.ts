import { LinksDesc } from './types/link-desc';

const settings = {
    backendAPIUrl: 'http://127.0.0.1:8091/take-1.0-SNAPSHOT/api/',
    adminAreaLinks: [
        {
            link: '/administration/subjects-list',
            text: 'All subjects list',
        },
        {
            link: '/administration/add-new-subject',
            text: 'Add new subject',
        },
        {
            link: '/administration/lecturers-list',
            text: 'All lecturers list',
        },
        {
            link: '/administration/add-new-lecturer',
            text: 'Add new lecturer',
        },
        {
            link: '/administration/surveys-list',
            text: 'All surveys list',
        },
        {
            link: '/administration/students-list',
            text: 'All students list',
        },
        {
            link: '/administration/add-new-student',
            text: 'Add new student',
        },
    ] as LinksDesc,
};

export { settings };

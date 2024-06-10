import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { Subject } from '../../model/existing-objects/Subject';

const SubjectsListPage: FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        // TODO: remove this mock after real request is ready
        setSubjects([
            {
                subjectId: 234,
                lecturer: {
                    lecturerId: 11,
                    firstName: 'Tutajewicz Robert',
                    lastName: '',
                    email: '',
                    surveys: [],
                    subjects: [],
                },
                name: 'Technika Układów Cyfrowych',
            },
            {
                subjectId: 11,
                lecturer: {
                    lecturerId: 23,
                    firstName: 'Bolesław Pochopień',
                    lastName: 'asd',
                    email: 'dsfsdf',
                    subjects: [],
                    surveys: [],
                },
                name: 'Arytmetyka systemów cyfrowych',
            },
        ]);
    }, []);

    return (
        <>
            <h1>Subjects list</h1>
            <p>
                List contains data about all subjects - name and lecturer who
                directs it.
            </p>
            <table>
                <thead>
                    <tr>
                        <td>Subject name</td>
                        <td>Lecturer</td>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.subjectId}>
                            <td>{subject.name}</td>
                            <td>
                                {subject.lecturer.firstName}{' '}
                                {subject.lecturer.lastName}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export { SubjectsListPage };

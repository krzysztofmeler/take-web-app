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
                lecturer: { lecturerId: 11, name: 'Tutajewicz Robert' },
                name: 'Technika Układów Cyfrowych',
            },
            {
                subjectId: 11,
                lecturer: { lecturerId: 23, name: 'Bolesław Pochopień' },
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
                            <td>{subject.lecturer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export { SubjectsListPage };

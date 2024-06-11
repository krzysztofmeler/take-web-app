import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { Subject } from '../../model/existing-objects/Subject';
import { useRequest } from '../../hooks/useRequest.hook';

const SubjectsListPage: FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const { data, processing, error } = useRequest(
        'http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/subjects',
        { method: 'GET' },
    );

    // todo: fix duplicated request to lecturers list via GET

    useEffect(() => {
        if (error) {
            alert('An error occurred.');
            console.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setSubjects(data as Subject[]);
        }
    }, [data]);

    return (
        <>
            <h1>Subjects list</h1>
            <p>
                List contains data about all subjects - name and lecturer who
                directs it.
            </p>
            {processing && <p>Loading</p>}
            {!processing && (
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
            )}
        </>
    );
};

export { SubjectsListPage };

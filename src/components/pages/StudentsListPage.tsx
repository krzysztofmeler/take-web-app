import { FC, useEffect, useState } from 'react';
import { Student } from '../../model/existing-objects/Student';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';

const StudentsListPage: FC = () => {
    const [students, setStudents] = useState<Student[]>([]);

    const { data, error } = useRequest(`${settings.backendAPIUrl}students`, {
        method: 'GET',
    });

    // todo: fix duplicated request to students list via GET

    useEffect(() => {
        if (error) {
            alert('An error occurred.');
            console.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setStudents(data as Student[]);
        }
    }, [data]);

    return (
        <>
            <h1>Students list</h1>
            <p>List contains data about all students.</p>
            <table>
                <thead>
                    <tr>
                        <td>Student name</td>
                        <td>Student e-email address</td>
                    </tr>
                </thead>
                <tbody>
                    {students.map((lecturer) => (
                        <tr key={lecturer.studentId}>
                            <td>
                                {lecturer.firstName} {lecturer.lastName}
                            </td>
                            <td>{lecturer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export { StudentsListPage };

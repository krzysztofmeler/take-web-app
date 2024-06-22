import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    const deleteStudent = async (email: string) => {
        const response = await fetch(`${settings.backendAPIUrl}students/email/${encodeURIComponent(email)}`, { mode: 'cors', method: 'DELETE' });

        if (response.status === 204) {
            setStudents(students.filter(s => s.email !== email));
        }
    }

    return (
        <>
            <h1>Students list</h1>
            <p>List contains data about all students.</p>
            <table>
                <thead>
                    <tr>
                        <td>Student name</td>
                        <td>Student e-email address</td>
                        <td />
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.studentId}>
                            <td>
                                {student.firstName} {student.lastName}
                            </td>
                            <td>{student.email}</td>
                            <td>
                                <Link
                                  to={`/administration/surveys-of-student/${student.studentId}`}
                                >
                                    Surveys
                                </Link>

                                <Link
                                  to={`/administration/edit-student-data/${student.studentId}`}
                                >
                                    Edit data
                                </Link>

                                <button onClick={() => deleteStudent(student.email)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export { StudentsListPage };

import { FC, useEffect, useState } from 'react';
import { Student } from '../../model/existing-objects/Student';

const StudentsListPage: FC = () => {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        // TODO: remove this mock after real request is ready
        setStudents([
            {
                studentId: 54,
                firstName: 'werewrewrewrewr',
                lastName: 'dfgdfg',
                email: 'asdvv@aei.polsl.pl',
            },
            {
                studentId: 23,
                firstName: 'asd',
                lastName: 'fgfg',
                email: 'bb@aei.polsl.pl',
            },
        ]);
    }, []);

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

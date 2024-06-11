import { FC, useEffect } from 'react';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { useRequest } from '../../hooks/useRequest.hook';

const LecturersListPage: FC = () => {

    const {
        data: lecturers,
        processing,
        error,
    } = useRequest(
        'http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/lecturers',
        { method: 'GET' },
    );

    // todo: fix duplicated request to lecturers list via GET

    useEffect(() => {
        if (error) {
            alert('An error occurred');
            console.error(error);
        }
    }, [error]);

    return (
        <>
            <h1>Lecturers list</h1>
            <p>List contains data about all lecturers.</p>

            {processing && <p>Loading list</p>}
            {!processing && lecturers && (
                <table>
                    <thead>
                        <tr>
                            <td>Lecturer name</td>
                            <td>Lecturer e-mail address</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(lecturers as Lecturer[]).map((lecturer) => (
                            <tr key={lecturer.lecturerId}>
                                <td>
                                    {lecturer.firstName} {lecturer.lastName}
                                </td>
                                <td>{lecturer.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export { LecturersListPage };

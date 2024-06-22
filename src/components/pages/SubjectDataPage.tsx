import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { SubjectWithLecturers } from '../../model/existing-objects/Subject';

const SubjectDataPage: FC = () => {
    const [subject, setSubject] = useState<SubjectWithLecturers | null>(null);

    const { id } = useParams();

    const subjectRequest = useRequest(
        `${settings.backendAPIUrl}subjects/with-lecturers/${id}`,
        {
            method: 'GET',
        },
    );

    // todo: fix duplicated request to survey data EP via GET

    useEffect(() => {
        if (subjectRequest.error) {
            alert('An error occurred');
            console.error(subjectRequest.error);
        }
    }, [subjectRequest.error]);

    const resultsRequest = useRequest();

    useEffect(() => {
        if (subjectRequest.data) {
            setSubject(subjectRequest.data as SubjectWithLecturers);
        }
    }, [subjectRequest.data]);

    const loading = subjectRequest.processing || resultsRequest.processing;

    return (
        <>
            <h1>Subject data</h1>
            {loading && <p>Loading</p>}
            {!loading && subject !== null && (
                <>
                    <p>Name: {subject.name}</p>

                    {subject.lecturers.length === 0 && <p>No lecturers</p>}

                    {subject.lecturers.length > 0 && (
                        <>
                            <p>Lecturers:</p>
                            <ul>
                                {subject.lecturers.map((lecturer) => (
                                    <li key={lecturer[0]}>
                                        <Link
                                          to={`/administration/lecturer-profile/${lecturer[0]}`}
                                        >
                                            {lecturer[1]} {lecturer[2]} (
                                            {lecturer[3]})
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export { SubjectDataPage };

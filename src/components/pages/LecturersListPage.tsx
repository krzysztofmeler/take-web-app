import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { Subject } from '../../model/existing-objects/Subject';

const LecturersListPage: FC = () => {
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);

    useEffect(() => {
        // TODO: remove this mock after real request is ready
        setLecturers([
            {
                lecturerId: 11,
                firstName: 'Robert',
                lastName: 'Tutajewicz',
                email: 'robercik@aei.polsl.pl',
                subjects: [],
                surveys: [],
            },
            {
                lecturerId: 23,
                firstName: 'asd',
                lastName: 'fgfg',
                email: 'robercik@aei.polsl.pl',
                subjects: [],
                surveys: [],
            },
        ]);
    }, []);

    return (
        <>
            <h1>Lecturers list</h1>
            <p>List contains data about all lecturers.</p>
            <table>
                <thead>
                    <tr>
                        <td>Lecturer name</td>
                    </tr>
                </thead>
                <tbody>
                    {lecturers.map((lecturer) => (
                        <tr key={lecturer.lecturerId}>
                            <td>
                                {lecturer.firstName} {lecturer.lastName} (
                                {lecturer.email})
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export { LecturersListPage };

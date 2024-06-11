import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { CheckboxSelector } from '../forms/CheckboxSelector';
import { useRequest } from '../../hooks/useRequest.hook';

const AddNewLecturerPage: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subjectIds, setSubjectIds] = useState<string[]>([]);

    const [formEnabled, setFormEnabled] = useState(true);

    const { send: sendRequest, data: response, ...request } = useRequest();

    const submit = () => {
        setFormEnabled(false);
        sendRequest(
            'http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/lecturers',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    subjects: subjectIds,
                    surveys: [],
                }),
            },
        );
    };

    useEffect(() => {
        if (request.error) {
            window.alert('An error occurred!'); // TODO: add proper handling
            console.error(request.error);
            setFormEnabled(true);
        }
    }, [request.error]);

    const navigate = useNavigate();

    useEffect(() => {
        if (
            typeof response === 'object' &&
            response !== null &&
            Object.hasOwn(response, 'lecturerId')
        ) {
            navigate('/administration/lecturers-list');
        }
    }, [response]);

    const subjects = [
        {
            subjectId: 234,
            name: 'Technika Układów Cyfrowych',
        },
        {
            subjectId: 11,
            name: 'Arytmetyka systemów cyfrowych',
        },
        {
            subjectId: 21,
            name: 'jhgjghj werwer sdfdsf',
        },
        {
            subjectId: 1111,
            name: 'dghgmg werwer sdfdsf',
        },
        {
            subjectId: 34234,
            name: 'fdgfdg werwer sdfdsf',
        },
    ];

    const subjectsCheckboxData: [string, string][] = subjects.map((subject) => [
        subject.subjectId.toString(),
        subject.name,
    ]);

    return (
        <>
            <h1>Add new Lecturer</h1>
            <p>
                Adding new lecturer will cause new set of questions within new
                survey to be created for this lecturer. This is automatic and
                cannot be disabled.
            </p>
            <form>
                <TextInput
                  value={firstName}
                  updateValue={setFirstName}
                  label="Name"
                />
                <TextInput
                  value={lastName}
                  updateValue={setLastName}
                  label="Surname"
                />
                <TextInput
                  value={email}
                  updateValue={setEmail}
                  label="E-mail"
                />

                <CheckboxSelector
                  values={subjectsCheckboxData}
                  selectedValues={subjectIds}
                  updateValue={setSubjectIds}
                  label="Subjects"
                />

                {!formEnabled && <p>Processing</p>}

                <input
                  disabled={!formEnabled}
                  onClick={jsSubmit(submit)}
                  type="submit"
                  value="Proceed and close"
                />
            </form>
        </>
    );
};

export { AddNewLecturerPage };

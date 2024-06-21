import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { TextInput } from '../forms/TextInput';
import { jsSubmit } from '../../utils/js-submit';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { Student } from '../../model/existing-objects/Student';

const EditStudentDataPage: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const { id } = useParams();

    const { data: studentData } = useRequest(
        `${settings.backendAPIUrl}students/profile/${id}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    useEffect(() => {
        if (studentData) {
            const studentData2 = studentData as Student;

            setFirstName(studentData2.firstName);
            setLastName(studentData2.lastName);
            setEmail(studentData2.email);
        }
    }, [studentData]);

    const { send: sendRequest, data: response, ...request } = useRequest();

    const submit = () => {
        sendRequest(`${settings.backendAPIUrl}students/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
            }),
        });
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (
            typeof response === 'object' &&
            response !== null &&
            Object.hasOwn(response, 'studentId')
        ) {
            navigate('/administration/students-list');
        }
    }, [response]);

    return (
        <form>
            <TextInput
              value={firstName}
              updateValue={setFirstName}
              label="First name"
            />
            <TextInput
              value={lastName}
              updateValue={setLastName}
              label="Last name"
            />
            <TextInput value={email} updateValue={setEmail} label="E-mail" />

            <input
              onClick={jsSubmit(submit)}
              type="submit"
              value="Proceed and close"
            />
        </form>
    );
};

export { EditStudentDataPage };

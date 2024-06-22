import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Group, Text } from '@mantine/core';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { StudentForm } from '../StudentForm';

const AddNewStudentPage: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const { send: sendRequest, data: response, ...request } = useRequest();

    const submit = () => {
        sendRequest(`${settings.backendAPIUrl}students`, {
            method: 'POST',
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
        <Card withBorder shadow="md" maw={800} my={20} mx="auto">
            <Group gap={20} p={10}>
                <Text component="h2" size="lg">
                    Add new student
                </Text>

                <StudentForm
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setEmail={setEmail}
                  submit={submit}
                />
            </Group>
        </Card>
    );
};

export { AddNewStudentPage };

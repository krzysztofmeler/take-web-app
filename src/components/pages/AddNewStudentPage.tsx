import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Grid,
    Group,
    MultiSelect,
    Text,
    TextInput,
} from '@mantine/core';
import { jsSubmit } from '../../utils/js-submit';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { update } from '../../utils/forms';

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

                <Grid maw={700}>
                    <Grid.Col span={6}>
                        <TextInput
                          value={firstName}
                          onChange={update(setFirstName)}
                          label="Name"
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                          value={lastName}
                          onChange={update(setLastName)}
                          label="Surname"
                        />
                    </Grid.Col>

                    <Grid.Col span={8}>
                        <TextInput
                          value={email}
                          onChange={update(setEmail)}
                          label="E-mail"
                        />
                    </Grid.Col>

                    <Grid.Col span={10}>
                        <Button onClick={jsSubmit(submit)}>
                            Proceed and close
                        </Button>
                    </Grid.Col>
                </Grid>
            </Group>
        </Card>
    );
};

export { AddNewStudentPage };

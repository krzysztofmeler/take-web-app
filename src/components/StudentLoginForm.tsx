import { Button, Flex, TextInput } from '@mantine/core';
import { FC, useState } from 'react';
import { jsSubmit } from '../utils/js-submit';
import { Student } from '../model/existing-objects/Student';
import { request } from '../utils/request';
import { update } from '../utils/forms';

type StudentLoginFormProps = {
    onSuccess: (student: Student) => void;
    onFailure: (error: Error) => void;
};

const StudentLoginForm: FC<StudentLoginFormProps> = ({
    onSuccess,
    onFailure,
}) => {
    const [email, setEmail] = useState<string>('');

    const submit = async () => {
        try {
            const response = await request.get(
                `students/email/${encodeURIComponent(email)}`,
                {
                    validateStatus: () => true,
                },
            );

            switch (response.status) {
                case 200:
                    onSuccess(response.data);
                    break;
                case 404:
                    onFailure(new Error('Invalid student e-mail provided'));
                    break;
                case 405:
                    onFailure(new Error('E-mail must be provided.'));
                    break;
                default: {
                    onFailure(new Error('Unknown error occurred.'));
                    console.error(response);
                }
            }
        } catch (err) {
            console.error(err);
            onFailure(
                new Error('Network error, check your internet connection.'),
            );
        }
    };

    return (
        <Flex direction="column" gap={20}>
            <TextInput
                maw={400}
                value={email}
                onChange={update(setEmail)}
                label="E-mail"
            />

            <Button
                maw={240}
                color="blue"
                radius="md"
                onClick={jsSubmit(submit)}
            >
                Login
            </Button>
        </Flex>
    );
};

export { StudentLoginForm };
export type { StudentLoginFormProps };

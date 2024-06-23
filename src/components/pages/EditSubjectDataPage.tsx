import { FC, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { SubjectForm } from '../SubjectForm';
import { request } from '../../utils/request';
import { Subject } from '../../model/existing-objects/Subject';

const EditSubjectDataPage: FC = () => {
    const [name, setName] = useState<string>('');

    const { id } = useParams();

    useAsyncEffect(async () => {
        const response = await request.get('/subjects');

        if (response.status === 200) {
            const subject = (response.data as Subject[]).find(
                (s) => s.id.toString() === id,
            );

            if (subject === undefined) {
                // todo: handle as error
            } else {
                setName(subject.name);
            }
        }
    }, []);

    const navigate = useNavigate();

    const submit = async () => {
        const response = await request.put(`/subjects/${id}`, {
            name,
        });

        if (response.status === 200) {
            setTimeout(() => {
                navigate(`/administration/subject-data/${id}`);
            }, 500);
        }
    };

    return (
        <Card withBorder shadow="md" maw={800} my={20} mx="auto">
            <Group gap={20} p={10}>
                <Text component="h2" size="lg" w="100%">
                    Edit subject name
                </Text>

                <Group maw={700}>
                    <SubjectForm
                      name={name}
                      setName={setName}
                      submit={submit}
                    />
                </Group>
            </Group>
        </Card>
    );
};

export { EditSubjectDataPage };

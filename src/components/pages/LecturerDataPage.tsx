import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
    Badge,
    Button,
    Card,
    Divider,
    Flex,
    Loader,
    Text,
} from '@mantine/core';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { LecturerAvatar } from '../LecturerAvatar';

const LecturerDataPage: FC = () => {
    const [lecturer, setLecturer] = useState<Lecturer | null>(null);

    const { id } = useParams();

    const lecturerRequest = useRequest(
        `${settings.backendAPIUrl}lecturers/profile/${id}`,
        {
            method: 'GET',
        },
    );

    // todo: fix duplicated request to survey data EP via GET

    useEffect(() => {
        if (lecturerRequest.error) {
            alert('An error occurred');
            console.error(lecturerRequest.error);
        }
    }, [lecturerRequest.error]);

    useEffect(() => {
        if (lecturerRequest.data) {
            setLecturer(lecturerRequest.data as Lecturer);
        }
    }, [lecturerRequest.data]);

    if (lecturer === null) {
        return (
            <Flex
              mih={200}
              w="100%"
              align="center"
              direction="column"
              justify="center"
            >
                <Loader size="lg" />
            </Flex>
        );
    }

    return (
        <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
            <Flex justify="space-between" align="center">
                <Text component="h2" size="xl">
                    Lecturer
                </Text>

                <Button
                  component={Link}
                  to={`/administration/edit-lecturer-data/${id}`}
                >
                    Edit profile
                </Button>
            </Flex>

            <Divider my={12} />

            <Card withBorder maw={1200} shadow="md">
                <Flex align="center" gap={20}>
                    <LecturerAvatar lecturer={lecturer} />

                    <Flex direction="column" align="start">
                        <Text>
                            {lecturer.firstName} {lecturer.lastName}
                        </Text>
                        <Text size="xs">{lecturer.email}</Text>

                        <Flex mt={7} wrap="wrap" justify="start" gap={8}>
                            {lecturer.subjects.map((subject) => (
                                <Badge fw={400}>{subject}</Badge>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
};

export { LecturerDataPage };

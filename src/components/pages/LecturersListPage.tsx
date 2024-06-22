import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    Divider,
    Flex,
    Grid,
    Group,
    Loader,
    Space,
    Text,
    TextInput,
} from '@mantine/core';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { update } from '../../utils/forms';
import { jsSubmit } from '../../utils/js-submit';
import { SurveyListStudentSection } from '../SurveyListStudentSection';
import { LecturerAvatar } from '../LecturerAvatar';

const LecturersListPage: FC = () => {
    const {
        data: lecturers,
        processing,
        error,
    } = useRequest(`${settings.backendAPIUrl}lecturers`, { method: 'GET' });

    // todo: fix duplicated request to lecturers list via GET

    useEffect(() => {
        if (error) {
            alert('An error occurred');
            console.error(error);
        }
    }, [error]);

    const deleteLecturer = async (email: string) => {
        const response = await fetch(
            `${settings.backendAPIUrl}lecturers/email/${encodeURIComponent(
                email,
            )}`,
            { mode: 'cors', method: 'DELETE' },
        );
    };

    if (lecturers === null) {
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
                    Lecturers
                </Text>

                <Button component={Link} to="/administration/add-new-lecturer">
                    Add new
                </Button>
            </Flex>

            <Divider my={10} />

            <Group gap={10}>
                {(lecturers as Lecturer[]).map((lecturer) => (
                    <Card w="100%" shadow="sm" withBorder>
                        <Flex justify="space-between">
                            <Flex align="center" gap={20}>
                                <LecturerAvatar lecturer={lecturer} />

                                <Flex direction="column" align="start">
                                    <Text>
                                        {lecturer.firstName} {lecturer.lastName}
                                    </Text>
                                    <Text size="xs">{lecturer.email}</Text>
                                </Flex>
                            </Flex>

                            <Flex gap={12} align="center">
                                <Button
                                  variant="subtle"
                                  c="red"
                                  onClick={() =>
                                        deleteLecturer(lecturer.email)
                                    }
                                >
                                    Delete
                                </Button>
                                <Button
                                  variant="subtle"
                                  component={Link}
                                  to={`/administration/edit-lecturer-data/${lecturer.lecturerId}`}
                                >
                                    Edit
                                </Button>

                                <Divider orientation="vertical" mx={3} />

                                <Button
                                  component={Link}
                                  to={`/administration/lecturer-profile/${lecturer.lecturerId}`}
                                >
                                    Show {'>'}
                                </Button>
                            </Flex>
                        </Flex>
                    </Card>
                ))}
            </Group>
        </Flex>
    );
};

export { LecturersListPage };

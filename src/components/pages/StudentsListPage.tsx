import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    Divider,
    Flex,
    Group,
    Loader,
    Text,
} from '@mantine/core';
import { Student } from '../../model/existing-objects/Student';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { LecturerAvatar } from '../LecturerAvatar';
import { StudentAvatar } from '../StudentAvatar';

const StudentsListPage: FC = () => {
    const [students, setStudents] = useState<Student[]>([]);

    const { data, error } = useRequest(`${settings.backendAPIUrl}students`, {
        method: 'GET',
    });

    // todo: fix duplicated request to students list via GET

    useEffect(() => {
        if (error) {
            alert('An error occurred.');
            console.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setStudents(data as Student[]);
        }
    }, [data]);

    const deleteStudent = async (email: string) => {
        const response = await fetch(
            `${settings.backendAPIUrl}students/email/${encodeURIComponent(
                email,
            )}`,
            { mode: 'cors', method: 'DELETE' },
        );

        if (response.status === 204) {
            setStudents(students.filter((s) => s.email !== email));
        }
    };

    if (students === null) {
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
                    Students
                </Text>

                <Button component={Link} to="/administration/add-new-student">
                    Add new
                </Button>
            </Flex>

            <Divider my={10} />

            <Group gap={10}>
                {(students as Student[]).map((student) => (
                    <Card w="100%" shadow="sm" withBorder>
                        <Flex justify="space-between">
                            <Flex align="center" gap={20}>
                                <StudentAvatar student={student} />

                                <Flex direction="column" align="start">
                                    <Text>
                                        {student.firstName} {student.lastName}
                                    </Text>
                                    <Text size="xs">{student.email}</Text>
                                </Flex>
                            </Flex>

                            <Flex gap={12} align="center">
                                <Button
                                  variant="subtle"
                                  c="red"
                                  onClick={() => deleteStudent(student.email)}
                                >
                                    Delete
                                </Button>
                                <Button
                                  variant="subtle"
                                  component={Link}
                                  to={`/administration/edit-student-data/${student.studentId}`}
                                >
                                    Edit
                                </Button>

                                <Divider orientation="vertical" mx={3} />

                                <Button
                                  component={Link}
                                  to={`/administration/surveys-of-student/${student.studentId}`}
                                >
                                    Show surveys {'>'}
                                </Button>
                            </Flex>
                        </Flex>
                    </Card>
                ))}
            </Group>
        </Flex>
    );
};

export { StudentsListPage };

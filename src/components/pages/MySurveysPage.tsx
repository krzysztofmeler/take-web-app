import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    Flex,
    Group,
    Text,
    Image,
    TextInput,
    Space,
    Avatar,
} from '@mantine/core';
import { jsSubmit } from '../../utils/js-submit';
import { useRequest } from '../../hooks/useRequest.hook';
import {
    Student,
    StudentWithSurveys,
} from '../../model/existing-objects/Student';
import { BasicSurvey } from '../../model/existing-objects/Survey';
import { ResponseError } from '../../errors/types/ResponseError';
import { settings } from '../../settings';
import { request } from '../../utils/request';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';

const MySurveysPage: FC = () => {
    const [studentId, setStudentId] = useState<number | null>(null);

    const [student, setStudent] = useState<Student | null>(null);
    const [email, setEmail] = useState<string>('');

    useAsyncEffect(async () => {
        const storedStudentId = window.localStorage.getItem(
            'take-web-app:student-login:id',
        );

        if (storedStudentId) {
            setStudentId(Number.parseInt(storedStudentId, 10));
        }
    }, []);

    useAsyncEffect(async () => {
        if (studentId) {
            const response = await request.get(`students/profile/${studentId}`);
            setStudent(response.data as Student);
        }
    }, [studentId]);

    const {
        send: requestStudentByEmail,
        data: studentResponse,
        ...studentRequest
    } = useRequest();
    const {
        send: requestAllSurveys,
        data: allSurveysResponse,
        ...allSurveysRequest
    } = useRequest();
    const {
        send: requestFilledSurveys,
        data: filledSurveysResponse,
        ...filledSurveysRequest
    } = useRequest();

    const submitEmail = () => {
        requestStudentByEmail(
            `${settings.backendAPIUrl}students/email/${encodeURIComponent(
                email,
            )}`,
            { method: 'GET', mode: 'cors' },
        );
    };

    useEffect(() => {
        if (studentRequest.error) {
            // todo: better error handling
            if (studentRequest.error instanceof ResponseError) {
                window.alert('Student not found by this email');
            } else {
                window.alert('An error occurred');
            }
        }
    }, [studentRequest.error]);

    useEffect(() => {
        // Checking of student by email request result
        if (studentResponse && Object.hasOwn(studentResponse, 'studentId')) {
            setStudentId((studentResponse as Student).studentId);
        }
    }, [studentResponse]);

    useEffect(() => {
        if (studentId) {
            window.localStorage.setItem(
                'take-web-app:student-login:id',
                studentId.toString(),
            );
        }
    }, [studentId]);

    useEffect(() => {
        if (studentId) {
            // student id is set, so we can ask for all surveys and surveys filled by this student
            requestFilledSurveys(
                `${settings.backendAPIUrl}students/profile/${studentId}`,
                { method: 'GET', mode: 'cors' },
            );

            requestAllSurveys(`${settings.backendAPIUrl}surveys`, {
                method: 'GET',
                mode: 'cors',
            });
        }
    }, [studentId]);

    const [surveys, setSurveys] = useState<BasicSurvey[]>([]);

    useEffect(() => {
        /*
        There is no single endpoint we can ask for surveys so the list of
        surveys to be filled need to be prepared from data about all surveys.
        We need list of surveys filled by student and subtract them from
        list of all surveys so the result contains only surveys without
        answers from this student.
         */

        if (filledSurveysResponse !== null && allSurveysResponse !== null) {
            const filteredSurveys = (
                allSurveysResponse as BasicSurvey[]
            ).filter(
                (survey) =>
                    !(filledSurveysResponse as StudentWithSurveys).surveys.find(
                        (s) => s.surveyId === survey.surveyId,
                    ),
            );

            setSurveys(filteredSurveys);
        }
    }, [filledSurveysResponse, allSurveysResponse]);

    const logout = () => {
        setStudent(null);
        setStudentId(null);
        window.localStorage.removeItem('take-web-app:student-login:id');
    };

    if (studentId && student === null) {
        return <>Loading</>;
    } else if (studentId === null) {
        return (
            <Flex justify="left" direction="column" w="100%">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Group justify="space-between" mt="md" mb="xs">
                        <Text component="h2" fw={500}>
                            Login
                        </Text>
                    </Group>

                    <Text size="sm" c="dimmed">
                        You have to provide your student's email address to to
                        start surveys completion
                    </Text>

                    <Space mih={20} />

                    <TextInput
                      maw={400}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="E-mail"
                    />

                    <Space mih={20} />

                    <Button
                      maw={240}
                      color="blue"
                      radius="md"
                      onClick={jsSubmit(submitEmail)}
                    >
                        Login
                    </Button>
                </Card>
            </Flex>
        );
    } else if (student !== null) {
        return (
            <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
                <Flex justify="space-between" align="center">
                    <Text component="h2" size="xl">
                        Fill surveys
                    </Text>
                    <Group>
                        <Avatar color="cyan" radius="xl">
                            {student.firstName.at(0)}
                            {student.lastName.at(0)}
                        </Avatar>
                        <Text>{student.email}</Text>
                        <Button onClick={jsSubmit(logout)} variant="filled">
                            Logout
                        </Button>
                    </Group>
                </Flex>
                <div>
                    {(studentRequest.processing ||
                        filledSurveysRequest.processing) && (
                        <div>loading list of your surveys...</div>
                    )}
                    {!(
                        studentRequest.processing ||
                        filledSurveysRequest.processing
                    ) && (
                        <ul>
                            {surveys.map((survey) => (
                                <li key={survey.surveyId}>
                                    {' '}
                                    <Link
                                      to={`/complete-survey/${survey.surveyId}`}
                                    >
                                        {survey.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Flex>
        );
    } else {
        console.error('error');
        return <>error</>;
    }
};

export { MySurveysPage };

import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import {
    Blockquote,
    Card,
    Flex,
    Group,
    Loader,
    Space,
    Text,
} from '@mantine/core';
import { useRequest } from '../../hooks/useRequest.hook';
import { Subject } from '../../model/existing-objects/Subject';
import { settings } from '../../settings';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { LecturerForm } from '../LecturerForm';

const EditLecturerDataPage: FC = () => {
    const { id } = useParams();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subjectIds, setSubjectIds] = useState<string[] | null>(null);

    const { send: sendRequest, data: response, ...request } = useRequest();

    const { data: lecturer, error: lecturerReqError } = useRequest(
        `${settings.backendAPIUrl}lecturers/profile/${id}`,
        { method: 'GET' },
    );

    const { data: subjects, error } = useRequest(
        `${settings.backendAPIUrl}subjects`,
        { method: 'GET' },
    );

    useEffect(() => {
        if (lecturer && subjects) {
            const lecturerData: Lecturer = lecturer as Lecturer;
            const subjectsData: Subject[] = subjects as Subject[];

            setEmail(lecturerData.email);
            setFirstName(lecturerData.firstName);
            setLastName(lecturerData.lastName);
            setSubjectIds(
                lecturerData.subjects.map((name) =>
                    (
                        subjectsData.find((sub) => sub.name === name) as Subject
                    ).id.toString(),
                ),
            );
        }
    }, [lecturer, subjects]);

    // todo: fix duplicated request to lecturers list via GET

    useEffect(() => {
        if (error) {
            alert(
                'An error occurred while loading list of subjects. Subject selection function unavailable and form is disabled. Reload if needed.',
            );
            console.error(error);
        }
    }, [error]);

    const submit = () => {
        if (subjectIds === null) {
            return;
        }

        sendRequest(`${settings.backendAPIUrl}lecturers/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                subjectIds: subjectIds.map((id) => parseInt(id, 10)),
                surveys: [],
            }),
        });
    };

    useEffect(() => {
        if (request.error) {
            window.alert('An error occurred!'); // TODO: add proper handling
            console.error(request.error);
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

    useEffect(() => {
        if (subjects !== null && lecturer) {
            const preselectedSubjects = (lecturer as Lecturer).subjects
                .map((name) =>
                    (subjects as Subject[]).find((s) => s.name === name),
                )
                .map((s) => s!.id.toString());
            console.dir({ preselectedSubjects });
            setSubjectIds(preselectedSubjects);
        }
    }, [subjects, lecturer]);

    if (subjectIds === null || lecturer === null) {
        return (
            <Flex
              mih={200}
              w="100%"
              align="center"
              direction="column"
              justify="center"
            >
                <Loader size="lg" />
                <Space h={20} />
                <Text>Loading subject list</Text>
            </Flex>
        );
    }

    return (
        <Card withBorder shadow="md" maw={800} my={20} mx="auto">
            <Group gap={20} p={10}>
                <Text component="h2" size="lg">
                    Edit lecturer profile
                </Text>
                <Blockquote p={10}>
                    <Text size="xs">
                        Editing lecturer data does modify data immediately. If
                        new subject are selected, additional surveys will be
                        created. Existing surveys are not deleted even if
                        subject is removed from the list.
                    </Text>
                </Blockquote>

                <Group maw={700}>
                    <LecturerForm
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      setFirstName={setFirstName}
                      setLastName={setLastName}
                      setEmail={setEmail}
                      submit={submit}
                      subjects={subjects as Subject[]}
                      setSubjectIds={setSubjectIds}
                      subjectIds={subjectIds}
                    />
                </Group>
            </Group>
        </Card>
    );
};

export { EditLecturerDataPage };

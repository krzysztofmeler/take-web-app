import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blockquote, Card, Flex, Group, Loader, Space, Text } from '@mantine/core';
import { useRequest } from '../../hooks/useRequest.hook';
import { Subject } from '../../model/existing-objects/Subject';
import { settings } from '../../settings';
import { LecturerForm } from '../LecturerForm';

const AddNewLecturerPage: FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subjectIds, setSubjectIds] = useState<string[]>([]);

  const [formEnabled, setFormEnabled] = useState(true); // false because list of subjects needs to be loaded

  const { send: sendRequest, data: response, ...request } = useRequest();

  const { data: subjects, error } = useRequest(`${settings.backendAPIUrl}subjects`, { method: 'GET' });

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
    setFormEnabled(false);
    sendRequest(`${settings.backendAPIUrl}lecturers`, {
      method: 'POST',
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
      setFormEnabled(true);
    }
  }, [request.error]);

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof response === 'object' && response !== null && Object.hasOwn(response, 'lecturerId')) {
      navigate('/administration/lecturers-list');
    }
  }, [response]);

  if (error) {
    return <>Error</>;
  }

  if (subjects === null) {
    return (
      <Flex mih={200} w="100%" align="center" direction="column" justify="center">
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
          Add new Lecturer
        </Text>
        <Blockquote p={10}>
          <Text size="xs">
            Adding new lecturer will cause new set of questions within new survey to be created for this lecturer. This
            is automatic and cannot be disabled.
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

export { AddNewLecturerPage };

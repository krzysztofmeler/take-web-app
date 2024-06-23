import { FC, useState } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { SubjectForm } from '../SubjectForm';

const AddNewSubjectPage: FC = () => {
  const [name, setName] = useState<string>('');

  const { send: sendRequest, data: response } = useRequest();

  const submit = () => {
    sendRequest(`${settings.backendAPIUrl}subjects`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
  };

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10} display="flex" style={{ flexDirection: 'column', alignItems: 'start' }}>
        <Text component="h2" size="lg">
          Add new subject
        </Text>

        <Group maw={700}>
          <SubjectForm name={name} setName={setName} submit={submit} />
        </Group>
      </Group>
    </Card>
  );
};

export { AddNewSubjectPage };

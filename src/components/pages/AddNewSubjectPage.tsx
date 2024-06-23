import { FC, useEffect, useState } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest.hook';
import { SubjectForm } from '../SubjectForm';
import { useAddSubject } from '../../hooks/useAddSubject.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { sleep } from '../../utils/sleep';
import { showNotification } from '../../utils/Notifications';

const AddNewSubjectPage: FC = () => {
  const [name, setName] = useState<string>('');

  const { send: sendRequest, data: response } = useRequest();

  const { proceed: addSubject, result: addSubjectResult } = useAddSubject();

  const navigate = useNavigate();

  const submit = async () => {
    await addSubject({ name });
  };

  useEffect(() => {
    if (addSubjectResult === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check provided data and try again or contact administrator.',
      });
    } else if (addSubjectResult === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'New subject added',
        message: '',
      });
    }
  }, [addSubjectResult]);

  useAsyncEffect(async () => {
    if (addSubjectResult === BasicRequestResult.Ok) {
      await sleep(500);
      navigate('/administration/subjects-list');
    }
  }, [addSubjectResult]);

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10} display="flex" style={{ flexDirection: 'column', alignItems: 'start' }}>
        <Text component="h2" size="lg">
          Add new subject
        </Text>

        <Group maw={700}>
          <SubjectForm
            name={name}
            setName={setName}
            submit={submit}
            loading={addSubjectResult === BasicRequestResult.Loading}
            disableSubmit={[BasicRequestResult.Loading, BasicRequestResult.Ok].includes(addSubjectResult)}
          />
        </Group>
      </Group>
    </Card>
  );
};

export { AddNewSubjectPage };

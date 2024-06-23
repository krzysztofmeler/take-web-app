import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Group, Text } from '@mantine/core';
import { StudentForm } from '../StudentForm';
import { useAddStudent } from '../../hooks/useAddStudent.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { showNotification } from '../../utils/Notifications';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { sleep } from '../../utils/sleep';

const AddNewStudentPage: FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { result, proceed: addStudent } = useAddStudent();

  const navigate = useNavigate();

  const submit = async () => {
    await addStudent({
      firstName,
      lastName,
      email,
    });
  };

  useEffect(() => {
    if (result === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'New student added',
        message: 'Student has been added to system and can now login and fill existing surveys.',
      });
    } else if (result === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check provided data and try again or contact administrator.',
      });
    }
  }, [result]);

  useAsyncEffect(async () => {
    if (result === BasicRequestResult.Ok) {
      await sleep(500);
      navigate('/administration/students-list');
    }
  }, [result]);

  // todo: submit button should be disabled if fields are not filled

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10}>
        <Text component="h2" size="lg">
          Add new student
        </Text>

        <StudentForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          submit={submit}
          loading={result === BasicRequestResult.Loading}
          submitDisabled={[BasicRequestResult.Loading, BasicRequestResult.Ok].includes(result)}
        />
      </Group>
    </Card>
  );
};

export { AddNewStudentPage };

import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Card, Group, Text } from '@mantine/core';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { Student } from '../../model/existing-objects/Student';
import { StudentForm } from '../StudentForm';

const EditStudentDataPage: FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const { id } = useParams();

  const { data: studentData } = useRequest(`${settings.backendAPIUrl}students/profile/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (studentData) {
      const studentData2 = studentData as Student;

      setFirstName(studentData2.firstName);
      setLastName(studentData2.lastName);
      setEmail(studentData2.email);
    }
  }, [studentData]);

  const { send: sendRequest, data: response, ...request } = useRequest();

  const submit = () => {
    sendRequest(`${settings.backendAPIUrl}students/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
      }),
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (typeof response === 'object' && response !== null && Object.hasOwn(response, 'studentId')) {
      navigate('/administration/students-list');
    }
  }, [response]);

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10}>
        <Text component="h2" size="lg">
          Edit student profile
        </Text>

        <StudentForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          submit={submit}
          submitDisabled={false} // todo
        />
      </Group>
    </Card>
  );
};

export { EditStudentDataPage };

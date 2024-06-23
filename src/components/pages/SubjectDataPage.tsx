import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Divider, Flex, Group, Loader, Space, Text } from '@mantine/core';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { SubjectWithLecturers } from '../../model/existing-objects/Subject';
import { InitialsAvatar } from '../InitialsAvatar';
import { jsSubmit } from '../../utils/js-submit';
import { request } from '../../utils/request';

const SubjectDataPage: FC = () => {
  const [subject, setSubject] = useState<SubjectWithLecturers | null>(null);

  const { id } = useParams();

  const subjectRequest = useRequest(`${settings.backendAPIUrl}subjects/profile/${id}`, {
    method: 'GET',
  });

  // todo: fix duplicated request to survey data EP via GET

  useEffect(() => {
    if (subjectRequest.error) {
      alert('An error occurred');
      console.error(subjectRequest.error);
    }
  }, [subjectRequest.error]);

  useEffect(() => {
    if (subjectRequest.data) {
      setSubject(subjectRequest.data as SubjectWithLecturers);
    }
  }, [subjectRequest.data]);

  const navigate = useNavigate();

  if (subject === null) {
    return (
      <Flex mih={200} w="100%" align="center" direction="column" justify="center">
        <Loader size="lg" />
      </Flex>
    );
  }

  const deleteSubject = async () => {
    const response = await request.delete(`/subjects/name/${encodeURIComponent(subject.name)}`);

    if (response.status === 204) {
      navigate('/administration/subjects-list');
    } else {
      // todo: handling of issues
    }
  };

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Subject
        </Text>

        <Group gap={10}>
          <Button variant="subtle" c="red" onClick={jsSubmit(deleteSubject)}>
            Delete
          </Button>

          <Button component={Link} to={`/administration/edit-subject-data/${subject.id}`}>
            Edit name
          </Button>
        </Group>
      </Flex>

      <Divider my={10} />

      <Card w="100%" shadow="sm" withBorder>
        <Text>Name: {subject.name}</Text>
      </Card>

      <Space h={50} />

      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Lecturers conducting classes
        </Text>
      </Flex>

      <Divider my={10} />

      <Group gap={10}>
        {subject.lecturersNames.map((lecturer) => (
          <Card w="100%" shadow="sm" withBorder key={lecturer}>
            <Flex align="center" gap={20}>
              <InitialsAvatar firstName={lecturer.split(' ')[0]} lastName={lecturer.split(' ')[1]} />

              <Flex direction="column" align="start">
                <Text>{lecturer}</Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Group>
    </Flex>
  );
};

export { SubjectDataPage };

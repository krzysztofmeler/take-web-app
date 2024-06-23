import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Flex, Group, Loader, Text } from '@mantine/core';
import { Subject } from '../../model/existing-objects/Subject';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';

const SubjectsListPage: FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const { data, processing, error } = useRequest(`${settings.backendAPIUrl}subjects`, { method: 'GET' });

  // todo: fix duplicated request to lecturers list via GET

  useEffect(() => {
    if (error) {
      alert('An error occurred.');
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setSubjects(data as Subject[]);
    }
  }, [data]);

  if (subjects === null) {
    return (
      <Flex mih={200} w="100%" align="center" direction="column" justify="center">
        <Loader size="lg" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Subjects
        </Text>

        <Button component={Link} to="/administration/add-new-subject">
          Add new
        </Button>
      </Flex>

      <Divider my={10} />

      <Group gap={10}>
        {(subjects as Subject[]).map((subject) => (
          <Card w="100%" shadow="sm" withBorder key={subject.id}>
            <Flex justify="space-between" align="center">
              <Text>{subject.name}</Text>

              <Button component={Link} to={`/administration/subject-data/${subject.id}`}>
                Show {'>'}
              </Button>
            </Flex>
          </Card>
        ))}
      </Group>
    </Flex>
  );
};

export { SubjectsListPage };

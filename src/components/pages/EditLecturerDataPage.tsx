import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Blockquote, Card, Flex, Group, Loader, Space, Text } from '@mantine/core';
import { Subject } from '../../model/existing-objects/Subject';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { LecturerForm } from '../LecturerForm';
import { useGetSubjects } from '../../hooks/useGetSubjects.hook';
import { useGetLecturer } from '../../hooks/useGetLecturer.hook';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { SubpageError } from '../SubpageError';
import { useEditLecturer } from '../../hooks/useEditLecturer.hook';
import { sleep } from '../../utils/sleep';
import { showNotification } from '../../utils/Notifications';

const EditLecturerDataPage: FC = () => {
  const { id } = useParams();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subjectIds, setSubjectIds] = useState<string[] | null>(null);

  const { subjects, error: getSubjectsError } = useGetSubjects();
  const { get: getLecturer, result: getLecturerResult } = useGetLecturer();

  const [lecturer, setLecturer] = useState<Lecturer | null>(null);

  const { proceed: editLecturer, result: editLecturerResult } = useEditLecturer();

  const navigate = useNavigate();

  useAsyncEffect(async () => {
    const lecturerData = await getLecturer(id!);

    if (lecturerData) {
      setLecturer(lecturerData);
    }
  }, []);

  useEffect(() => {
    if (subjects !== null && lecturer !== null) {
      setFirstName(lecturer.firstName);
      setLastName(lecturer.lastName);
      setEmail(lecturer.email);
      setSubjectIds(
        lecturer.subjects.map((name) => (subjects.find((sub) => sub.name === name) as Subject).id.toString()),
      );
    }
  }, [subjects, lecturer]);

  const submit = async () => {
    if (lecturer === null || subjects === null || subjectIds === null) {
      return;
    }

    await editLecturer(lecturer.lecturerId, {
      firstName,
      lastName,
      email,
      subjectIds: subjectIds.map((id) => Number.parseInt(id, 10)),
    });
  };

  useEffect(() => {
    if (editLecturerResult === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check your data and try again or contact administrator.',
      });
    } else if (editLecturerResult === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'Success',
        message: "Lecturer's profile successfully updated",
      });
    }
  }, [editLecturerResult]);

  useAsyncEffect(async () => {
    if (editLecturerResult === BasicRequestResult.Ok) {
      await sleep(500);
      navigate(`/administration/lecturer-profile/${id}`);
    }
  }, [editLecturerResult]);

  if (getSubjectsError || getLecturerResult === BasicRequestResult.Error) {
    return <SubpageError text="An error occurred while loading data. Try again later or contact administrator." />;
  }

  if (subjectIds === null || lecturer === null) {
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
          Edit lecturer profile
        </Text>
        <Blockquote p={10}>
          <Text size="xs">
            Editing lecturer data does modify data immediately. If new subject are selected, additional surveys will be
            created. Existing surveys are not deleted even if subject is removed from the list.
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
            disableSubmit={[BasicRequestResult.Ok, BasicRequestResult.Loading].includes(editLecturerResult)}
            loading={editLecturerResult === BasicRequestResult.Loading}
          />
        </Group>
      </Group>
    </Card>
  );
};

export { EditLecturerDataPage };

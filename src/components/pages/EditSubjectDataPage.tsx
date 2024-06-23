import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { SubjectForm } from '../SubjectForm';
import { Subject } from '../../model/existing-objects/Subject';
import { useGetSubjects } from '../../hooks/useGetSubjects.hook';
import { useEditSubject } from '../../hooks/useEditSubject.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { showNotification } from '../../utils/Notifications';
import { sleep } from '../../utils/sleep';
import { SubpageError } from '../SubpageError';

const EditSubjectDataPage: FC = () => {
  const [name, setName] = useState<string>('');

  const { id } = useParams();

  const { subjects, error: getSubjectsError } = useGetSubjects();

  const { proceed: editSubject, result: editSubjectResult } = useEditSubject();

  const [subject, setSubject] = useState<Subject | null>(null);

  const [notFoundError, setNotFoundError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (subjects !== null) {
      const matchingSubject = subjects.find((s) => s.id.toString() === id);

      if (matchingSubject) {
        setSubject(matchingSubject);
        setName(matchingSubject.name);
      } else {
        setNotFoundError(true);
      }
    }
  }, [subjects]);

  const submit = async () => {
    await editSubject(id!, { name });
  };

  useEffect(() => {
    if (editSubjectResult === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check your data and try again or contact administrator.',
      });
    } else if (editSubjectResult === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'Success',
        message: 'Subject data successfully updated',
      });
    }
  }, [editSubjectResult]);

  useAsyncEffect(async () => {
    if (editSubjectResult === BasicRequestResult.Ok) {
      await sleep(500);
      navigate(`/administration/subject-data/${id}`);
    }
  }, [editSubjectResult]);

  if (notFoundError) {
    return <SubpageError text="Subject not found" />;
  } else if (getSubjectsError) {
    return <SubpageError text="Unknown error occurred" />;
  }

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10}>
        <Text component="h2" size="lg" w="100%">
          Edit subject name
        </Text>

        <Group maw={700}>
          <SubjectForm
            name={name}
            setName={setName}
            submit={submit}
            disableSubmit={[BasicRequestResult.Loading, BasicRequestResult.Ok].includes(editSubjectResult)}
            loading={editSubjectResult === BasicRequestResult.Loading}
          />
        </Group>
      </Group>
    </Card>
  );
};

export { EditSubjectDataPage };

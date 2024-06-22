import { FC } from 'react';
import { Button, Group, Text } from '@mantine/core';
import { StudentAvatar } from './StudentAvatar';
import { jsSubmit } from '../utils/js-submit';
import { Student } from '../model/existing-objects/Student';

type SurveyListStudentSectionProps = {
    student: Student;
    logout: () => void;
};

const SurveyListStudentSection: FC<SurveyListStudentSectionProps> = ({
    student,
    logout,
}) => (
    <Group>
        <StudentAvatar student={student} />
        <Text>{student.email}</Text>
        <Button onClick={jsSubmit(logout)} variant="filled">
            Logout
        </Button>
    </Group>
);

export { SurveyListStudentSection };
export type { SurveyListStudentSectionProps };

import { FC } from 'react';
import { Avatar } from '@mantine/core';
import { Student } from '../model/existing-objects/Student';

type StudentAvatarProps = {
    student: Student;
};

const StudentAvatar: FC<StudentAvatarProps> = ({
    student: { firstName, lastName },
}) => (
    <Avatar color="cyan" radius="xl">
        {firstName.at(0)}
        {lastName.at(0)}
    </Avatar>
);

export { StudentAvatar };
export type { StudentAvatarProps };

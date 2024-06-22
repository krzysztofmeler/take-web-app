import { FC } from 'react';
import { Avatar } from '@mantine/core';
import { Lecturer } from '../model/existing-objects/Lecturer';

type LecturerAvatarProps = {
    lecturer: Lecturer;
};
const LecturerAvatar: FC<LecturerAvatarProps> = ({
    lecturer: { firstName, lastName },
}) => (
    <Avatar color={firstName.endsWith('a') ? 'pink' : 'blue'} radius="xl">
        {firstName.at(0)}
        {lastName.at(0)}
    </Avatar>
);

export { LecturerAvatar };
export type { LecturerAvatarProps };
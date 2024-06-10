import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';

const AddNewLecturerPage: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subjectIds, setSubjectIds] = useState<string[]>([]);

    const submit = () => {
        console.log('lecturer submit handler'); // todo: add real handling
    };

    // todo: add multivalue selector for subjects

    return (
        <form>
            <TextInput
              value={firstName}
              updateValue={setFirstName}
              label="Name"
            />
            <TextInput
              value={lastName}
              updateValue={setLastName}
              label="Surname"
            />
            <TextInput value={email} updateValue={setEmail} label="E-mail" />

            <input
              onClick={jsSubmit(submit)}
              type="submit"
              value="Proceed and close"
            />
        </form>
    );
};

export { AddNewLecturerPage };

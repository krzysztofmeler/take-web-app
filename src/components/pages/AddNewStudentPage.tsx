import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';

const AddNewStudentPage: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const submit = () => {
        console.log('student submit handler'); // todo: add real handling
    };

    return (
        <form>
            <TextInput
              value={firstName}
              updateValue={setEmail}
              label="First name"
            />
            <TextInput
              value={lastName}
              updateValue={setEmail}
              label="Last name"
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

export { AddNewStudentPage };

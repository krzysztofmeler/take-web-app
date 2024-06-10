import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';

const AddNewLecturerPage: FC = () => {
    const [name, setName] = useState<string>('');

    const submit = () => {
        console.log('lecturer submit handler'); // todo: add real handling
    };

    return (
        <form>
            <TextInput value={name} updateValue={setName} label="Name" />

            <input
              onClick={jsSubmit(submit)}
              type="submit"
              value="Proceed and close"
            />
        </form>
    );
};

export { AddNewLecturerPage };

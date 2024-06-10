import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';

const AddNewSubjectPage: FC = () => {
    const [name, setName] = useState<string>('');
    const [lecturerId, setLecturerId] = useState<string | null>(null);

    const submit = () => {
        console.log('sss');
    };

    // const getLecturersResult = useGetLecturers();

    const [lecturers, setLecturers] = useState<Lecturer[]>([]);

    // useEffect(() => {
    //   if (getLecturersResult.lecturers) {
    //       console.log(getLecturersResult.lecturers);
    //       setLecturers(getLecturersResult.lecturers);
    //     }
    // }, [getLecturersResult.lecturers]);

    return (
        <form>
            <TextInput value={name} updateValue={setName} label="Name" />
            <BasicSelector
              values={[]}
              value={lecturerId}
              updateValue={setLecturerId}
              label="Lecturer"
            />

            <input
              onClick={jsSubmit(submit)}
              type="submit"
              value="Proceed and close"
            />
        </form>
    );
};

export { AddNewSubjectPage };

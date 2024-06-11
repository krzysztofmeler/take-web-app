import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { useRequest } from '../../hooks/useRequest.hook';

const AddNewSubjectPage: FC = () => {
    const [name, setName] = useState<string>('');
    const [lecturerId, setLecturerId] = useState<string | null>(null);

    const { send: sendRequest, data: response, ...request } = useRequest();

    const submit = () => {
        sendRequest(
            'http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/subjects',
            {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    name,
                    lecturerId: 22,
                }),
            },
        );

        console.log('sss');
    };

    useEffect(() => {
        console.log('response changed');
    }, [response]);

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

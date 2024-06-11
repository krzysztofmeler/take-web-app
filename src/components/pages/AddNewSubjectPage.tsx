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

    const {
        data: lecturers,
        processing,
        error,
    } = useRequest(
        'http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/lecturers',
        { method: 'GET' },
    );

    useEffect(() => {
        if (error) {
            alert(
                'An error occurred while loading lecturers. Form submission unavailable.',
            );
            // todo: disable form
            console.error(error);
        }
    }, [error]);

    const [lecturerSelectorOptions, setLecturerSelectorOptions] = useState<
        [string, string][]
    >([]);

    useEffect(() => {
        if (lecturers) {
            setLecturerSelectorOptions(
                (lecturers as Lecturer[]).map((e) => [
                    e.lecturerId.toString(),
                    `${e.firstName} ${e.lastName}`,
                ]),
            );
        }
    }, [lecturers]);

    const submit = () => {
        sendRequest(
            'http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/subjects',
            {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    lecturerId,
                }),
            },
        );

        console.log('sss');
    };

    useEffect(() => {
        console.log('response changed');
    }, [response]);

    return (
        <form>
            <TextInput value={name} updateValue={setName} label="Name" />
            <BasicSelector
              values={lecturerSelectorOptions}
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

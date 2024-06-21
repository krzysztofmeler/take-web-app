import { FC, useEffect, useState } from 'react';
import { TextInput } from '../forms/TextInput';
import { BasicSelector } from '../forms/BasicSelector';
import { jsSubmit } from '../../utils/js-submit';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';

const AddNewSubjectPage: FC = () => {
    const [name, setName] = useState<string>('');

    const { send: sendRequest, data: response } = useRequest();

    const submit = () => {
        sendRequest(`${settings.backendAPIUrl}subjects`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
    };

    useEffect(() => {
    }, [response]);

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

export { AddNewSubjectPage };

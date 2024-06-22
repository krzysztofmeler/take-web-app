import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { TextInput } from '../forms/TextInput';
import { jsSubmit } from '../../utils/js-submit';
import { CheckboxSelector } from '../forms/CheckboxSelector';
import { useRequest } from '../../hooks/useRequest.hook';
import {
    Subject,
    SubjectWithLecturers,
} from '../../model/existing-objects/Subject';
import { settings } from '../../settings';
import { Lecturer } from '../../model/existing-objects/Lecturer';

const EditLecturerDataPage: FC = () => {
    const { id } = useParams();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subjectIds, setSubjectIds] = useState<string[]>([]);

    const [formEnabled, setFormEnabled] = useState(false); // false because list of subjects needs to be loaded

    const { send: sendRequest, data: response, ...request } = useRequest();

    const { data: lecturer, error: lecturerReqError } = useRequest(
        `${settings.backendAPIUrl}lecturers/profile/${id}`,
        { method: 'GET' },
    );

    const { data: subjects, error } = useRequest(
        `${settings.backendAPIUrl}subjects`,
        { method: 'GET' },
    );

    useEffect(() => {
        if (lecturer && subjects) {
            const lecturerData: Lecturer = lecturer as Lecturer;
            const subjectsData: Subject[] = subjects as Subject[];

            setEmail(lecturerData.email);
            setFirstName(lecturerData.firstName);
            setLastName(lecturerData.lastName);
            setSubjectIds(
                lecturerData.subjects.map((name) =>
                    (
                        subjectsData.find((sub) => sub.name === name) as Subject
                    ).id.toString(),
                ),
            );
        }
    }, [lecturer, subjects]);

    // todo: fix duplicated request to lecturers list via GET

    useEffect(() => {
        if (error) {
            alert(
                'An error occurred while loading list of subjects. Subject selection function unavailable and form is disabled. Reload if needed.',
            );
            console.error(error);
        }
    }, [error]);

    const submit = () => {
        setFormEnabled(false);
        sendRequest(`${settings.backendAPIUrl}lecturers/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                subjectIds: subjectIds.map((id) => parseInt(id, 10)),
                surveys: [],
            }),
        });
    };

    useEffect(() => {
        if (request.error) {
            window.alert('An error occurred!'); // TODO: add proper handling
            console.error(request.error);
            setFormEnabled(true);
        }
    }, [request.error]);

    const navigate = useNavigate();

    useEffect(() => {
        if (
            typeof response === 'object' &&
            response !== null &&
            Object.hasOwn(response, 'lecturerId')
        ) {
            navigate('/administration/lecturers-list');
        }
    }, [response]);

    const [subjectsCheckboxData, setSubjectsCheckboxData] = useState<
        [string, string][]
    >([]);

    useEffect(() => {
        if (subjects) {
            setSubjectsCheckboxData(
                (subjects as Subject[]).map((subject) => [
                    subject.id.toString(),
                    subject.name,
                ]),
            );
            setFormEnabled(true);
        }
    }, [subjects]);

    return (
        <>
            <h1>Edit lecturer data</h1>
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
                <TextInput
                  value={email}
                  updateValue={setEmail}
                  label="E-mail"
                />

                <CheckboxSelector
                  values={subjectsCheckboxData}
                  selectedValues={subjectIds}
                  updateValue={setSubjectIds}
                  label="Subjects"
                />

                {!formEnabled && <p>Processing</p>}

                <input
                  disabled={!formEnabled}
                  onClick={jsSubmit(submit)}
                  type="submit"
                  value="Proceed and close"
                />
            </form>
        </>
    );
};

export { EditLecturerDataPage };

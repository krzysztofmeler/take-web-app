import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Survey } from '../../model/existing-objects/Survey';
import { useRequest } from '../../hooks/useRequest.hook';

const SurveyDataPage: FC = () => {
    const [survey, setSurvey] = useState<Survey | null>(null);

    const { id } = useParams();

    const { data, processing, error } = useRequest(
        `http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/surveys/${id}`,
        { method: 'GET' },
    );

    // todo: fix duplicated request to survey data EP via GET

    useEffect(() => {
        if (error) {
            alert('An error occurred');
            console.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setSurvey(data as Survey);
        }
    }, [data]);

    return (
        <>
            <h1>Survey data</h1>
            {processing && <p>Loading</p>}
            {!processing && survey !== null && (
                <>
                    <p>Name: {survey.name}</p>
                    <p>Created at: {survey.dateCreated}</p>
                    <table>
                        <thead>
                            <tr>
                                <td>Question</td>
                            </tr>
                        </thead>
                        <tbody>
                            {survey.questions.map((question) => (
                                <tr key={question.questionId}>
                                    <td>{question.content}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};

export { SurveyDataPage };

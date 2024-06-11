import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BasicSurvey } from '../../model/existing-objects/Survey';
import { useRequest } from '../../hooks/useRequest.hook';

const SurveysListPage: FC = () => {
    const [surveys, setSurveys] = useState<BasicSurvey[]>([]);

    const { data, processing, error } = useRequest(
        'http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/surveys',
        { method: 'GET' },
    );

    // todo: fix duplicated request to lecturers list via GET

    useEffect(() => {
        if (error) {
            alert('An error occurred');
            console.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setSurveys(data as BasicSurvey[]);
        }
    }, [data]);

    return (
        <>
            <h1>Surveys list</h1>
            <p>
                List of all surveys. Surveys are created separately for each
                lecturer and are common for all his/her subjects.
            </p>
            {processing && <p>Loading</p>}
            {!processing && (
                <table>
                    <thead>
                        <tr>
                            <td>Survey Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey) => (
                            <tr key={survey.surveyId}>
                                <td>
                                    <Link
                                      to={`/administration/survey-data/${survey.surveyId}`}
                                    >
                                        {survey.name}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export { SurveysListPage };

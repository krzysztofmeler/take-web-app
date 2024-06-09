import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useRequest } from '../../hooks/useRequest.hook';

interface Survey {
    surveyId: number;
    surveyName: string;
}

const MySurveysPage: FC = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [processing, setProcessing] = useState<boolean>(true);

    const studentId = 'dfsf';

    // const { data, processing, error } = useRequest(`http://127.0.0.1/students/${studentId}/surveys`, { method: 'GET' });
    //
    //
    // useEffect(() => {
    //   if (!! data)
    //     setSurveys(data as Survey[]);
    // }, [data]);

    useEffect(() => {
        try {
            setTimeout(() => {
                setSurveys([
                    {
                        surveyId: 343,
                        surveyName: 'survey name 343',
                    },
                    {
                        surveyId: 1,
                        surveyName: 'survey name 1',
                    },
                    { surveyId: 55, surveyName: 'survey name 55' },
                ]);
                setProcessing(false);
            }, 1200);
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div>
            <h1>My surveys</h1>

            <div>
                {processing && <div>loading list of your surveys...</div>}
                {!processing && (
                    <ul>
                        {surveys.map((survey) => (
                            <li key={survey.surveyId}>
                                {' '}
                                <Link
                                  to={`/complete-survey/${survey.surveyId}`}
                                >
                                    {survey.surveyName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export { MySurveysPage };

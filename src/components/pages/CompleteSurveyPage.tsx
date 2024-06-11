import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Survey } from '../../model/existing-objects/Survey';
import { StarRatio } from '../forms/StarRatio';
import { useRequest } from '../../hooks/useRequest.hook';
import { jsSubmit } from '../../utils/js-submit';
import { Answer } from '../../model/existing-objects/Answer';

const CompleteSurveyPage: FC = () => {
    const { id } = useParams();

    const [survey, setSurvey] = useState<Survey | null>(null);

    const surveyRequest = useRequest(
        `http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/surveys/${id}`,
        { method: 'GET', mode: 'cors' },
    );

    useEffect(() => {
        if (surveyRequest.error) {
            window.alert(
                'An error occurred while loading survey, try again later.',
            );
            console.error(surveyRequest.error);
        }
    }, [surveyRequest.error]);

    useEffect(() => {
        if (
            surveyRequest.data &&
            Object.hasOwn(surveyRequest.data, 'surveyId')
        ) {
            setSurvey(surveyRequest.data as Survey);
        }
    }, [surveyRequest.data]);

    const [answers, setAnswers] = useState<[number, number][]>([]);

    const updateAnswer = (questionId: number, answerValue: number) => {
        let answerAlreadyInAnswers = false;
        const newList: [number, number][] = answers.map(
            (answer): [number, number] => {
                if (answer[0] === questionId) {
                    answerAlreadyInAnswers = true;
                    return [answer[0], answerValue];
                } else {
                    return [answer[0], answer[1]];
                }
            },
        );
        if (!answerAlreadyInAnswers) {
            newList.push([questionId, answerValue]);
        }

        setAnswers(newList);
    };

    const [submitted, setSubmitted] = useState(false);
    const [submittingIndex, setSubmittingIndex] = useState(-1);

    const submittingRequest = useRequest();

    const handleSubmit = () => {
        if (survey && !submitted) {
            if (answers.length < survey.questions.length) {
                window.alert(
                    'Provide your score for each question before submitting.',
                );
                return;
            }

            setSubmitted(true);
            setSubmittingIndex(0);
        }
    };

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (submittingIndex > -1 && survey) {
            if (submittingIndex >= answers.length - 1) {
                setSubmittingIndex(-1);
                setSuccess(true);
            }

            submittingRequest.send(
                'http://localhost:8091/znowututaj-1.0-SNAPSHOT/api/answers',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        surveyId: survey.surveyId,
                        studentId: 1, // todo: add real,
                        questionId: answers[submittingIndex][0],
                        rating: answers[submittingIndex][1],
                    } as Answer),
                },
            );
        }
    }, [submittingIndex]);

    useEffect(() => {
        if (submittingIndex > -1 && survey) {
            setSubmittingIndex(submittingIndex + 1);
        }
    }, [submittingRequest.data, submittingRequest.error]); // todo: remove submittingRequest.error

    // useEffect(() => { // todo: uncomment
    //     if (submittingRequest.error) {
    //         setSubmittingIndex(-1);
    //         setSubmitted(false);
    //         window.alert('An error occurred.');
    //         console.error(submittingRequest.error);
    //     }
    // }, [submittingRequest.error]);

    if (!survey) {
        return (
            <>
                <h1>Complete survey</h1>
                <p>Loading data</p>
            </>
        );
    }

    if (success) {
        return <h1>Thank you for answers</h1>;
    }

    return (
        <>
            <h1>Complete Survey {`"${survey.name}"`}</h1>

            <form>
                {survey.questions.map((question) => (
                    <div key={question.questionId}>
                        <p>{question.content}</p>
                        <StarRatio
                          groupName={question.questionId.toString()}
                          value={
                                answers.find(
                                    (a) => a[0] === question.questionId,
                                )?.[1]
                            }
                          updateValue={(value) =>
                                updateAnswer(question.questionId, value)
                            }
                        />
                    </div>
                ))}

                <input
                  disabled={submitted}
                  type="submit"
                  value="Send answers"
                  onClick={jsSubmit(handleSubmit)}
                />
            </form>
        </>
    );
};

export { CompleteSurveyPage };

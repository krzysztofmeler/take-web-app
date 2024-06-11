import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Student } from '../../model/existing-objects/Student';
import { Survey } from '../../model/existing-objects/survey';
import { StarRatio } from '../forms/StarRatio';

const CompleteSurveyPage: FC = () => {
    const { id } = useParams();

    const survey: Survey = {
        surveyId: 34,
        dateCreated: new Date(Date.now()).toISOString(),
        name: 'Robert Tutajewicz - ocena semestru III',
        questions: [
            {
                questionId: 54,
                content:
                    'Jak oceniasz wkład prowadzącego w poszerzenie twojej wiedzy?',
            },
            {
                questionId: 12,
                content: 'sdklfjdslkfj',
            },
            {
                questionId: 324,
                content: 'sdflkjdsf',
            },
            {
                questionId: 22,
                content: 'klsdjflkdsf',
            },
        ],
    };

    const [answers, setAnswers] = useState<[number, number][]>([]);

    const updateAnswer = (questionId: number, answerValue: number) => {
        let answerAlreadyInAnswers = false;
        const newList: [number, number][] = answers.map((answer): [number, number] => {
                if (answer[0] === questionId) {
                    answerAlreadyInAnswers = true;
                    return [answer[0], answerValue];
                } else {
                    return [answer[0], answer[1]];
                }
            });
        if (!answerAlreadyInAnswers) {
            newList.push([questionId, answerValue]);
        }

        setAnswers(newList);
    };

    return (
        <>
            <h1>Complete Survey {`"${survey.name}"`}</h1>

            {survey.questions.map((question) => (
                <div key={question.questionId}>
                    <p>{question.content}</p>
                    <StarRatio
                      groupName={question.questionId.toString()}
                      value={answers.find(a => a[0] === question.questionId)?.[1]}
                      updateValue={(value) => updateAnswer(question.questionId, value)}
                    />
                </div>
            ))}
        </>
    );
};

export { CompleteSurveyPage };

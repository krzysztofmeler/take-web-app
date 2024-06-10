import { FC, useEffect, useState } from 'react';
import { Student } from '../../model/existing-objects/Student';
import { Survey } from '../../model/existing-objects/survey';
import { useParams } from 'react-router';
import { StarRatio } from '../forms/StarRatio';

const CompleteSurveyPage: FC = () => {

    let { id } = useParams();

    console.log(id);

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

    return (
        <>
            <h1>Complete Survey {`"${survey.name}"`}</h1>

            {survey.questions.map((question) => (
                <div key={question.questionId}>
                    <p>{question.content}</p>
                    <StarRatio value={3} updateValue={(v) => { console.log(v); }} />
                </div>
            ))}
        </>
    );
};

export { CompleteSurveyPage };

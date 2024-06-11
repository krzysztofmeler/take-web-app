import { Question } from './Question';
import { Lecturer } from './Lecturer';

interface Survey {
    surveyId: number;
    name: string;
    dateCreated: string;
    questions: Question[];
    lecturer: Lecturer;
}

interface BasicSurvey {
    surveyId: number;
    name: string;
}

export type { Survey, BasicSurvey };

import { Question } from './Question';

interface Survey {
    surveyId: number;
    name: string;
    dateCreated: string;
    questions: Question[];
}

export type { Survey };

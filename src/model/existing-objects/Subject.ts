import { Lecturer } from './Lecturer';

interface Subject {
    id: number;
    name: string;
}

interface SubjectWithLecturer extends Subject {
    lecturer: Lecturer;
}

export type { Subject, SubjectWithLecturer };

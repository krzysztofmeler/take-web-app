import { Lecturer, LecturerData } from './Lecturer';

interface Subject {
    id: number;
    name: string;
}

interface SubjectWithLecturers extends Subject {
    lecturers: [number, string, string, string][];
}

export type { Subject, SubjectWithLecturers };

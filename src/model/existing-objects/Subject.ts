interface Subject {
    id: number;
    name: string;
}

interface SubjectWithLecturers extends Subject {
    lecturersNames: string[];
}

export type { Subject, SubjectWithLecturers };

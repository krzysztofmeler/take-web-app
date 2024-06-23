interface Subject {
    id: number;
    name: string;
}

interface SubjectWithLecturers extends Subject {
    lecturers: string[];
}

export type { Subject, SubjectWithLecturers };

import { createContext } from 'react';
import { StudentLoginContextType } from '../types/StudentLoginContextType';

const StudentLoginContext = createContext<StudentLoginContextType | null>(null);

export { StudentLoginContext };

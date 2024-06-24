import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';
import { AddStudentData } from './useAddStudent.hook';

type EditStudentData = AddStudentData;

const useEditStudent = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);
  const [emailConflictError, setEmailConflictError] = useState(false);

  const proceed = async (id: number | string, data: EditStudentData) => {
    setResult(BasicRequestResult.Loading);
    setEmailConflictError(false);
    const response = await request.put(`students/${id}`, data);

    if (response.status === 200) {
      setResult(BasicRequestResult.Ok);
    } else if (response.status === 409) {
      setEmailConflictError(true); // error result is set in useEffect hook bellow
    } else {
      setResult(BasicRequestResult.Error);
    }
  };

  return {
    proceed,
    emailConflictError,
    result,
  };
};

export { useEditStudent };
export type { EditStudentData };

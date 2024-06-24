import { useEffect, useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';

type AddStudentData = {
  firstName: string;
  lastName: string;
  email: string;
};

const useAddStudent = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);
  const [emailConflictError, setEmailConflictError] = useState(false);

  const proceed = async (data: AddStudentData) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.post('students', data);

    if (response.status === 201) {
      setResult(BasicRequestResult.Ok);
    } else if (response.status === 409) {
      setEmailConflictError(true); // error result is set in useEffect hook bellow
    } else {
      setResult(BasicRequestResult.Error);
    }
  };

  useEffect(() => {
    if (emailConflictError && result === BasicRequestResult.Loading) {
      setResult(BasicRequestResult.Error);
    }
  }, [emailConflictError]);

  return {
    proceed,
    emailConflictError,
    result,
  };
};

export { useAddStudent };
export type { AddStudentData };

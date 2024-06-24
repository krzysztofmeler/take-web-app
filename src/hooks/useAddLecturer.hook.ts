import { useEffect, useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';

type AddLecturerData = {
  firstName: string;
  lastName: string;
  email: string;
  subjectIds: number[];
};

const useAddLecturer = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);
  const [emailConflictError, setEmailConflictError] = useState(false);

  const proceed = async (data: AddLecturerData) => {
    setResult(BasicRequestResult.Loading);
    setEmailConflictError(false);
    const response = await request.post('lecturers', data);

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

export { useAddLecturer };
export type { AddLecturerData };

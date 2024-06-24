import { useEffect, useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';
import { AddLecturerData } from './useAddLecturer.hook';

type EditLecturerData = AddLecturerData;

const useEditLecturer = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);
  const [emailConflictError, setEmailConflictError] = useState(false);

  const proceed = async (id: number | string, data: EditLecturerData) => {
    setResult(BasicRequestResult.Loading);
    const response = await request.put(`lecturers/${id}`, data);

    if (response.status === 200) {
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

export { useEditLecturer };
export type { AddLecturerData };

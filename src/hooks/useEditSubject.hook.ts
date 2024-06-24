import { useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';
import { AddSubjectData } from './useAddSubject.hook';

type EditSubjectData = AddSubjectData;

const useEditSubject = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);
  const [nameConflictError, setNameConflictError] = useState(false);

  const proceed = async (id: number | string, data: EditSubjectData) => {
    setResult(BasicRequestResult.Loading);
    setNameConflictError(false);
    const response = await request.put(`subjects/${id}`, data);

    if (response.status === 200) {
      setResult(BasicRequestResult.Ok);
    } else if (response.status === 409) {
      setNameConflictError(true);
    } else {
      setResult(BasicRequestResult.Error);
    }
  };

  return {
    proceed,
    nameConflictError,
    result,
  };
};

export { useEditSubject };
export type { EditSubjectData };

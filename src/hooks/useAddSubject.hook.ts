import { useEffect, useState } from 'react';
import { request } from '../utils/request';
import { BasicRequestResult } from '../types/BasicRequestResult';

type AddSubjectData = {
  name: string;
};

const useAddSubject = () => {
  const [result, setResult] = useState<BasicRequestResult>(BasicRequestResult.Idle);
  const [nameConflictError, setNameConflictError] = useState(false);

  const proceed = async (data: AddSubjectData) => {
    setResult(BasicRequestResult.Loading);
    setNameConflictError(false);
    const response = await request.post('subjects', data);

    if (response.status === 201) {
      setResult(BasicRequestResult.Ok);
    } else if (response.status === 409) {
      setNameConflictError(true);
    } else {
      setResult(BasicRequestResult.Error);
    }
  };

  useEffect(() => {
    if (nameConflictError && result === BasicRequestResult.Loading) {
      setResult(BasicRequestResult.Error);
    }
  }, [nameConflictError]);

  return {
    proceed,
    nameConflictError,
    result,
  };
};

export { useAddSubject };
export type { AddSubjectData };

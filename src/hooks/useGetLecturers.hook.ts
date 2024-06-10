import { useEffect, useState } from 'react';
import { Lecturer } from '../model/existing-objects/Lecturer';
import { useRequest } from './useRequest.hook';

const useGetLecturers = () => {
    const request = useRequest('http://192.168.1.220:8080/lecturers', {
        method: 'GET',
    });

    const [lecturers, _setLecturers] = useState<Lecturer[]>([]);

    useEffect(() => {
        if (!request.processing && !request.error && request.data) {
            _setLecturers(request.data as Lecturer[]);
        }
    }, [request.processing]);

    return { lecturers, processing: request.processing, error: request.error };
};

export { useGetLecturers };

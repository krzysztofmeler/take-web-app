import { FC } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';
import { update } from '../utils/forms';
import { jsSubmit } from '../utils/js-submit';

type SubjectFormProps = {
    name: string;

    setName: (arg: string) => void;

    submit: () => void;
};

const SubjectForm: FC<SubjectFormProps> = ({ name, setName, submit }) => (
    <Grid>
        <Grid.Col span={6}>
            <TextInput value={name} onChange={update(setName)} label="Name" />
        </Grid.Col>

        <Grid.Col span={10}>
            <Button onClick={jsSubmit(submit)}>Proceed and close</Button>
        </Grid.Col>
    </Grid>
);

export { SubjectForm };
export type { SubjectFormProps };

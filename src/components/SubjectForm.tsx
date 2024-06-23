import { FC } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';
import { update } from '../utils/forms';
import { jsSubmit } from '../utils/js-submit';

type SubjectFormProps = {
  name: string;

  setName: (arg: string) => void;

  loading: boolean;
  disableSubmit: boolean;

  submit: () => void;
};

const SubjectForm: FC<SubjectFormProps> = ({ name, setName, submit, loading, disableSubmit }) => (
  <Grid>
    <Grid.Col span={6}>
      <TextInput value={name} onChange={update(setName)} label="Name" />
    </Grid.Col>

    <Grid.Col span={10}>
      <Button loading={loading} disabled={disableSubmit} onClick={jsSubmit(submit)}>
        Proceed and close
      </Button>
    </Grid.Col>
  </Grid>
);

export { SubjectForm };
export type { SubjectFormProps };

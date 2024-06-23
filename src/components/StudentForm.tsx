import { FC } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';
import { update } from '../utils/forms';
import { jsSubmit } from '../utils/js-submit';

type StudentFormProps = {
  firstName: string;
  lastName: string;
  email: string;

  setFirstName: (arg: string) => void;
  setLastName: (arg: string) => void;
  setEmail: (arg: string) => void;

  submit: () => void;
  submitDisabled: boolean;
};

const StudentForm: FC<StudentFormProps> = ({
  firstName,
  lastName,
  email,
  setFirstName,
  setLastName,
  setEmail,

  submitDisabled,
  submit,
}) => (
  <Grid maw={700}>
    <Grid.Col span={6}>
      <TextInput value={firstName} onChange={update(setFirstName)} label="Name" />
    </Grid.Col>
    <Grid.Col span={6}>
      <TextInput value={lastName} onChange={update(setLastName)} label="Surname" />
    </Grid.Col>

    <Grid.Col span={8}>
      <TextInput value={email} onChange={update(setEmail)} label="E-mail" />
    </Grid.Col>

    <Grid.Col span={10}>
      <Button disabled={submitDisabled} onClick={jsSubmit(submit)}>
        Proceed and close
      </Button>
    </Grid.Col>
  </Grid>
);

export { StudentForm };
export type { StudentFormProps };

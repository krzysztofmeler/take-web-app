import { FC } from 'react';
import { Button, Grid, MultiSelect, TextInput } from '@mantine/core';
import { update } from '../utils/forms';
import { Subject } from '../model/existing-objects/Subject';
import { jsSubmit } from '../utils/js-submit';

type LecturerFormProps = {
  firstName: string;
  lastName: string;
  email: string;

  setFirstName: (arg: string) => void;
  setLastName: (arg: string) => void;
  setEmail: (arg: string) => void;

  subjectIds: string[];
  setSubjectIds: (arg: string[]) => void;

  subjects: Subject[];

  submit: () => void;
};

const LecturerForm: FC<LecturerFormProps> = ({
  firstName,
  lastName,
  email,
  subjectIds,
  setFirstName,
  setLastName,
  setEmail,
  setSubjectIds,
  subjects,
  submit,
}) => (
  <Grid>
    <Grid.Col span={6}>
      <TextInput value={firstName} onChange={update(setFirstName)} label="Name" />
    </Grid.Col>
    <Grid.Col span={6}>
      <TextInput value={lastName} onChange={update(setLastName)} label="Surname" />
    </Grid.Col>

    <Grid.Col span={8}>
      <TextInput value={email} onChange={update(setEmail)} label="E-mail" />
    </Grid.Col>

    <Grid.Col span={12}>
      <MultiSelect
        hidePickedOptions
        label="Subjects"
        placeholder="Select subjects"
        data={(subjects as Subject[]).map((s) => ({
          value: s.id.toString(),
          label: s.name,
        }))}
        defaultValue={subjectIds}
        onChange={(e) => setSubjectIds(e)}
      />
    </Grid.Col>

    <Grid.Col span={10}>
      <Button onClick={jsSubmit(submit)}>Proceed and close</Button>
    </Grid.Col>
  </Grid>
);

export { LecturerForm };

export type { LecturerFormProps };

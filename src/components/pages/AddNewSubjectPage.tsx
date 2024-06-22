import { FC, useState } from 'react';
import { Button, Card, Grid, Group, Text, TextInput } from '@mantine/core';
import { jsSubmit } from '../../utils/js-submit';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { update } from '../../utils/forms';

const AddNewSubjectPage: FC = () => {
    const [name, setName] = useState<string>('');

    const { send: sendRequest, data: response } = useRequest();

    const submit = () => {
        sendRequest(`${settings.backendAPIUrl}subjects`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });
    };

    return (
        <Card withBorder shadow="md" maw={800} my={20} mx="auto">
            <Group
              gap={20}
              p={10}
              display="flex"
              style={{ flexDirection: 'column', alignItems: 'start' }}
            >
                <Text component="h2" size="lg">
                    Add new subject
                </Text>

                <Grid maw={700}>
                    <Grid.Col span={9}>
                        <TextInput
                          value={name}
                          onChange={update(setName)}
                          label="Name"
                        />
                    </Grid.Col>

                    <Grid.Col span={10}>
                        <Button onClick={jsSubmit(submit)}>
                            Proceed and close
                        </Button>
                    </Grid.Col>
                </Grid>
            </Group>
        </Card>
    );
};

export { AddNewSubjectPage };

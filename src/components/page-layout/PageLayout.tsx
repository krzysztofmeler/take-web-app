import { FC } from 'react';
import {
    AppShell,
    Burger,
    Button,
    Flex,
    Group,
    Image,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useParams, useLocation } from 'react-router';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo-cut.png';
import { settings } from '../../settings';

const PageLayout: FC = () => {
    const [opened, { toggle }] = useDisclosure();

    const { pathname } = useLocation();

    return (
        <AppShell
            header={{ height: 80 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: {
                    mobile: !opened,
                    desktop: !pathname.startsWith('/administration'),
                },
            }}
            padding="md"
        >
            <AppShell.Header
                style={{ boxShadow: '0 0 40px 0 rgba(0, 0, 0, 0.15)' }}
            >
                <Group flex={1} style={{ justifyContent: 'center' }} h="100%">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />

                    <Group
                        flex={1}
                        style={{ justifyContent: 'space-between' }}
                        px={10}
                    >
                        <Button
                            variant="subtle"
                            px={14}
                            py={10}
                            mih={60}
                            radius="md"
                            component={Link}
                            to="/"
                        >
                            <Flex gap={6} style={{ alignItems: 'center' }}>
                                <Image width={50} h={50} src={logo} />
                                <Text
                                    c="#222"
                                    component="h1"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Rank your lecturer
                                </Text>
                            </Flex>
                        </Button>

                        <Flex
                            justify="space-between"
                            px="md"
                            gap={40}
                            visibleFrom="md"
                        >
                            <Button
                                fw={500}
                                variant="subtle"
                                component={Link}
                                to="/my-surveys"
                            >
                                Fill surveys
                            </Button>

                            <Button
                                fw={500}
                                variant="subtle"
                                component={Link}
                                to="/administration"
                            >
                                Administration
                            </Button>
                        </Flex>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                {settings.adminAreaLinks.map((link) => (
                    <Button
                        c="#222"
                        fw={400}
                        mih={58}
                        ta="left"
                        key={link.link + link.text}
                        component={Link}
                        to={link.link}
                        variant="subtle"
                        style={{ display: 'flex', alignItems: 'left' }}
                        px={14}
                    >
                        {link.text}
                    </Button>
                ))}
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export { PageLayout };

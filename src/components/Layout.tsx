import React from 'react';
import { Avatar, Column, Container, Row, Text } from './';
import { theme } from '../theme';
import { FiCamera, FiClock } from 'react-icons/fi';

interface LayoutProps {
    title: string;
    isExpanded?: boolean;
    children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ title, isExpanded, children }) => {
    return (
        <Container style={{ maxWidth: isExpanded ? 1000 : 900 }}>
            <Column style={{ borderRight: `1px solid ${theme.colors.neutral.light}` }}>
                <Row style={{
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme.colors.neutral.light}`,
                    justifyContent: 'center',
                    paddingTop: '25px',
                    paddingBottom: '25px'
                }}>
                    <Avatar
                        src='https://d3v0px0pttie1i.cloudfront.net/uploads/user/logo/36673524/7321ca0a.png'
                        width='120px'
                        height='120px'
                    />
                </Row>
                <Row style={{
                    padding: '25px 30px',
                }}>
                    <Avatar
                        src='https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/36673524/3c49f63e.jpg'
                        width='65px'
                        height='65px'
                    />
                    <Text style={{ color: theme.colors.neutral.mediumDark, fontWeight: 'bold' }}>
                        Arvind Menon
                    </Text>
                    <Text as='h1'>60 Minute Interview</Text>
                    <Row style={{ display: 'flex', marginTop: 15 }}>
                        <FiClock style={{ marginRight: 10, fontSize: 20, color: theme.colors.neutral.mediumDark }}/>
                        <Text style={{ color: theme.colors.neutral.mediumDark }}>
                            60 min
                        </Text>
                    </Row>
                    <Row style={{ display: 'flex', marginTop: 10 }}>
                        <FiCamera style={{ marginRight: 10, fontSize: 20, color: theme.colors.neutral.mediumDark }}/>
                        <Text style={{ color: theme.colors.neutral.mediumDark }}>
                            Web conferencing details provided upon confirmation.
                        </Text>
                    </Row>

                </Row>
            </Column>
            <Column style={{ flex: isExpanded ? 2 : 1, transition: 'all 0.22s ease-out' }}>
                <Row style={{
                    padding: '25px 30px',
                }}>
                    <Text as='h2'>{title}</Text>
                </Row>
                <Row style={{
                    padding: '25px 30px',
                }}>
                    {children}
                </Row>
            </Column>
        </Container>
    );
};

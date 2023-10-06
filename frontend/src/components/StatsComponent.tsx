import React from 'react';
import styled from '@emotion/styled';


const Container = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
`;
const Emotion = styled.div`
    margin-bottom: 10px;
`;

const Label = styled.h2`
    color: #333;
`;

const Stat = styled.p`
    color: #666;
`;

interface Stats {
    mean?: number;
    median?: number;
    mode?: number;
}

interface StatsProps {
    stats?: Record<string, Stats>;
}

const StatsComponent: React.FC<StatsProps> = ({ stats }) => {

    if (!stats) {
        return <p>No hay datos disponibles.</p>;
    }

    return (
        <Container>
            {Object.entries(stats).map(([emotion, stats]) => (
                <Emotion key={emotion}>
                    <Label>{emotion}</Label>

                    <Stat><strong>Media:</strong> {stats.mean ?? "-"}</Stat>
                    <Stat><strong>Mediana:</strong> {stats.median ?? "-"}</Stat>
                    <Stat><strong>Moda:</strong> {stats.mode ?? "-"}</Stat>
                </Emotion>
            ))}
        </Container>
    );
};

export default StatsComponent;

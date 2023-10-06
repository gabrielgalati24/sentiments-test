import React from 'react';
import styled from '@emotion/styled';

const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Item = styled.div`
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const Label = styled.h3`
    color: #333;
`;

const Score = styled.p`
    color: #666;
`;

interface Sentiment {
    label: string;
    score: number;
}

interface SentimentDisplayProps {
    sentiment: Sentiment[][];
}

const SentimentDisplay: React.FC<SentimentDisplayProps> = ({ sentiment = [] }) => {
    return (
        <DataContainer>
            {!!sentiment?.length && sentiment?.map((subArray, index) => (
                <div key={index}>
                    {subArray.map((item, i) => (
                        <Item key={i}>
                            <Label>{item.label}</Label>
                            <Score>{item.score}</Score>
                        </Item>
                    ))}
                </div>
            ))}
        </DataContainer>
    );
};

export default SentimentDisplay;

import styled from '@emotion/styled';
import { Table } from '@mantine/core';
import { ScrollArea } from '@mantine/core';
import StatsComponent from './StatsComponent';

const Container = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;

// const Emotion = styled.div`
//     margin-bottom: 10px;
// `;

// const Label = styled.p`
//     font-weight: bold;
// `;

// const Score = styled.p`
//     color: #888;
// `;
const WordContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
`;

const Word = styled.p`
    margin: 0;
    font-weight: bold;
`;

const Frequency = styled.span`
    color: #888;
`;
const ContainerData = styled.div`
display: flex;
/* flex-direction: column; */
justify-content: space-around;
h2 {
    text-align: center;
}
`
const AnalysisComponent = ({ data }: any) => {


    const rows = data?.emotion?.data.map((emotion: any, index: number) => {
        // Obtener todas las puntuaciones de la emoción actual
        const scores = [emotion.joy, emotion.fear, emotion.anger, emotion.sadness, emotion.disgust, emotion.surprise, emotion.others];
        // Encontrar la puntuación más alta
        const maxScore = Math.max(...scores);

        return (
            <Table.Tr key={index}>
                <Table.Td>{emotion.text}</Table.Td>

                <Table.Td style={{ color: emotion.joy === maxScore ? 'red' : 'black' }}>{emotion.joy.toFixed(3) ?? "-"}</Table.Td>
                <Table.Td style={{ color: emotion.fear === maxScore ? 'red' : 'black' }}>{emotion.fear.toFixed(3) ?? "-"}</Table.Td>
                <Table.Td style={{ color: emotion.anger === maxScore ? 'red' : 'black' }}>{emotion.anger.toFixed(3) ?? "-"}</Table.Td>
                <Table.Td style={{ color: emotion.sadness === maxScore ? 'red' : 'black' }}>{emotion.sadness.toFixed(3) ?? "-"}</Table.Td>
                <Table.Td style={{ color: emotion.disgust === maxScore ? 'red' : 'black' }}>{emotion.disgust.toFixed(3) ?? "-"}</Table.Td>
                <Table.Td style={{ color: emotion.surprise === maxScore ? 'red' : 'black' }}>{emotion.surprise.toFixed(3) ?? "-"}</Table.Td>
                <Table.Td style={{ color: emotion.others === maxScore ? 'red' : 'black' }}>{emotion.others.toFixed(3) ?? "-"}</Table.Td>

            </Table.Tr>
        )
    })

    const rows2 = data?.sentiment?.data.map((sentiment: any, index: number) => {
        // Obtener todas las puntuaciones de la emoción actual
        const scores = [sentiment.NEG, sentiment.NEU, sentiment.POS];
        // Encontrar la puntuación más alta
        const maxScore = Math.max(...scores);

        return (
            <Table.Tr key={index}>
                <Table.Td>{sentiment.text}</Table.Td>

                <Table.Td style={{ color: sentiment.NEG === maxScore ? 'red' : 'black' }}>{sentiment.NEG.toFixed(3) ?? "-"}</Table.Td>
                <Table.Td style={{ color: sentiment.NEU === maxScore ? 'red' : 'black' }}>{sentiment.NEU.toFixed(3) ?? "-"}</Table.Td>
                <Table.Td style={{ color: sentiment.POS === maxScore ? 'red' : 'black' }}>{sentiment.POS.toFixed(3) ?? "-"}</Table.Td>
            </Table.Tr>
        )
    })

    return (
        <Container>
            <h2>Análisis de Emociones</h2>
            <ScrollArea h={250}>

                <Table striped highlightOnHover withTableBorder withColumnBorders >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Text</Table.Th>
                            <Table.Th>Joy</Table.Th>
                            <Table.Th>Fear</Table.Th>
                            <Table.Th>Anger</Table.Th>
                            <Table.Th>Sadness</Table.Th>
                            <Table.Th>Disgust</Table.Th>
                            <Table.Th>Surprise</Table.Th>
                            <Table.Th>Others</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>{rows}</Table.Tbody>

                </Table>
            </ScrollArea>
            <h2>
                Estadísticas
            </h2>
            <div>
                <StatsComponent stats={data?.emotion?.stats} />
            </div>
            <h2>Análisis de Sentimientos</h2>
            {/* <SentimentDisplay sentiment={data?.sentiment} /> */}
            <ScrollArea h={250}>
                <Table striped highlightOnHover withTableBorder withColumnBorders >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Text</Table.Th>
                            <Table.Th>NEG</Table.Th>
                            <Table.Th>NEU</Table.Th>
                            <Table.Th>POS</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>{rows2}</Table.Tbody>

                </Table>
            </ScrollArea>
            <h2>
                Estadísticas
            </h2>
            <div>
                <StatsComponent stats={data?.sentiment?.stats} />
            </div>
            <ContainerData>

                <div>
                    <h2> Palabras más usadas:</h2>
                    {data?.extra_data?.most_common_words?.slice(0, 20).map((word: any, index: number) => {
                        return (
                            <WordContainer key={index}>
                                <Word>{word[0]}</Word>
                                <Frequency>
                                    {word[1]}
                                </Frequency>
                            </WordContainer>
                        )
                    })}
                </div>


                <div>
                    <h2> hastags más usadas:</h2>
                    {data?.extra_data?.most_common_hashtags?.slice(0, 20).map((word: any, index: number) => {
                        return (
                            <WordContainer key={index}>
                                <Word>#{word[0]}</Word>
                                <Frequency>
                                    {word[1]}
                                </Frequency>
                            </WordContainer>
                        )
                    })}
                </div>
            </ContainerData>
        </Container>
    );
};

export default AnalysisComponent;

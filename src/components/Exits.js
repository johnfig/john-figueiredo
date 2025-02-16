import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px;
  background: ${props => props.theme.colors.lightBg};
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  margin-bottom: 4rem;
  text-align: center;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 600px);
  justify-content: center;
  gap: 2.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ExitCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  height: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const CardImage = styled.div`
  height: 300px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.lightText};
  margin-bottom: 1.5rem;
`;

const exits = [
  {
    id: 1,
    title: "SISU Extracts",
    description: "Scaled SISU to $100M+ in annual revenue with 3,000% growth over three years, expanding to 150+ employees. Led strategic partnerships, operational scaling, and M&A negotiations, culminating in an IPO as part of a $1B transaction.",
    image: "/images/exits/sisu-extracts.png"
  }
];

const Exits = () => {
  return (
    <Section id="exits">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Exits
        </Title>
        <Grid>
          {exits.map((exit, index) => (
            <ExitCard
              key={exit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardImage image={exit.image} />
              <CardContent>
                <div>
                  <CardTitle>{exit.title}</CardTitle>
                  <CardDescription>{exit.description}</CardDescription>
                </div>
              </CardContent>
            </ExitCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Exits; 
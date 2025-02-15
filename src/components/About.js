import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px;
  background: ${props => props.theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.lightText};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ThesisCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  background: ${props => props.background};
  color: white;
  font-size: 1.75rem;
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.lightText};
`;

const thesisPoints = [
  {
    id: 1,
    title: "Undervalued Assets",
    description: "Identifying and acquiring assets below their intrinsic value, creating immediate equity potential.",
    icon: "💎",
    color: "linear-gradient(135deg, #2193b0, #6dd5ed)"
  },
  {
    id: 2,
    title: "Forced Appreciation",
    description: "Implementing strategic improvements and operational efficiencies to drive value creation.",
    icon: "⚡",
    color: "linear-gradient(135deg, #ee0979, #ff6a00)"
  },
  {
    id: 3,
    title: "High Cash Flow",
    description: "Focusing on assets that generate strong, consistent cash flows to ensure sustainable returns.",
    icon: "💫",
    color: "linear-gradient(135deg, #11998e, #38ef7d)"
  },
  {
    id: 4,
    title: "Asymmetric Upside",
    description: "Targeting opportunities with limited downside risk and significant upside potential.",
    icon: "🚀",
    color: "linear-gradient(135deg, #8E2DE2, #4A00E0)"
  }
];

const About = () => {
  return (
    <Section id="about">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About SISU Ventures
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          We acquire and build assets where we can add significant value, focusing on high cash flow 
          opportunities with asymmetric upside potential.
        </Description>
        <Grid>
          {thesisPoints.map((point, index) => (
            <ThesisCard
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <IconWrapper background={point.color}>
                {point.icon}
              </IconWrapper>
              <CardTitle>{point.title}</CardTitle>
              <CardDescription>{point.description}</CardDescription>
            </ThesisCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default About; 
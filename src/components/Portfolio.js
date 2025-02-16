import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 120px 20px;
  background: ${props => props.theme.colors.background};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
  position: relative;
  z-index: 1;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InvestmentCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  height: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
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

const investments = [
  {
    id: 1,
    title: "Workforce Housing",
    description: "Built a diversified portfolio of 20+ workforce housing properties across the Midwest in 2024, with a plan to scale to 1,000+ properties over the next 10 years. Focused on multi-family and single-family assets, leveraging strategic acquisitions and value-add improvements to drive long-term growth and affordability.",
    image: "/images/portfolio/sisu-re-fund.png"
  },
  {
    id: 2,
    title: "Value Equities",
    description: "Built a strategic portfolio of high-cash-flow public equities with low P/E ratios, focusing on undervalued companies with strong fundamentals. Prioritized businesses with stable earnings, durable competitive advantages, and long-term growth potential to maximize returns while minimizing downside risk.",
    image: "/images/portfolio/value-equities.png"
  },
  {
    id: 3,
    title: "Mobile Home Parks",
    description: "Invested in 1,100+ mobile home lots across the Midwest, executing an infill value-add strategy to maximize occupancy and cash flow. Focused on acquiring undervalued properties, improving infrastructure, and optimizing management to drive long-term appreciation and strong returns.",
    image: "/images/portfolio/odc-fund.png"
  },
  {
    id: 4,
    title: "Stealth Startup",
    description: "Stay tuned...",
    image: "/images/portfolio/stealth-ai.png"
  }
];

const Portfolio = () => {
  return (
    <Section id="portfolio">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Portfolio
        </Title>
        <Grid>
          {investments.map((investment, index) => (
            <InvestmentCard
              key={investment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardImage image={investment.image} />
              <CardContent>
                <div>
                  <CardTitle>{investment.title}</CardTitle>
                  <CardDescription>{investment.description}</CardDescription>
                </div>
              </CardContent>
            </InvestmentCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Portfolio; 
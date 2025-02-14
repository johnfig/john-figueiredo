import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 100px 20px;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Content = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const About = () => {
  return (
    <Section id="about">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About SISU Ventures
        </Title>
        <Content
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            SISU Ventures is a forward-thinking real estate investment firm focused on building a diverse portfolio 
            of single-family and multi-family properties across the United States. Our strategic approach combines 
            market expertise with innovative property management to deliver exceptional returns for our investors.
          </p>
        </Content>
      </Container>
    </Section>
  );
};

export default About; 
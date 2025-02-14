import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 100px 20px;
  background: white;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ContactInfo = styled(motion.div)`
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Contact = () => {
  return (
    <Section id="contact">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Contact Us
        </Title>
        <ContactInfo
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>Interested in learning more about our investment opportunities?</p>
          <p>Email: info@sisuventures.com</p>
          <p>Phone: (555) 123-4567</p>
        </ContactInfo>
      </Container>
    </Section>
  );
};

export default Contact; 
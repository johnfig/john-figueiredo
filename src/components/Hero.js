import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3');
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 7rem;
  color: white;
  position: relative;
  z-index: 1;
  text-align: center;
  font-weight: 500;
  letter-spacing: -1px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 4rem;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroImage />
      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
      >
        SISU Ventures
      </Title>
    </HeroSection>
  );
};

export default Hero; 
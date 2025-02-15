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
  background: #000;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3');
  background-size: cover;
  background-position: center;
  opacity: 0.6;
  filter: contrast(1.1) brightness(0.7);
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
`;

const Title = styled(motion.h1)`
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  font-size: 8.5rem;
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  font-weight: 600;
  letter-spacing: -2px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 80px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 4.5rem;
    letter-spacing: -1px;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroImage />
      <GradientOverlay />
      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.25, 0.1, 0, 1],
          delay: 0.2
        }}
      >
        SISU Ventures
      </Title>
    </HeroSection>
  );
};

export default Hero; 
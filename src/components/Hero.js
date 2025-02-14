import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
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
  filter: brightness(0.8);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 20px;
`;

const ContentWrapper = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  padding: 3rem 4rem;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroImage />
      <HeroContent>
        <ContentWrapper
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SISU Ventures
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building a National Portfolio of Premium Real Estate Properties
          </Subtitle>
        </ContentWrapper>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 
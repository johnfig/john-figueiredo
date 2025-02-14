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
  filter: brightness(0.6);
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
  max-width: 800px;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 5.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 1.1;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3.5rem;
  }
`;

const Tagline = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.1rem;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroImage />
      <HeroContent>
        <ContentWrapper
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.6, 0.05, -0.01, 0.9] }}
        >
          <Title>
            SISU Ventures
          </Title>
          <Tagline>
            Time to Build
          </Tagline>
          <Subtitle>
            Building a National Portfolio of Premium Real Estate Properties
          </Subtitle>
        </ContentWrapper>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero; 
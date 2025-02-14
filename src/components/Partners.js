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
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.5px;
`;

const PartnerCard = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
`;

const PartnerImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 220px;
    height: 220px;
  }
`;

const PartnerInfo = styled.div`
  flex: 1;
`;

const PartnerName = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

const PartnerRole = styled.h4`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1.5rem;
  font-weight: 400;
`;

const PartnerBio = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  opacity: 0.9;
`;

const Partners = () => {
  return (
    <Section id="partners">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Team
        </Title>
        <PartnerCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ImageWrapper>
            <PartnerImage 
              src="/images/john-profile.png"
              alt="John Figueiredo" 
            />
          </ImageWrapper>
          <PartnerInfo>
            <PartnerName>John Figueiredo</PartnerName>
            <PartnerRole>Founder & Managing Partner</PartnerRole>
            <PartnerBio>
              John Figueiredo leads SISU Ventures with a vision to build a 
              transformative real estate portfolio across the United States. 
              With expertise in identifying high-potential properties and 
              executing value-add strategies, John is focused on delivering 
              exceptional returns while creating lasting value in the 
              communities where SISU Ventures invests.
            </PartnerBio>
          </PartnerInfo>
        </PartnerCard>
      </Container>
    </Section>
  );
};

export default Partners; 
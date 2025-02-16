import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: 120px 20px;
  background: ${props => props.theme.colors.lightBg};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
  position: relative;
  z-index: 2;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PartnerImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
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

const ContactLink = styled.a`
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  font-size: 1.1rem;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialButton = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const EmailButton = styled.a`
  background: #2B4C7E;
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About
        </Title>
        <PartnerCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ImageWrapper>
            <PartnerImage 
              src="/images/team/john-profile.png"
              alt="John Figueiredo" 
            />
            <EmailButton href="mailto:john@sisuventures.co">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Email me
            </EmailButton>
            <SocialLinks>
              <SocialButton href="https://www.linkedin.com/in/john-fig/" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"/>
                </svg>
              </SocialButton>
              <SocialButton href="https://x.com/fig_time_" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1DA1F2">
                  <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z"/>
                </svg>
              </SocialButton>
              <SocialButton href="mailto:john@sisuventures.co">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#757575">
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
                </svg>
              </SocialButton>
            </SocialLinks>
          </ImageWrapper>
          <PartnerInfo>
            <PartnerName>John Figueiredo</PartnerName>
            <PartnerRole>Founder & Managing Partner</PartnerRole>
            <PartnerBio>
              John Figueiredo has an entrepreneurial background in finance and technology. 
              He founded and scaled SISU to 100+ employees and a $100M+ revenue run rate 
              before its acquisition in 2021 in the largest cannabis SPAC transaction in 
              Canada. Previously, he led a global team at Teespring, driving a new revenue 
              channel from $0 to $60M in 9 months. Now, he focuses on real estate investing, 
              building a portfolio single and multi-family properties in the Midwest.
            </PartnerBio>
          </PartnerInfo>
        </PartnerCard>
      </Container>
    </AboutSection>
  );
};

export default About; 
import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const DividerContainer = styled.div`
  height: 150px;
  position: relative;
  overflow: hidden;
`;

const GradientBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.gradient};
  opacity: 0.7;
`;

const Wave = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z'/%3E%3C/path%3E%3C/svg%3E");
  background-size: 100% 100%;
  opacity: 0.1;
`;

const SectionDivider = ({ gradient }) => {
  const { scrollYProgress } = useScroll();
  
  const waveX = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <DividerContainer>
      <GradientBackground 
        gradient={gradient}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      />
      <Wave 
        style={{ 
          x: waveX,
          opacity 
        }}
      />
    </DividerContainer>
  );
};

export default SectionDivider; 
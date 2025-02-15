import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000919;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 9, 25, 0.2) 0%,
    rgba(0, 9, 25, 0.4) 100%
  );
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.heading};
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
  const canvasRef = useRef(null);
  const timelineRef = useRef(0);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animating = true;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = (time) => {
      const gridSize = 50;
      const offset = time % gridSize;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;

      // Draw vertical lines
      for (let x = offset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawTimeline = (time) => {
      const duration = 15000; // 15 seconds for full animation
      const progress = (time % duration) / duration;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 9, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated grid
      drawGrid(time * 0.5);

      // Timeline animations based on progress
      if (progress < 0.2) {
        drawScene1(progress * 5); // Track and runner
      } else if (progress < 0.4) {
        drawScene2((progress - 0.2) * 5); // SISU beginnings
      } else if (progress < 0.6) {
        drawScene3((progress - 0.4) * 5); // Growth phase
      } else if (progress < 0.8) {
        drawScene4((progress - 0.6) * 5); // Pivot
      } else {
        drawScene5((progress - 0.8) * 5); // Future vision
      }
    };

    const drawScene1 = (progress) => {
      // Track and runner animation
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.strokeStyle = `rgba(255, 215, 0, ${progress})`;
      ctx.lineWidth = 2;
      
      // Draw track
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, progress * Math.PI * 2);
      ctx.stroke();
    };

    const drawScene2 = (progress) => {
      // Napkin sketch animation
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      
      // Draw blueprint lines
      for (let i = 0; i < 5; i++) {
        const length = progress * 200;
        ctx.beginPath();
        ctx.moveTo(centerX - length/2, centerY + i * 20);
        ctx.lineTo(centerX + length/2, centerY + i * 20);
        ctx.stroke();
      }
    };

    const drawScene3 = (progress) => {
      // Growth phase - Factory and chart
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw factory blueprint
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      
      // Factory outline
      const factoryWidth = 300;
      const factoryHeight = 200;
      const x = centerX - factoryWidth/2;
      const y = centerY - factoryHeight/2;
      
      ctx.beginPath();
      ctx.rect(x, y, factoryWidth * progress, factoryHeight);
      ctx.stroke();
      
      // Stock chart
      ctx.strokeStyle = `rgba(255, 215, 0, ${progress})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + factoryHeight + 50);
      
      for (let i = 0; i <= factoryWidth * progress; i += 10) {
        ctx.lineTo(
          x + i,
          y + factoryHeight + 50 - Math.sin(i * 0.05) * 30 - (i * 0.2)
        );
      }
      ctx.stroke();
    };

    const drawScene4 = (progress) => {
      // Pivot phase
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw forking paths
      ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
      ctx.lineWidth = 2;
      
      // Main path
      ctx.beginPath();
      ctx.moveTo(centerX - 200, centerY);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
      
      // Branching paths
      const angle = progress * Math.PI / 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * 200,
        centerY - Math.sin(angle) * 200
      );
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(-angle) * 200,
        centerY - Math.sin(-angle) * 200
      );
      ctx.stroke();
      
      // Glowing decision point
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 20
      );
      gradient.addColorStop(0, `rgba(255, 215, 0, ${progress})`);
      gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawScene5 = (progress) => {
      // Future vision
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 200;
      
      // Draw glowing world map points
      const locations = [
        { x: -0.5, y: -0.3 }, // North America
        { x: 0.1, y: -0.2 },  // Europe
        { x: 0.7, y: -0.1 },  // Asia
        { x: -0.2, y: 0.3 },  // South America
        { x: 0.4, y: 0.3 },   // Australia
      ];
      
      locations.forEach((loc, i) => {
        const delay = i * 0.2;
        const pointProgress = Math.max(0, Math.min(1, (progress - delay) * 3));
        
        if (pointProgress > 0) {
          const x = centerX + loc.x * radius;
          const y = centerY + loc.y * radius;
          
          // Glowing point
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
          gradient.addColorStop(0, `rgba(255, 215, 0, ${pointProgress})`);
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, 30, 0, Math.PI * 2);
          ctx.fill();
          
          // Connection lines
          locations.slice(i + 1).forEach(loc2 => {
            const x2 = centerX + loc2.x * radius;
            const y2 = centerY + loc2.y * radius;
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${pointProgress * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          });
        }
      });
      
      // Education, Legacy, Longevity text
      if (progress > 0.7) {
        const words = ['Education', 'Legacy', 'Longevity'];
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(255, 255, 255, ${(progress - 0.7) * 3})`;
        words.forEach((word, i) => {
          ctx.fillText(word, centerX, centerY - 50 + i * 40);
        });
      }
    };

    const animate = (timestamp) => {
      if (!animating) return;
      
      timelineRef.current = timestamp;
      drawTimeline(timestamp);
      
      animationFrameId.current = requestAnimationFrame(animate);
    };

    handleResize();
    animate(0);

    window.addEventListener('resize', handleResize);

    return () => {
      animating = false;
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HeroSection>
      <Canvas ref={canvasRef} />
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